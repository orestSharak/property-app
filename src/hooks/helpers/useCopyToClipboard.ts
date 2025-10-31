import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '../toast/useToast'

type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard(): CopyFn {
  const { t } = useTranslation()
  const { showToast } = useToast()

  return useCallback(
    async (text) => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard not supported')
        return false
      }

      try {
        await navigator.clipboard.writeText(text)
        showToast({
          content: t('hooks>toast>successfullyCopied'),
          status: 'success',
        })
        return true
      } catch (error) {
        console.warn('Copy failed', error)
        showToast({
          content: t('hooks>toast>failedCopy'),
          status: 'error',
        })
        return false
      }
    },
    [showToast, t],
  )
}
