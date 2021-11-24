import React from 'react'
import { Link } from 'react-router-dom'
import { useMoralis } from 'react-moralis'

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
        <a className="navbar-brand" href="/">
          OnChain Foundations
        </a>
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
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donate">
                Donate
              </Link>
            </li>
          </ul>
          {renderMetaButton()}
        </div>
      </div>
    </nav>
  )
}

export default Header
