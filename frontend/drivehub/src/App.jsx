import React from 'react'
import { UserProvider } from './contexts/UserContext'
import Routes from './routes/AppRoutes'

function App() {

  return (
    <UserProvider>
      <Routes /> 
    </UserProvider>
  )
}

export default App
