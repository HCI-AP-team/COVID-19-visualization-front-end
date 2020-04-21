import React, { Component } from 'react'

export default class ErrorBound extends Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
          <h1>Something went wrong. Please refresh the page.</h1>
        </div>
      )
    }

    return this.props.children;
  }
}
