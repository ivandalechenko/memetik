import { createRoot } from 'react-dom/client'
import './styles/null.scss'
import './styles/fontsGilroy.scss'
import './styles/fontsOswald.scss'

import App from './App.jsx'
// import AppTEST from './AppTEST.jsx'

(function initRealVh() {
  const vh = window.innerHeight * 0.01;         // 1vh в px
  document.documentElement.style.setProperty('--vh', `${vh}px`);
})();

createRoot(document.getElementById('root')).render(
  <App />
  // <AppTEST />
)
