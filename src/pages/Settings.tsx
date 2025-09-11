import React, { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/base/Input/Input'
import { Select } from '../components/base/Select/Select'
import { Button } from '../components/base/Button/Button'
import { Modal } from '../components/base/Modal/Modal'
import { Card } from '../components/base/Card/Card'
import { Map } from '../components/Map/Map'
import mapSurface from '../assets/map-surface.png'
import lightHouse from '../assets/light-house.png'
import darkHouse from '../assets/dark-house.png'
import { useTheme } from '../context/ThemeContext'

function Settings() {
  const { currentUser } = useAuth()
  const [name, setName] = useState(currentUser.displayName ?? '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toggleTheme, themeMode } = useTheme()
  const [value, setValue] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDelete = () => {
    alert('Item has been deleted!')
    setIsDeleteModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!name.trim()) {
      setError('Name cannot be empty.')
      setLoading(false)
      return
    }

    try {
      await updateProfile(currentUser, {
        displayName: name.trimStart().trimEnd(),
      })
      console.log('Display name updated successfully!')
      // After updating, the AuthContext will re-render, and the user will have a displayName,
      // which will trigger the redirection via SetNameRequiredRoute or PrivateRoute
      navigate('/dashboard') // Explicitly navigate to ensure immediate redirection
    } catch (err) {
      setError(err.message)
      console.error('Error updating display name:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Welcome! Please set your name.</h2>
      <form onSubmit={handleSubmit} style={{ width: '600px', padding: '20px' }}>
        <div style={{ width: '400px' }}>
          <Input
            id="displayName"
            label="Full name"
            value={name}
            required
            error={!name.length ? 'Name is required' : undefined}
            placeholder="Type a full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Select
          id="city"
          label="City"
          hideLabel
          value={value}
          onChange={setValue}
          placeholder="Select a city"
          options={[
            { value: 'ny', label: 'New York' },
            { value: 'la', label: 'Los Angeles' },
            { value: 'sf', label: 'San Francisco' },
            { value: 'ldn', label: 'London' },
          ]}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" disabled={loading || !name.length} size="xl" variant="primary">
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
      <Button variant="primary" onClick={() => setIsDeleteModalOpen(true)}>
        Delete
      </Button>
      <div style={{ margin: 40, padding: 40 }}>
        <Card width={588} compact>
          <Map
            showPopup
            height={260}
            markers={[
              {
                id: '1',
                position: '51.110829023797024, 17.031042982059372',
                label: 'Bastion Sakwowy 26/2',
                status: 'news',
                clientId: '123',
                clientFullName: 'Alessandro Curti',
                clientEmail: 'test@test.com',
                clientPhone: '+39 122 232 224',
              },
              {
                id: '2',
                position: '51.11082209281771, 17.034261672805634',
                label: 'Wesola 212/2',
                status: 'default',
                clientId: '123',
                clientFullName: 'Alessandro Curti',
                clientEmail: 'test@test.com',
                clientPhone: '+39 122 232 224',
              },
            ]}
          />
        </Card>
      </div>
      <Button size="sm" onClick={toggleTheme}>
        Change
      </Button>

      <div
        style={{
          margin: 'auto',
          width: 700,
          height: 400,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${mapSurface})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'absolute',
            filter: themeMode === 'dark' ? `brightness(0.5)` : `brightness(1)`,
            zIndex: 1,
            transition: 'filter 0.5s',
          }}
        />
        <div
          style={{
            zIndex: 2,
            width: 612,
            height: 350,
            position: 'absolute',
            top: 40,
            left: -120,
            content: '',
            backgroundImage: `url(${themeMode === 'light' ? lightHouse : darkHouse})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            transition: `background-image 0.5s`,
          }}
        />
      </div>
      {/* --- Delete Confirmation Modal --- */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete"
        size="sm"
        primaryButton={{
          label: 'Delete',
          onClick: handleDelete,
          variant: 'primary',
        }}
        secondaryButton={{
          label: 'Cancel',
          onClick: () => setIsDeleteModalOpen(false),
        }}
      >
        <p>Are you sure you want to delete this city/client/property?</p>
      </Modal>
    </div>
  )
}

export default Settings
