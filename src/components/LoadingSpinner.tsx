import React from 'react'

function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px',
        color: '#333',
      }}
    >
      Loading...
    </div>
  )
}

export default LoadingSpinner
