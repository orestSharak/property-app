import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useGerProperties } from '../hooks/useGetProperties'
import { useAuth } from '../context/AuthContext'
import { useDeleteProperty } from '../hooks/useDeleteProperty'
import { useCreateProperty } from '../hooks/useCreateProperty'
import { useUpdateProperty } from '../hooks/useUpdateProperty'
import { Properties } from '../common/types'

function PropertiesPage() {
  const { t } = useTranslation()

  const [propertiesList, setPropertiesList] = useState<Properties[]>([])
  const [update, setUpdate] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [addressValue, setAddressValue] = useState('')
  const [cityName, setCityName] = useState('')
  const [positionValue, setPositionValue] = useState('')
  const [cityPositionValue, setCityPositionValue] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [updateName, setUpdateName] = useState('')
  const [updateAddress, setUpdateAddress] = useState('')
  const [updatePositionValue, setUpdatePositionValue] = useState('')
  const [updateCityPositionValue, setUpdateCityPositionValue] = useState('')
  const [updateImageUrl, setUpdateImageUrl] = useState('')
  const [updateCityName, setUpdateCityName] = useState('')

  const [isAscending, setIsAscending] = useState(true)

  const [selectedProperty, setSelectedProperty] = useState('')

  const { currentUser } = useAuth()
  const { email: userEmail, uid: userUid } = currentUser

  const { properties, isLoading, refetch } = useGerProperties()

  useEffect(() => {
    setPropertiesList(properties)
  }, [properties])

  const { deleteProperty } = useDeleteProperty()
  const { createProperty, isLoading: isLoadingCreate, isError } = useCreateProperty()
  const { updateProperty, isLoading: isLoadingUpdate } = useUpdateProperty()

  const formValues = useMemo(
    () => ({
      name: nameValue,
      address: addressValue,
      createdAt: Date.now(),
      userEmail: userEmail,
      userId: userUid,
      city: cityName,
      position: positionValue,
      cityPosition: cityPositionValue,
      imageUrl: imageUrl,
    }),
    [
      addressValue,
      cityPositionValue,
      cityName,
      imageUrl,
      nameValue,
      positionValue,
      userEmail,
      userUid,
    ],
  )

  const updateFormValues = useMemo(
    () => ({
      name: updateName,
      address: updateAddress,
      createdAt: Date.now(),
      userEmail: userEmail,
      userId: userUid,
      position: updatePositionValue,
      cityPosition: updateCityPositionValue,
      city: updateCityName,
      imageUrl: updateImageUrl,
    }),
    [
      updateAddress,
      updateCityName,
      updateCityPositionValue,
      updateImageUrl,
      updateName,
      updatePositionValue,
      userEmail,
      userUid,
    ],
  )

  const showUpdate = useCallback(
    (
      id: string,
      name: string,
      address: string,
      positionValue: string,
      cityPositionValue: string,
      imageUrl: string,
      city: string,
    ) => {
      setUpdateName(name)
      setUpdateAddress(address)
      setUpdatePositionValue(positionValue)
      setUpdateCityPositionValue(cityPositionValue)
      setUpdateImageUrl(imageUrl)
      setUpdateCityName(city)
      setSelectedProperty(id)
      setUpdate(true)
    },
    [],
  )

  const handleSort = useCallback(() => {
    const nextIsAscending = !isAscending

    const sortedList = [...propertiesList].sort((a, b) => {
      if (nextIsAscending) {
        return a.createdAt - b.createdAt
      } else {
        return b.createdAt - a.createdAt
      }
    })

    setPropertiesList(sortedList)
    setIsAscending(nextIsAscending)
  }, [propertiesList, isAscending])

  const handleCreate = useCallback(
    async (e) => {
      e.preventDefault()

      await createProperty(formValues)
        .then(() => {
          refetch()
          setNameValue('')
          setAddressValue('')
          setCityName('')
          setPositionValue('')
          setCityPositionValue('')
          setCityName('')
          setImageUrl('')
        })
        .catch((e) => console.log('Failed create properties: ', e.message))
    },
    [createProperty, formValues, refetch],
  )

  const handleUpdate = useCallback(
    async (e, id: string) => {
      e.preventDefault()

      await updateProperty(id, updateFormValues)
        .then(() => {
          setUpdate(false)
          setUpdateName('')
          setUpdateAddress('')
          setUpdatePositionValue('')
          setUpdateCityPositionValue('')
          setUpdateImageUrl('')
          setUpdateCityName('')

          refetch()
        })
        .catch((e) => {
          console.log('Update Property failed message: ', e.message)
        })
    },
    [refetch, updateFormValues, updateProperty],
  )

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteProperty(id)
        .then(() => {
          refetch()
        })
        .catch((e) => {
          console.log('Delete Property failed message: ', e.message)
        })
    },
    [deleteProperty, refetch],
  )

  return (
    <Container
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 40,
        marginTop: 20,
      }}
    >
      <div>
        <h3>
          {propertiesList?.length === 0
            ? t('pages>properties>noProperties')
            : t('pages>properties>listOfProperties')}
        </h3>
        {!!propertiesList?.length && !isLoading && (
          <table
            style={{
              width: 700,
              borderCollapse: 'collapse',
              marginTop: 50,
              border: '1px solid #ccc',
              borderRadius: 4,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: 10,
                    borderBottom: '1px solid #ccc',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{t('table>name')}</span>
                  <span tabIndex={0} style={{ padding: 5 }} onClick={handleSort}>
                    &#8645;
                  </span>
                </th>
                <th
                  style={{
                    padding: 10,
                    borderBottom: '1px solid #ccc',
                    textAlign: 'left',
                  }}
                >
                  {t('table>address')}
                </th>
                <th
                  style={{
                    padding: 10,
                    borderBottom: '1px solid #ccc',
                    textAlign: 'left',
                  }}
                >
                  {t('table>actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {propertiesList.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white', // Alternating row colors
                  }}
                >
                  <td
                    style={{
                      padding: 10,
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      {item.name}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: 10,
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        whiteSpace: 'break-spaces',
                      }}
                    >
                      {item.address}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: 10,
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Button
                      onClick={() =>
                        showUpdate(
                          item.id,
                          item.name,
                          item.address,
                          item.position,
                          item.cityPosition,
                          item.imageUrl,
                          item.city,
                        )
                      }
                      style={{
                        marginRight: 10,
                        backgroundColor: '#0d6efd',
                      }}
                    >
                      {t('actions>update')}
                    </Button>
                    <Button variant="danger" onClick={() => item.id && handleDelete(item.id)}>
                      {t('actions>delete')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="w-100 mb-5" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">
          {update ? t('pages>properties>updateProperty') : t('pages>properties>addProperty')}
        </h2>
        {isError && <Alert variant="danger">{t('pages>properties>propertyHasNotAdded')}</Alert>}
        {update ? (
          <Form
            style={{
              padding: '30px 40px',
              border: '1px solid black',
              borderRadius: 4,
            }}
            onSubmit={(e) => handleUpdate(e, selectedProperty)}
          >
            <Form.Group id="update-name">
              <Form.Label>{t('form>name')}</Form.Label>
              <Form.Control
                type="text"
                value={updateName}
                required
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="update-address">
              <Form.Label>{t('form>address')}</Form.Label>
              <Form.Control
                type="text"
                value={updateAddress}
                required
                onChange={(e) => setUpdateAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="update-position">
              <Form.Label>{t('form>position')}</Form.Label>
              <Form.Control
                type="text"
                value={updatePositionValue}
                required
                onChange={(e) => setUpdatePositionValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="city-name">
              <Form.Label>{t('form>cityName')}</Form.Label>
              <Form.Control
                type="text"
                value={updateCityName}
                required
                onChange={(e) => setUpdateCityName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="update-imageUrl">
              <Form.Label>{t('form>imageUrl')}</Form.Label>
              <Form.Control
                type="text"
                value={updateImageUrl}
                required
                onChange={(e) => setUpdateImageUrl(e.target.value)}
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
              <Button variant="dark" className="w-50 mt-4" onClick={() => setUpdate(false)}>
                {t('actions>cancel')}
              </Button>
              <Button
                variant="success"
                className="w-50 mt-4"
                type="submit"
                disabled={isLoadingUpdate}
              >
                {t('actions>update')}
              </Button>
            </div>
          </Form>
        ) : (
          <Form
            style={{
              padding: '30px 40px',
              border: '1px solid black',
              borderRadius: 4,
            }}
            onSubmit={handleCreate}
          >
            <Form.Group id="name">
              <Form.Label>{t('form>name')}</Form.Label>
              <Form.Control
                type="text"
                value={nameValue}
                required
                onChange={(e) => setNameValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>{t('form>address')}</Form.Label>
              <Form.Control
                type="text"
                value={addressValue}
                required
                onChange={(e) => setAddressValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="position">
              <Form.Label>{t('form>position')}</Form.Label>
              <Form.Control
                type="text"
                value={positionValue}
                required
                onChange={(e) => setPositionValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="city">
              <Form.Label>{t('form>cityName')}</Form.Label>
              <Form.Control
                type="text"
                value={cityName}
                required
                onChange={(e) => setCityName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="imageUrl">
              <Form.Label>{t('form>imageUrl')}</Form.Label>
              <Form.Control
                type="text"
                value={imageUrl}
                required
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="success"
              className="w-100 mt-4"
              type="submit"
              disabled={isLoadingCreate}
            >
              {t('actions>add')}
            </Button>
          </Form>
        )}
      </div>
    </Container>
  )
}

export default PropertiesPage
