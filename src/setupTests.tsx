import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))

const SvgMock = (props: any) => <svg {...props} data-testid="MockSvgIcon" />

const mockSvg = {
  default: SvgMock,
  __esModule: true,
  ReactComponent: SvgMock,
}

vi.mock('./assets/icons/arrow-left-icon.svg', () => mockSvg)
vi.mock('./assets/icons/back-icon.svg', () => mockSvg)
vi.mock('./assets/icons/chevron-icon.svg', () => mockSvg)
vi.mock('./assets/icons/clients-icon.svg', () => mockSvg)
vi.mock('./assets/icons/cross-icon.svg', () => mockSvg)
vi.mock('./assets/icons/dashboard-icon.svg', () => mockSvg)
vi.mock('./assets/icons/delete-icon.svg', () => mockSvg)
vi.mock('./assets/icons/edit-icon.svg', () => mockSvg)
vi.mock('./assets/icons/eye-hide-icon.svg', () => mockSvg)
vi.mock('./assets/icons/eye-icon.svg', () => mockSvg)
vi.mock('./assets/icons/globe-icon.svg', () => mockSvg)
vi.mock('./assets/icons/house-icon-raw.svg', () => mockSvg)
vi.mock('./assets/icons/log-out-icon.svg', () => mockSvg)
vi.mock('./assets/icons/marker-icon.svg', () => mockSvg)
vi.mock('./assets/icons/menu-icon.svg', () => mockSvg)
vi.mock('./assets/icons/moon-icon.svg', () => mockSvg)
vi.mock('./assets/icons/pencil-icon.svg', () => mockSvg)
vi.mock('./assets/icons/property-icon.svg', () => mockSvg)
vi.mock('./assets/icons/search-icon.svg', () => mockSvg)
vi.mock('./assets/icons/settings-icon.svg', () => mockSvg)
vi.mock('./assets/icons/sun-icon.svg', () => mockSvg)
