import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { City } from '../common/types'
import { useGerCities } from '../hooks/city/useGetCities'
import { useDeleteCity } from '../hooks/city/useDeleteCity'
import { useCreateCity } from '../hooks/city/useCreateCity'
import { useUpdateCity } from '../hooks/city/useUdateCity'

function CitiesPage() {
  const { t } = useTranslation()
  const [citiesList, setCitiesList] = useState<City[]>([])
  const [update, setUpdate] = useState(false)

  const [nameValue, setNameValue] = useState('')
  const [positionValue, setPositionValue] = useState('')

  const [updateName, setUpdateName] = useState('')
  const [updatePositionValue, setUpdatePositionValue] = useState('')

  const [isAscending, setIsAscending] = useState(true)

  const [selectedCity, setSelectedCity] = useState('')

  const { currentUser } = useAuth()
  const { email: userEmail, uid: userUid } = currentUser

  const { cities, isLoading, refetch } = useGerCities()

  useEffect(() => {
    setCitiesList(cities)
  }, [cities])

  const { deleteCity } = useDeleteCity()
  const { createCity, isPending: isLoadingCreate, isError } = useCreateCity()
  const { updateCity, isPending: isLoadingUpdate } = useUpdateCity()

  const formValues = useMemo(
    () => ({
      name: nameValue,
      createdAt: Date.now(),
      userEmail: userEmail,
      userId: userUid,
      position: positionValue,
    }),
    [nameValue, positionValue, userEmail, userUid],
  )

  const updateFormValues = useMemo(
    () => ({
      name: updateName,
      createdAt: Date.now(),
      userEmail: userEmail,
      userId: userUid,
      position: updatePositionValue,
    }),
    [updateName, updatePositionValue, userEmail, userUid],
  )

  const showUpdate = useCallback((id: string, name: string, positionValue: string) => {
    setUpdateName(name)
    setUpdatePositionValue(positionValue)
    setSelectedCity(id)
    setUpdate(true)
  }, [])

  const handleSort = useCallback(() => {
    const nextIsAscending = !isAscending

    const sortedList = [...citiesList].sort((a, b) => {
      if (nextIsAscending) {
        return a.createdAt - b.createdAt
      } else {
        return b.createdAt - a.createdAt
      }
    })

    setCitiesList(sortedList)
    setIsAscending(nextIsAscending)
  }, [citiesList, isAscending])

  const handleCreate = useCallback(
    async (e) => {
      e.preventDefault()

      createCity(formValues, {
        onSuccess: () => {
          refetch()
          setNameValue('')
          setPositionValue('')
        },
      })
    },
    [createCity, formValues, refetch],
  )

  const handleUpdate = useCallback(
    (e, id: string) => {
      e.preventDefault()

      updateCity(
        { id, updates: updateFormValues },
        {
          onSuccess: async () => {
            setUpdate(false)
            setUpdateName('')
            setUpdatePositionValue('')

            await refetch()
          },
        },
      )
    },
    [refetch, updateFormValues, updateCity],
  )

  const handleDelete = useCallback(
    async (id: string) => {
      deleteCity(id, {
        onSuccess: async () => {
          await refetch()
        },
      })
    },
    [deleteCity, refetch],
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
          {citiesList?.length === 0 ? t('pages>cities>noCities') : t('pages>cities>listOfCities')}
        </h3>
        {!!citiesList?.length && !isLoading && (
          <table
            style={{
              width: 400,
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
                  {t('table>actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {citiesList.map((item, index) => (
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
                    <Button
                      onClick={() => showUpdate(item.id, item.name, item.position)}
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
          {update ? t('pages>cities>updateCity') : t('pages>cities>addCity')}
        </h2>
        {isError && <Alert variant="danger">{t('pages>cities>cityHasNotAdded')}</Alert>}
        {update ? (
          <Form
            style={{
              padding: '30px 40px',
              border: '1px solid black',
              borderRadius: 4,
            }}
            onSubmit={(e) => handleUpdate(e, selectedCity)}
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
            <Form.Group id="update-position">
              <Form.Label>{t('form>position')}</Form.Label>
              <Form.Control
                type="text"
                value={updatePositionValue}
                required
                onChange={(e) => setUpdatePositionValue(e.target.value)}
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
            <Form.Group id="position">
              <Form.Label>{t('form>position')}</Form.Label>
              <Form.Control
                type="text"
                value={positionValue}
                required
                onChange={(e) => setPositionValue(e.target.value)}
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

export default CitiesPage
