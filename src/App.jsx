import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useAppDelegate } from './AppDelegate'

const root = createRoot(document.getElementById('root'))
const router = createRouter({routeTree})

const App = () => {
    useAppDelegate(); // Initialize app delegate
    
    return (
        <RouterProvider router={router}/>
    )
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)