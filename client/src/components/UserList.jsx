import React, { useState } from 'react'
import { getUserList } from '../endpoints'

export default function UserList() {
  const [userList, setUserList] = useState([])
  const [error, setError] = useState('')

  const getUsers = () => {
    getUserList()
      .then((data) => {
        if (!data.ok) throw Error(data.statusText)
        return data.json()
      })
      .then((data) => {
        const names = data.map((user) => user.username)
        setUserList(names)
        setError('')
      })
      .catch((err) => {
        setError(err.toString())
      })
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {userList.map((user, i) => (
          <li key={`user-${i}`}>{user}</li>
        ))}
      </ul>
      {error && <div>{error}</div>}
      <button onClick={getUsers}>Get Users</button>
    </div>
  )
}
