import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData } from '../../common/types'
import { LoginFromSchema } from '../../common/formSchema'
import { useTheme } from '../../context/ThemeContext'
import { Input } from '../../components/base/Input/Input'
import {
  FormWrapper,
  Header,
  HeaderWrapper,
  LanguageIconButton,
  MapSection,
  PropertySection,
  StyledButton,
  StyledForm,
  StyledIconButton,
  SubHeader,
  Wrapper,
} from './Login.styles'
import { useToast } from '../../hooks/toast/useToast'
import MoonIcon from '../../assets/icons/moon-icon.svg'
import SunIcon from '../../assets/icons/sun-icon.svg'
import GlobeIcon from '../../assets/icons/globe-icon.svg'
import { useLogin } from '../../hooks/auth/useLogin' // user: alessandro@test.com

// user: alessandro@test.com
// pass: Alessandro1!

// user: orest@test.com
// pass: Orest1!

// user: user@test.com
// pass: User1!

function Login() {
  const { t, i18n } = useTranslation()
  const { login, isLoggingIn } = useLogin()
  const { themeMode, toggleTheme } = useTheme()
  const { showToast } = useToast()

  const defaultFormValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  )

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(LoginFromSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  })

  const { control, handleSubmit, watch } = loginForm
  const emailField = watch('email')
  const passwordField = watch('password')

  async function onLoginSubmit() {
    await login(
      {
        email: emailField,
        password: passwordField,
      },
      {
        onError: () => {
          showToast({
            content: t('login>failedLoginError'),
            status: 'error',
          })
        },
      },
    )
  }

  const handleLanguageToggle = async () => {
    const currentLang = i18n.language

    if (currentLang === 'en') {
      await i18n.changeLanguage('it')
    } else if (currentLang === 'it') {
      await i18n.changeLanguage('en')
    } else {
      await i18n.changeLanguage('it')
    }
  }

  return (
    <>
      <LanguageIconButton
        noTooltip
        title={t('login>language')}
        icon={<GlobeIcon />}
        onClick={handleLanguageToggle}
      />
      <StyledIconButton
        noTooltip
        icon={themeMode === 'light' ? <MoonIcon /> : <SunIcon />}
        title={themeMode === 'dark' ? t('login>light') : t('login>dark')}
        onClick={toggleTheme}
      />
      <Wrapper>
        <FormWrapper>
          <StyledForm onSubmit={handleSubmit(onLoginSubmit)}>
            <HeaderWrapper>
              <Header>{t('login>title')}</Header>
              <SubHeader>{t('login>subtitle')}</SubHeader>
            </HeaderWrapper>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Input
                  type="email"
                  autoComplete="username"
                  placeholder={t('login>emailPlaceholder')}
                  id="email"
                  label={t('login>email')}
                  error={fieldState.error?.message ? t(`login>${fieldState.error?.message}`) : ''}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Input
                  autoComplete="current-password"
                  type="password"
                  placeholder={t('login>passwordPlaceholder')}
                  id="password"
                  label={t('login>password')}
                  error={fieldState.error?.message ? t(`login>${fieldState.error?.message}`) : ''}
                  {...field}
                />
              )}
            />
            <StyledButton size="xl" onClick={handleSubmit(onLoginSubmit)} disabled={isLoggingIn}>
              {t('login>login')}
            </StyledButton>
          </StyledForm>
        </FormWrapper>
        <MapSection $themeMode={themeMode}>
          <PropertySection $themeMode={themeMode} />
        </MapSection>
      </Wrapper>
    </>
  )
}

export default Login
