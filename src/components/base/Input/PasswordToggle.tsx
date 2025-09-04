import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { PasswordToggleIconType } from './Input.types'
import { StyledButton } from './PasswordToggle.styles'

type PasswordToggleProps = {
  showPassword: boolean
  setShowPassword: Dispatch<SetStateAction<boolean>>
  passwordToggleIcons: PasswordToggleIconType['passwordToggleIcons']
}

export const PasswordToggle = ({
  showPassword,
  setShowPassword,
  passwordToggleIcons,
}: PasswordToggleProps) => {
  const { t } = useTranslation()

  return (
    <StyledButton
      type="button"
      aria-label={showPassword ? t('input>passwordToggle>hide') : t('input>passwordToggle>show')}
      onClick={() => setShowPassword((prev) => !prev)}
      tabIndex={0}
    >
      {showPassword ? passwordToggleIcons.hide : passwordToggleIcons.show}
    </StyledButton>
  )
}
