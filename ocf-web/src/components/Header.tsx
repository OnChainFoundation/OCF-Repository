import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useMoralis } from 'react-moralis'
import logo from '../assets/images/OnChainFoundationLOGO1.png'

const Header = function (): JSX.Element {
  const { authenticate, logout, isAuthenticated, user } = useMoralis()

  const { enableWeb3, isWeb3Enabled } = useMoralis()

  const renderMetaButton = (): JSX.Element => {
    if (!isAuthenticated) {
      return (
        <div>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => {
              authenticate()
              if (!isWeb3Enabled) {
                enableWeb3()
              }
            }}
          >
            Authenticate
          </button>
        </div>
      )
    }

    return (
      <div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => logout()}
        >
          {user?.get('ethAddress')}
        </button>
      </div>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid mx-5">
        <Link className="navbar-brand" to="/">
          <img src={logo} height="50" width="135" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="fs-5 nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="fs-5 nav-link" to="/donate">
                Donate
              </NavLink>
            </li>
          </ul>
          {renderMetaButton()}
        </div>
      </div>
    </nav>
  )
}

export default Header
