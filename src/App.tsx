import { useState } from 'react'
import netflixLogo from '/netflix-logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const fireEvent = () => {
    const event = new CustomEvent("testEvent", {
      detail: count
    })

    console.log('inside fire ', event)
    console.log('again', chrome.runtime)

    window.dispatchEvent(event);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={netflixLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          THE BIG COUNT IS {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={fireEvent}>Fire Event</button>
    </>
  )
}

export default App
