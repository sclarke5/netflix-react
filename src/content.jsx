import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

const continueWatching = document.querySelector('[data-list-context="continueWatching"]');
const hero = document.querySelector(".volatile-billboard-animations-container");

if(hero) {
  hero.appendChild(continueWatching);
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
)