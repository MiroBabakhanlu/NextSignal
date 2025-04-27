import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details (e.g., to Sentry or console)
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render a fallback UI
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>Please try again later.</p>
                </div>
            );
        }

        // Render children if no error
        return this.props.children;
    }
}

export default ErrorBoundary;
