import { useState } from 'react'
import './App.css'
import Greeting from './Greeting.jsx'
import Home from './Home.jsx'
import Counter from './Counter.jsx'
import Slider from './Slider.jsx'

function App() {

  return (
    <>
      <h1>Hello</h1>
      <Home />
      <Greeting name="Koushi" />
      <Counter />
      <Slider />
    </>
  )
}

export default App
