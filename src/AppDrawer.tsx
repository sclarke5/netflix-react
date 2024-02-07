import { useState } from 'react'
import './App.css'

const AppDrawer = () => {
  const [show, setShow] = useState(true);

  const fireEvent = () => {
    const event = new CustomEvent("testEvent", {
      detail: 'pullUpContinueWatching'
    })

    window.dispatchEvent(event);
  }

  const toggleControls = () => {
    setShow(!show);
  }

  return (
    <div className=''>
      <div className='toggleButton'>
        <button onClick={toggleControls}>Toggle Controls</button>
      </div>

      {show && (
        <div className='controlPanel flex flex-col items-center justify-center'>
          <h2 className='text-3xl mb-6'>Rearrange Netflix's Shitty UI</h2>
          <button className="p-4" onClick={fireEvent}>Pull Up Continue Watching</button>
        </div>
      )}

    </div>
  )
}

export default AppDrawer
