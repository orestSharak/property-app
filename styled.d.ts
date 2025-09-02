import 'styled-components'
import { AppTheme } from './src/common/types'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
