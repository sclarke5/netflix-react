import './App.css'

const AppDrawer = () => {
  const firePullUpEvent = (type: string) => {
    (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      //@ts-ignore
      const response = await chrome.tabs.sendMessage(tab.id, {
        name: 'pullUpEvent',
        type
      });
    })();
  }

  const fireFilterEvent = (type: string) => {
    (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      //@ts-ignore
      const response = await chrome.tabs.sendMessage(tab.id, {
        name: 'filterEvent',
        type
      });
    })();
  }

  return (
    <div className='controlPanel flex flex-col items-center'>
      <h2 className='font-black text-2xl my-6'>Override Netflix's Shitty UI</h2>
      <div className='grid grid-cols-2 w-full'>
        <div className='flex flex-col items-center'>
          <h3 className='font-bold text-lg text-center'>Rearrange Content</h3>
          <button className="text-md my-4" onClick={() => firePullUpEvent('continue-watching')}>Pull Up Continue Watching</button>
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='font-bold text-lg text-center'>Filter Content</h3>
          <button className="text-md my-4" onClick={() => fireFilterEvent('filterOutNetflix')}>Filter Out Netflix Content</button>
        </div>
      </div>
    </div>
  )
}

export default AppDrawer
