import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProvider'

const PrivateRoute = ({ component: Destination, ...rest }) => {
  const { user } = useAuthContext()

  const renderDestination = ({ location }) => {
    if (user) {
      return <Destination />
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  }

  return <Route {...rest} render={renderDestination} />
}

export default PrivateRoute
