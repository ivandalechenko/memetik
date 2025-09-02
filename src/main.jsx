import { createRoot } from 'react-dom/client'
import './null.scss'
import './fontsGilroy.scss'
import './fontsOswald.scss'

import App from './App.jsx'
import { StoreProvider } from './stores/StoreProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <App />
  </StoreProvider>
)
