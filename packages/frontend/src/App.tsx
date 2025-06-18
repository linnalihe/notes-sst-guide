import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import Routes from "./Routes.tsx";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppContext } from "./lib/contextLib";
import type { AppContextType } from "./lib/contextLib"
import { Auth } from "aws-amplify"
import { useNavigate } from "react-router-dom";
import { showError } from "./lib/errorLib.ts"

function App() {
  const nav = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    onLoad();
  }, [])

  async function onLoad() {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);

    } catch (e) {
      if( e !== "No current user"){
        showError(e)
      }
    }
    setIsAuthenticating(false)
  }

  async function handleLogout() {
    await Auth.signOut();
    setIsAuthenticated(false);
    nav("/login");
  }

  return !isAuthenticating && (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
          <Navbar.Brand href="/" className="fw-bold text-muted">Scratch</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
              <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated } as AppContextType}>
      <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;