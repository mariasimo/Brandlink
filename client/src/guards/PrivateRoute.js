import React from 'react'
import { Route, Redirect } from 'react-router-dom'
export default function PrivateRoute({component: Component, user, redirectPath, ...rest}) {

      console.log(user)

  return ( 
   <Route {...rest} render={(props) => {
    {if(user !== null) {
      return <Component loggedInUser={user} {...props}/>
     } else {
       return <Redirect to={redirectPath}/>
     }
    }
   }} />
  )
}