import { useCallback } from 'react'
import { toast, type ToastOptions } from 'react-toastify'

type Status = 'info' | 'success' | 'error'

type ShowToastParams = {
  content: string
  status?: Status
  options?: ToastOptions
}

export const useToast = () => {
  const showToast = useCallback(({ content, status, options }: ShowToastParams) => {
    switch (status) {
      case 'info':
        toast.info(content, options)
        return
      case 'success':
        toast.success(content, options)
        return
      case 'error':
        toast.error(content, options)
        return
      default:
        toast(content, options)
    }
  }, [])
  return { showToast }
}

// usage example
// const { showToast } = useToast();
//  showToast({
//             content: t('success'),
//             status: 'success',
//           });

//   showToast({
//               content: t('failure'),
//               status: 'error',
//             });
