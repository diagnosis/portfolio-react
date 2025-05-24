import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const root = createRoot(document.getElementById('root'))
const router = createRouter({routeTree})

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)