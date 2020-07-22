import React, { useState, createContext, useContext } from 'react'

const defaultContext = {
  user: null,
  setUser: () => {},
  logout: () => {},
}

const AuthContext = createContext(defaultContext)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
