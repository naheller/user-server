import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import UserList from './UserList'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'
import LoginLogoutButton from './LoginLogoutButton'

const App = () => (
  <div className="wrapper">
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <LoginLogoutButton />
    </nav>
    <section>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/users" component={UserList} />
        <Route path="*" component={NotFound} />
      </Switch>
    </section>
  </div>
)

module.exports = App
