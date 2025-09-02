import React, { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/base/Card/Card'
import { TextArea } from '../components/base/TextArea/TextArea'

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
      <form onSubmit={handleSubmit} style={{ width: '600px', padding: '20px' }}>
        <Card date={1749321187579}>
          <div style={{ width: '400px' }}>
            <TextArea
              id="displayName"
              label="Full name"
              hideLabel
              value={name}
              placeholder="Type a note"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={loading || !name.length}>
            {loading ? 'Saving...' : 'Save Name'}
          </button>
        </Card>
      </form>
    </div>
  )
}

export default Settings
