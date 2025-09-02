import React, { useState, HTMLAttributes } from 'react'
import { getGoogleDriveImageUrl } from '../utils/utils'

// Define the props interface for the ImageLoader component
interface BaseImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  size?: number
  height?: number
  className?: string // Optional className for the container div
  imgClassName?: string // Optional className for the img element itself
}

const BaseImage: React.FC<BaseImageProps> = ({ src, alt, size, height = 150 }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)
  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false) // Reset error state if image loads successfully after a previous error
  }

  const handleImageError = () => {
    setImageLoaded(false)
    setImageError(true)
  }

  return (
    <div
      style={{
        width: size,
        height: height,
      }}
    >
      {!imageLoaded && (
        // Loader or Skeleton Animation
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
          className={'skeleton-pulse'}
        />
      )}
      {imageError && (
        // Error state
        <div
          className="image-loader-skeleton"
          style={{
            width: size,
            height: height,
            backgroundColor: 'red',
            borderRadius: '4px',
          }}
        />
      )}
      <img
        alt={alt}
        referrerPolicy="no-referrer"
        src={getGoogleDriveImageUrl(src, size)}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          width: size,
          display: 'flex',
          objectFit: 'contain',
          borderRadius: '4px',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in',
        }}
      />
    </div>
  )
}

export default BaseImage
