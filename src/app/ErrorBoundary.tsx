import * as React from "react";

interface IState {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<{}, IState> {
  public state: IState = {
    hasError: false
  };

  public componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
