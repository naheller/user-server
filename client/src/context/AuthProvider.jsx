import React, { useState, createContext, useContext } from 'react'

// TODO: Sync with server sessions to determine auth
// Maybe add a /checkSession endpoint for this
// Also need to periodically check when user is idle

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
