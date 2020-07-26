import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProvider'

const LoginLogoutButton = () => {
  const { user, logout } = useAuthContext()
  return user ? <button onClick={logout}>Logout</button> : <NavLink to="/login">Login</NavLink>
}

export default LoginLogoutButton
