import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppDrawer from './AppDrawer'

const bringContinueWatchingToTop = () => {
  const continueWatching = document.querySelector('[data-list-context="continueWatching"]');
  const hero = document.querySelector(".volatile-billboard-animations-container");

  if(hero) {
    hero.appendChild(continueWatching);
  }
}

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

window.addEventListener('testEvent', (e) => {
  console.log('in content: ', e.detail)
  switch(e.detail) {
    case 'pullUpContinueWatching':
      bringContinueWatchingToTop();
  }
})


ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppDrawer />
  </React.StrictMode>
);