import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import { store } from './pages/data/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/food-delivery">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
