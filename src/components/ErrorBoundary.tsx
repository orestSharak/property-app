import { ReactNode, Component, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  // eslint-disable-next-line no-unused-vars
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          {this.props.fallback ? (
            this.props.fallback
          ) : (
            <details style={{ whiteSpace: 'pre-wrap', color: 'gray' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
