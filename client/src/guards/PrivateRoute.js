import React from 'react'
import { Route, Redirect } from 'react-router-dom'
export default function PrivateRoute({component: Component, user, redirectPath, ...rest}) {
  return (
   <Route {...rest} render={(props) => {
    {if(user) {
      return <Component loggedInUser={user} {...props}/>
     } else {
       return <Redirect to={{pathname: redirectPath}}/>
     }
    }
   }} />
  )
}