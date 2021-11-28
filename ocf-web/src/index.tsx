import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MoralisProvider } from 'react-moralis'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId="nZhIa97HSS5zdVaDSY2QsMjuUxVNGH5UvbC2ifvB"
      serverUrl="https://sa2j8qxy2coi.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
