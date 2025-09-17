import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import "./styles/global.css"
import "./styles/design-system.css"

// Ensure the root element exists
const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a div with id='root' in your HTML.")
}

// Create and render the React app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
