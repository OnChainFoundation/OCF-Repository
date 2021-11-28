import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/App.css'
import {
  cleanWaterDescription,
  codePlusDescription,
  furryFriendsDescription,
} from '../assets/text/descriptions'
import cleanWaterLogo from '../assets/images/CleanWater.png'
import codePlusLogo from '../assets/images/CodePlus.png'
import furryFriendsLogo from '../assets/images/FurryFriends.png'

const charities = [
  {
    value: 1,
    label: 'Clean Water',
    description: cleanWaterDescription,
    src: cleanWaterLogo,
  },
  {
    value: 2,
    label: 'Code Plus',
    description: codePlusDescription,
    src: codePlusLogo,
  },
  {
    value: 3,
    label: 'Furry Friends',
    description: furryFriendsDescription,
    src: furryFriendsLogo,
  },
]

const Home = function (): JSX.Element {
  return (
    <main>
      <div className="banner-primary">
        <div className="main-content">
          <h1>On-Chain Foundation</h1>
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
                <div className="col-sm-6 col-lg-4 mb-3" key={item.label}>
                  <Link
                    to={`/donate/${item.value}`}
                    className="card text-decoration-none text-body"
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.src}
                          className="img-fluid rounded-start"
                          alt={`${item.label} Logo`}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.label}</h5>
                          <p className="card-text">{item.description}</p>
                        </div>
                      </div>
                    </div>
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
