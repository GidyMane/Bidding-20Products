import { ReactNode, Component } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red", fontFamily: "monospace", fontSize: "12px" }}>
          <h1 style={{ color: "red" }}>Error in component</h1>
          <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", backgroundColor: "#f5f5f5", padding: "10px" }}>
            <strong>Message:</strong> {this.state.error?.message || "Unknown error"}
            {"\n\n"}
            <strong>Stack:</strong> {"\n"}
            {this.state.error?.stack || "No stack trace available"}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
