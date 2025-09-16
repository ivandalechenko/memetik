import { createRoot } from 'react-dom/client'
import './styles/null.scss'
import './styles/fontsGilroy.scss'
import './styles/fontsOswald.scss'

import App from './App.jsx'
// import AppTEST from './AppTEST.jsx'

let oldVh = 0;

function initRealVh() {
  if (window.innerWidth < 700) {
    if (window.innerHeight < oldVh) return
  }
  oldVh = window.innerHeight;
  const vh = window.innerHeight * 0.01;         // 1vh в px
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

initRealVh()
window.addEventListener('resize', initRealVh)

createRoot(document.getElementById('root')).render(
  <App />
  // <AppTEST />
)
