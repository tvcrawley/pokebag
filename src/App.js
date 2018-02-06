import React from 'react'
import './App.css'
import Header from './components/layout/Header'
import Body from './components/layout/Body'
import Footer from './components/layout/Footer'

function App (props) {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default App
