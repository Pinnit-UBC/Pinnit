import React from "react"; // Import React for rendering UI components
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering the React app into the DOM
import App from "./App"; // Import the main App component
import "./index.css"; // Import global CSS styles
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter to manage client-side routing
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import MUI's ThemeProvider and createTheme for styling
import ErrorBoundary from "./ErrorBoundary"; // Import custom error boundary component for catching errors
import Header from "./components/Header";
import { EventProvider } from "./providers/EventsProvider";

// Create a custom MUI theme with specific colors and typography
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6", // Primary color for buttons, links, etc.
    },
    secondary: {
      main: "#19857b", // Secondary color
    },
    error: {
      main: "#ff4444", // Color for error messages or error states
    },
    background: {
      default: "#f4f5fd", // Default background color for the app
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Set the font family to Arial
    button: {
      textTransform: "none", // Ensure button text is not all uppercase
    },
  },
});

// Create the root of the app and mount it to the DOM element with the ID 'root'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EventProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <ErrorBoundary>
            <Header />
            <App />
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </EventProvider>
  </React.StrictMode>
);
