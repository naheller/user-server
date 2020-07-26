import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { getNameErrors, getPasswordErrors } from '../utils/formValidation'
import { loginUser } from '../endpoints'
import { useAuthContext } from '../context/AuthProvider'

export const Login = () => {
  const history = useHistory()
  const location = useLocation()
  const { user, setUser } = useAuthContext()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (user) {
      history.replace({ pathname: '/' })
    }
  }, [])

  const resetFields = () => {
    setName('')
    setPassword('')
    setErrors([])
  }

  const handleLogin = () => {
    const validationErrors = [...getNameErrors(name), ...getPasswordErrors(password)]

    if (validationErrors.length) {
      setErrors(validationErrors)
    } else {
      setErrors([])

      loginUser({ name, password })
        .then((data) => {
          if (!data.ok) throw Error(data.statusText)
          return data.json()
        })
        .then((data) => {
          if (!data.Item) {
            setErrors(['No user found'])
          } else {
            resetFields()
            setUser(data.Item.username)

            const { from } = location.state || { from: { pathname: '/' } }
            history.replace(from)
          }
        })
        .catch((err) => {
          setErrors([err.toString()])
        })
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {errors.map((error, i) => (
          <div key={`error-${i}`}>{error}</div>
        ))}
      </div>
    </div>
  )
}

export default Login
