const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.database()

// Import modular functions for Realtime Database triggers (Gen 2 syntax)
const { onValueCreated, onValueUpdated, onValueDeleted } = require('firebase-functions/v2/database')

const RTDB_INSTANCE = process.env.RTDB_INSTANCE_NAME
// Define the required settings for the functions
const functionConfig = {
  // CRITICAL FIX: The full instance name from the database URL
  instance: RTDB_INSTANCE,
  region: 'europe-west1',
}

/**
 * Cloud Function to synchronize a new property's details
 * to its related client and city records upon creation.
 */
exports.syncNewPropertyToClientAndCity = onValueCreated(
  {
    ...functionConfig,
    ref: '/properties/{propertyId}',
  },
  async (event) => {
    const propertyData = event.data.val()
    const propertyId = event.params.propertyId

    // Check for required fields to proceed
    if (!propertyData.clientId || !propertyData.cityId || !propertyData.address) {
      console.log('Property missing required fields (clientId, cityId, or address). Skipping sync.')
      return null
    }

    // --- Data for the client's 'properties' child ---
    const clientPropertyData = {
      id: propertyId,
      label: propertyData.address,
      position: propertyData.position,
      status: propertyData.status || 'default',
    }

    // 1. Update the related client's properties list
    const clientRef = db.ref(`/clients/${propertyData.clientId}/properties/${propertyId}`)
    await clientRef.set(clientPropertyData)
    console.log(`Synced property ${propertyId} to client ${propertyData.clientId}.`)

    // --- Data for the city's 'properties' child ---
    const cityPropertyData = {
      id: propertyId,
      label: propertyData.address,
      position: propertyData.position,
      status: propertyData.status || 'default',
      clientFullName: propertyData.clientFullName,
      clientId: propertyData.clientId,
      clientEmail: propertyData.clientEmail,
      clientPhone: propertyData.clientPhone || '',
    }

    // 2. Update the related city's properties list
    const cityRef = db.ref(`/cities/${propertyData.cityId}/properties/${propertyId}`)
    await cityRef.set(cityPropertyData)
    console.log(`Synced property ${propertyId} to city ${propertyData.cityId}.`)

    return null
  },
)

/**
 * Cloud Function to synchronize city name updates across all related clients and properties.
 */
exports.syncCityUpdates = onValueUpdated(
  {
    ...functionConfig,
    ref: '/cities/{cityId}',
  },
  async (event) => {
    const beforeData = event.data.before.val()
    const afterData = event.data.after.val()
    const cityId = event.params.cityId

    // Only proceed if the city name has actually changed
    if (beforeData.name === afterData.name) {
      return null
    }

    const newCityName = afterData.name
    const updates = {}

    // 1. Update all related clients
    const clientsSnapshot = await db
      .ref('clients')
      .orderByChild('cityId')
      .equalTo(cityId)
      .once('value')
    clientsSnapshot.forEach((clientSnap) => {
      const clientId = clientSnap.key
      updates[`/clients/${clientId}/city`] = newCityName
    })

    // 2. Update all related properties
    const propertiesSnapshot = await db
      .ref('properties')
      .orderByChild('cityId')
      .equalTo(cityId)
      .once('value')
    propertiesSnapshot.forEach((propertySnap) => {
      const propertyId = propertySnap.key
      updates[`/properties/${propertyId}/city`] = newCityName
    })

    // Apply all updates in a single multi-path update for atomicity
    if (Object.keys(updates).length > 0) {
      await db.ref().update(updates)
      console.log(
        `Successfully synced city name update for city ${cityId} to ${Object.keys(updates).length} locations.`,
      )
    }

    return null
  },
)

/**
 * Cloud Function to synchronize client name/email/phone updates across all related properties.
 */
exports.syncClientUpdates = onValueUpdated(
  {
    ...functionConfig,
    ref: '/clients/{clientId}',
  },
  async (event) => {
    const beforeData = event.data.before.val()
    const afterData = event.data.after.val()
    const clientId = event.params.clientId

    const updates = {}
    let needsUpdate = false

    // Determine what has changed
    if (beforeData.fullName !== afterData.fullName) {
      updates.clientFullName = afterData.fullName
      needsUpdate = true
    }
    if (beforeData.email !== afterData.email) {
      updates.clientEmail = afterData.email
      needsUpdate = true
    }
    if (beforeData.phone !== afterData.phone) {
      updates.clientPhone = afterData.phone
      needsUpdate = true
    }

    if (!needsUpdate) {
      return null
    }

    const propertiesSnapshot = await db
      .ref('properties')
      .orderByChild('clientId')
      .equalTo(clientId)
      .once('value')

    const multiPathUpdates = {}

    propertiesSnapshot.forEach((propertySnap) => {
      const propertyId = propertySnap.key
      const cityId = propertySnap.val().cityId

      // Apply the changed fields to the /properties/{propertyId} record
      Object.keys(updates).forEach((key) => {
        multiPathUpdates[`/properties/${propertyId}/${key}`] = updates[key]
      })

      // Apply the changed client fields to the city's property record
      Object.keys(updates).forEach((key) => {
        if (key === 'clientFullName') {
          multiPathUpdates[`/cities/${cityId}/properties/${propertyId}/clientFullName`] =
            updates.clientFullName
        } else if (key === 'clientEmail') {
          multiPathUpdates[`/cities/${cityId}/properties/${propertyId}/clientEmail`] =
            updates.clientEmail
        } else if (key === 'clientPhone') {
          multiPathUpdates[`/cities/${cityId}/properties/${propertyId}/clientPhone`] =
            updates.clientPhone
        }
      })
    })

    // Apply all updates in a single multi-path update for atomicity
    if (Object.keys(multiPathUpdates).length > 0) {
      await db.ref().update(multiPathUpdates)
      console.log(
        `Successfully synced client updates for client ${clientId} across multiple locations.`,
      )
    }

    return null
  },
)

exports.syncDeletedPropertyCleanup = onValueDeleted(
  {
    ...functionConfig,
    ref: '/properties/{propertyId}',
  },
  async (event) => {
    const deletedPropertyData = event.data.val()
    const propertyId = event.params.propertyId

    const clientId = deletedPropertyData?.clientId
    const cityId = deletedPropertyData?.cityId

    if (!clientId || !cityId) {
      console.log(`Deleted property ${propertyId} missing client or city ID. Skipping cleanup.`)
      return null
    }

    const updates = {}

    // 1. Remove the property from the related client's properties list
    const clientPropertyPath = `/clients/${clientId}/properties/${propertyId}`
    updates[clientPropertyPath] = null

    // 2. Remove the property from the related city's properties list
    const cityPropertyPath = `/cities/${cityId}/properties/${propertyId}`
    updates[cityPropertyPath] = null

    // Apply both deletions in a single multi-path update
    if (Object.keys(updates).length > 0) {
      await db.ref().update(updates)
      console.log(
        `Cleanup complete for deleted property ${propertyId}. Removed from client ${clientId} and city ${cityId}.`,
      )
    }

    return null
  },
)
