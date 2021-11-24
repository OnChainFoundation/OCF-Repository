import React from 'react'
import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Donate from './components/Donate'

const App = function (): JSX.Element {
  return (
    <BrowserRouter basename="/OCF-Repository">
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />}>
            <Route path=":charityId" element={<Donate />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
