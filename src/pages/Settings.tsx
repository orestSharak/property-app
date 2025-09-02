import React, { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/base/Input/Input'

function Settings() {
  const { currentUser } = useAuth()
  const [name, setName] = useState(currentUser.displayName ?? '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      <form onSubmit={handleSubmit}>
        <div style={{ width: '700px', padding: '20px' }}>
          <Input
            id="displayName"
            label="Full name"
            //direction="inline"
            type="text"
            required
            value={name}
            error={!name.length ? 'Name is required' : undefined}
            placeholder="Type full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading || !name.length}>
          {loading ? 'Saving...' : 'Save Name'}
        </button>
      </form>
    </div>
  )
}

export default Settings
