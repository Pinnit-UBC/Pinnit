// src/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an external service
    console.error("ErrorBoundary caught an error", error, errorInfo);

    // Optionally send the error to an external logging service
    // logErrorToMyService(error, errorInfo);

    // Update state with error details
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    // Reset the error boundary state and retry the rendering
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Oops! Something went wrong.</h1>
          <p>We're sorry for the inconvenience. Please try again or contact support if the issue persists.</p>
          <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={this.handleRetry} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
