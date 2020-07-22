import React, { useState, createContext, useContext } from 'react'

const defaultContext = {
  user: null,
  setUser: () => {},
}

const AuthContext = createContext(defaultContext)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
