import React from 'react'
import { Button } from '../components/base/Button/Button'
import { Card } from '../components/base/Card/Card'
import { Map } from '../components/Map/Map'
import mapSurface from '../assets/map-surface.png'
import lightHouse from '../assets/light-house.png'
import darkHouse from '../assets/dark-house.png'
import { useTheme } from '../context/ThemeContext'

function Settings() {
  const { toggleTheme, themeMode } = useTheme()

  return (
    <div>
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
    </div>
  )
}

export default Settings
