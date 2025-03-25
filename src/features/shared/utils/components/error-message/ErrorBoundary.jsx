import React from 'react'
import ErrorMessage from '.'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    // Also store error and errorInfo for display
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Store the error and errorInfo in state
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      const errorMessage = this.state.error?.message || 'Something went wrong'
      const errorName = this.state.error?.name || 'Error'
      const componentStack = this.state.errorInfo?.componentStack || ''

      return (
        <ErrorMessage
          errorInfo={this.state.errorInfo}
          message={errorMessage}
          subMessage={componentStack}
          title={errorName}
          // You can pass additional error details if your ErrorMessage component accepts them
          error={this.state.error}
        />
      )
    }

    // Return children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary
