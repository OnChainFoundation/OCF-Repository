import React from 'react'
import './App.css'

const Home = function (): JSX.Element {
  return <div>Hello and welcome to OnChain Foundations...</div>
}

const Header = function (): JSX.Element {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
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
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Donate
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                About
              </a>
            </li>
          </ul>
          <button className="btn btn-outline-light" type="button">
            Connect
          </button>
        </div>
      </div>
    </nav>
  )
}

const App = function (): JSX.Element {
  return (
    <div>
      <Header />
      <Home />
    </div>
  )
}

export default App
