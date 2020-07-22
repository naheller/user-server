import React from 'react'
import AuthProvider, { useAuthContext } from '../context/AuthProvider'
import Login from './Login'
import CreateUser from './CreateUser'
import UserList from './UserList'

const AppWithContext = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)

const App = () => {
  const { user } = useAuthContext()
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

const AuthenticatedApp = () => {
  const { setUser } = useAuthContext()

  return (
    <div className="wrapper">
      <UserList />
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  )
}

const UnauthenticatedApp = () => (
  <div className="wrapper">
    <Login />
    <CreateUser />
  </div>
)

module.exports = AppWithContext
