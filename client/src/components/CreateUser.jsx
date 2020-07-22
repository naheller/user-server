import React, { useState } from 'react'
import { getNameErrors, getPasswordErrors } from '../utils/formValidation'
import { createUser } from '../endpoints'

export const CreateUser = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const resetFields = () => {
    setName('')
    setPassword('')
    setErrors([])
  }

  const handleCreateUser = () => {
    const validationErrors = [...getNameErrors(name), ...getPasswordErrors(password)]

    if (validationErrors.length) {
      setErrors(validationErrors)
    } else {
      setErrors([])

      createUser({ name, password })
        .then((data) => data.json())
        .then((data) => {
          if (data.error) throw Error(data.error)
          resetFields()
        })
        .catch((err) => {
          setErrors([err.toString()])
        })
    }
  }

  return (
    <div>
      <h1>Create User</h1>
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
      <button onClick={handleCreateUser}>Create</button>
      <div>
        {errors.map((error, i) => (
          <div key={`error-${i}`}>{error}</div>
        ))}
      </div>
    </div>
  )
}

export default CreateUser
