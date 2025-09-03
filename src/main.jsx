import { createRoot } from 'react-dom/client'
import './styles/null.scss'
import './styles/fontsGilroy.scss'
import './styles/fontsOswald.scss'

import App from './App.jsx'
// import AppTEST from './AppTEST.jsx'

createRoot(document.getElementById('root')).render(
  <App />
  // <AppTEST />
)
