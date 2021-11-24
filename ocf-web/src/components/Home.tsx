import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/App.css'
// import Select from 'react-select'

const ipsum =
  // eslint-disable-next-line max-len
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const charities = [
  {
    value: 1,
    label: 'Tree Charity',
    description: ipsum,
  },
  {
    value: 2,
    label: 'Ocean Charity',
    description: ipsum,
  },
  {
    value: 3,
    label: 'Dog Charity',
    description: ipsum,
  },
]

const Home = function (): JSX.Element {
  return (
    <main>
      <div className="banner-primary">
        <div className="main-content">
          <h1>OnChain Foundations</h1>
          <h4>
            Connecting donors and charities through the power of blockchain
          </h4>
        </div>
      </div>
      <div className="container">
        <div className="main-content">
          <div className="row mt-3">
            {charities.map((item) => {
              return (
                <div className="col-sm-6 col-lg-4">
                  <Link
                    to={`/donate/${item.value}`}
                    className="card text-decoration-none text-body"
                  >
                    <div className="card-header">{item.label}</div>
                    <div className="card-body">{item.description}</div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
