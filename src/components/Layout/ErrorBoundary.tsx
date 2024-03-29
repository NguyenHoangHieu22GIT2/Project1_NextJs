import { PropsWithChildren } from "react";
import React from "react";

class ErrorBoundary extends React.Component<PropsWithChildren> {

    public state: { hasError: boolean };

    constructor(props: PropsWithChildren) {
        super(props)

        this.state = { hasError: false }
    }
    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI

        return { hasError: true };
    }
    componentDidCatch(error: any, errorInfo: any) {
        // You can use your own error logging service here
        console.log({ error, errorInfo });
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </div>
            );
        }
        return this.props.children;

    }
}
export { ErrorBoundary } 