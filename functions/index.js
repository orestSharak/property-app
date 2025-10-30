const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.database()

// Import modular functions for Realtime Database triggers (Gen 2 syntax)
const { onValueCreated, onValueUpdated, onValueDeleted } = require('firebase-functions/v2/database')

// CRITICAL: Ensure you set the RTDB_INSTANCE_NAME environment variable in your function deployment
const RTDB_INSTANCE = process.env.RTDB_INSTANCE_NAME
// Define the required settings for the functions
const functionConfig = {
  instance: RTDB_INSTANCE,
  region: 'europe-west1',
}

// ======================================================================================
// 1. PROPERTY CREATION
// ======================================================================================

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

    // Data structure for both client's and city's 'properties' child (using 'label' instead of 'address')
    const nestedPropertyData = {
      id: propertyId,
      label: propertyData.address,
      position: propertyData.position,
      status: propertyData.status || 'default',
      city: propertyData.city,
    }

    // 1. Update the related client's properties list
    const clientRef = db.ref(`/clients/${propertyData.clientId}/properties/${propertyId}`)
    await clientRef.set(nestedPropertyData)
    console.log(`Synced property ${propertyId} to client ${propertyData.clientId}.`)

    // 2. Update the related city's properties list
    const cityPropertyData = {
      ...nestedPropertyData,
      clientFullName: propertyData.clientFullName,
      clientId: propertyData.clientId,
      clientEmail: propertyData.clientEmail,
      clientPhone: propertyData.clientPhone || '',
      clientAdditionalPhoneOne: propertyData.clientAdditionalPhoneOne || '',
      clientAdditionalPhoneTwo: propertyData.clientAdditionalPhoneTwo || '',
    }
    const cityRef = db.ref(`/cities/${propertyData.cityId}/properties/${propertyId}`)
    await cityRef.set(cityPropertyData)
    console.log(`Synced property ${propertyId} to city ${propertyData.cityId}.`)

    return null
  },
)

// ======================================================================================
// 2. PROPERTY UPDATES (Status Change & Client Reassignment)
// ======================================================================================

/**
 * Cloud Function to synchronize property field updates (including status, label, position,
 * and client reassignment) to its related client and city records.
 */
exports.syncPropertyUpdates = onValueUpdated(
  {
    ...functionConfig,
    ref: '/properties/{propertyId}',
  },
  async (event) => {
    const beforeData = event.data.before.val()
    const afterData = event.data.after.val()
    const propertyId = event.params.propertyId

    const oldClientId = beforeData?.clientId
    const newClientId = afterData?.clientId
    const cityId = afterData?.cityId

    if (!newClientId || !cityId) {
      console.log(`Property ${propertyId} missing new client or city ID. Skipping update sync.`)
      return null
    }

    const multiPathUpdates = {}
    let needsUpdate = false
    const fieldsToSync = [
      'status',
      'address',
      'position',
      'clientFullName',
      'clientEmail',
      'clientPhone',
      'clientAdditionalPhoneOne',
      'clientAdditionalPhoneTwo',
    ]

    // --- 1. Determine if any relevant field changed ---
    fieldsToSync.forEach((field) => {
      if (beforeData[field] !== afterData[field]) {
        needsUpdate = true
      }
    })
    const clientReassigned = oldClientId !== newClientId

    if (!needsUpdate && !clientReassigned) {
      return null // No relevant change detected
    }

    // --- 2. Handle Client Reassignment (Deletion from Old Client) ---
    if (clientReassigned && oldClientId) {
      // Remove the property from the OLD client's properties list
      multiPathUpdates[`/clients/${oldClientId}/properties/${propertyId}`] = null
      console.log(`Prepared to remove property ${propertyId} from old client ${oldClientId}.`)
    }

    // --- 3. Prepare Data for New Client and City Update ---

    // Nested data for the client's properties list (uses 'label')
    const clientPropertyData = {
      id: propertyId,
      label: afterData.address,
      position: afterData.position,
      status: afterData.status || 'default',
      city: afterData.city,
    }

    // Nested data for the city's properties list (includes client denormalized details)
    const cityPropertyData = {
      ...clientPropertyData,
      clientFullName: afterData.clientFullName,
      clientId: newClientId,
      clientEmail: afterData.clientEmail,
      clientPhone: afterData.clientPhone || '',
      clientAdditionalPhoneOne: afterData.clientAdditionalPhoneOne || '',
      clientAdditionalPhoneTwo: afterData.clientAdditionalPhoneTwo || '',
    }

    // Update/Create the property record for the NEW client
    multiPathUpdates[`/clients/${newClientId}/properties/${propertyId}`] = clientPropertyData

    // Update the property record in the city node
    multiPathUpdates[`/cities/${cityId}/properties/${propertyId}`] = cityPropertyData

    console.log(`Prepared update for new client ${newClientId} and city ${cityId}.`)

    // --- 4. Apply Updates ---
    if (Object.keys(multiPathUpdates).length > 0) {
      await db.ref().update(multiPathUpdates)
      console.log(`Successfully handled property ${propertyId} updates and/or client reassignment.`)
    }

    return null
  },
)

// ======================================================================================
// 3. PROPERTY DELETION
// ======================================================================================

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

// ======================================================================================
// 4. CITY NAME UPDATES
// ======================================================================================

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

    // NOTE: Based on your schema, city name is NOT denormalized in the /clients node.
    // However, it IS denormalized in the /properties node.

    // 1. Update all related properties
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
        `Successfully synced city name update for city ${cityId} to ${Object.keys(updates).length} property locations.`,
      )
    }

    return null
  },
)

// ======================================================================================
// 5. CLIENT UPDATES
// ======================================================================================

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

    const clientUpdates = {}
    let needsUpdate = false

    // Determine what client fields have changed
    if (beforeData.fullName !== afterData.fullName) {
      clientUpdates.clientFullName = afterData.fullName
      needsUpdate = true
    }
    if (beforeData.email !== afterData.email) {
      clientUpdates.clientEmail = afterData.email
      needsUpdate = true
    }
    // Note: The phone number is *not* denormalized in the nested /clients/{clientId}/properties/{propertyId} record,
    // but it is in the main /properties and /cities/{cityId}/properties/{propertyId} records.
    if (beforeData.phone !== afterData.phone) {
      clientUpdates.clientPhone = afterData.phone
      needsUpdate = true
    }

    if (beforeData.additionalPhoneOne !== afterData.additionalPhoneOne) {
      clientUpdates.clientAdditionalPhoneOne = afterData.additionalPhoneOne
      needsUpdate = true
    }

    if (beforeData.additionalPhoneTwo !== afterData.additionalPhoneTwo) {
      clientUpdates.clientAdditionalPhoneTwo = afterData.additionalPhoneTwo
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

      // Apply the changed client fields to the /properties/{propertyId} record
      Object.keys(clientUpdates).forEach((key) => {
        multiPathUpdates[`/properties/${propertyId}/${key}`] = clientUpdates[key]
      })

      // Apply the changed client fields to the city's property record
      // This is necessary because city records also denormalize these client details
      Object.keys(clientUpdates).forEach((key) => {
        multiPathUpdates[`/cities/${cityId}/properties/${propertyId}/${key}`] = clientUpdates[key]
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
