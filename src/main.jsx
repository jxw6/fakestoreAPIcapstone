import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { StateProvider } from './components/cartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </StateProvider>
  </React.StrictMode>,
)
