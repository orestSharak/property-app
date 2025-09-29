import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGerCities } from '../hooks/city/useGetCities'

type CitySelectProps = {
  selectedCity: string
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>
}

export function CitySelect({ selectedCity, setSelectedCity }: CitySelectProps) {
  const { t } = useTranslation()
  const { cities, isLoading } = useGerCities()
  const [isOpen, setIsOpen] = useState(false) // State to control dropdown visibility
  const selectRef = useRef<HTMLDivElement>(null) // Ref for detecting clicks outside

  const citiesWithDefault = cities ? [{ name: t('citySelect>all'), id: null }, ...cities] : []
  const handleSelectOption = (option: string) => {
    setSelectedCity(option)

    setIsOpen(false) // Close dropdown after selection
  }

  const toggleDropdown = () => {
    if (!isLoading) {
      // Prevent opening if loading
      setIsOpen((prev) => !prev)
    }
  }

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      style={{
        marginBottom: 50,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'flex-start',
        gap: 10,
      }}
    >
      <h5 style={{ marginBottom: 0 }}>
        {cities?.length ? t('citySelect>selectCity') : t('citySelect>noCities')}
      </h5>
      {!!cities?.length && (
        <div
          ref={selectRef}
          style={{
            position: 'relative',
            width: '200px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            backgroundColor: isLoading ? '#f0f0f0' : 'white',
            zIndex: 9999,
          }}
          aria-disabled={isLoading} // Accessibility: indicate if disabled
        >
          <div
            onClick={toggleDropdown}
            style={{
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            role="button" // Accessibility: indicate it's a clickable element
            aria-haspopup="listbox" // Accessibility: indicates a dropdown with options
            aria-expanded={isOpen} // Accessibility: current expanded state
            tabIndex={isLoading ? -1 : 0} // Make it focusable, but not if disabled
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault() // Prevent scrolling if space is pressed
                toggleDropdown()
              }
            }}
          >
            {selectedCity || t('citySelect>all')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: '16px',
                height: '16px',
                marginLeft: '10px',
                transition: 'transform 0.2s ease-in-out',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate based on dropdown state
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {isOpen && cities && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: 'white',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 10,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
              role="listbox" // Accessibility: container for options
            >
              {citiesWithDefault?.map((option) => (
                <div
                  key={option.id}
                  onClick={() =>
                    option.id === null ? handleSelectOption('') : handleSelectOption(option.name)
                  }
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  role="option" // Accessibility: individual option
                  aria-selected={option.name === (selectedCity || t('citySelect>all'))} // Accessibility: current selected option
                  tabIndex={0} // Make options focusable for keyboard navigation
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      option.id === null ? handleSelectOption('') : handleSelectOption(option.name)
                    }
                  }}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isLoading && <span>{t('citySelect>loadingCities')}</span>}
    </div>
  )
}
