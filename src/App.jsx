import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Popup from './components/Popup.jsx'

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header />
      <button id="save_segment" onClick={() => setIsOpen(true)}>
        Save Segment
      </button>
      {isOpen && <Popup isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}

export default App
