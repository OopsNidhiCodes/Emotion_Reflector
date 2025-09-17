import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function Navbar() {
  const location = useLocation()
  const { user, login, logout } = useAuth()

  // Enhanced active state detection function
  const isActive = (path) => {
    if (path === '/mirror') {
      // Mirror link should be active for both "/" and "/mirror" paths
      return location.pathname === '/' || location.pathname === '/mirror'
    }
    return location.pathname === path
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="Reality Reflector - Home">
          Reality Reflector
        </Link>

        <ul className="nav-links" role="menubar">
          <li role="none">
            <Link 
              to="/mirror" 
              className={isActive('/mirror') ? "nav-link active" : "nav-link"}
              role="menuitem"
              aria-current={isActive('/mirror') ? 'page' : undefined}
            >
              Mirror
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/memory" 
              className={isActive('/memory') ? "nav-link active" : "nav-link"}
              role="menuitem"
              aria-current={isActive('/memory') ? 'page' : undefined}
            >
              Memory
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/mentor" 
              className={isActive('/mentor') ? "nav-link active" : "nav-link"}
              role="menuitem"
              aria-current={isActive('/mentor') ? 'page' : undefined}
            >
              Mentor
            </Link>
          </li>
        </ul>

        <div className="nav-auth">
          {user ? (
            <div className="user-menu" role="group" aria-label="User account">
              <span className="user-email" aria-label={`Logged in as ${user.email}`}>
                {user.email}
              </span>
              <button 
                onClick={logout} 
                className="auth-button"
                aria-label="Log out of your account"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={login} 
              className="auth-button"
              aria-label="Log in to your account"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
