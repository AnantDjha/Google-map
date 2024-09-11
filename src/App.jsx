import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './component/Map'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home/Home'
import Form from './component/Form'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    { path:"/" , element:<><MapComponent/><Home/></>},
    { path:"/map" , element:<><MapComponent/></>},
    { path:"/address" , element:<><Form/></>},
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
