import React from 'react'
import { Route, Redirect } from 'react-router-dom'
export default function PrivateRoute({component: Component, user, activeProject, toggleMenu, menuIsOpen, addFontLinks,redirectPath, ...rest}) {
  return (
   <Route {...rest} render={(props) => {
    {if(user) {
      return <Component loggedInUser={user} activeProject={activeProject} toggleMenu={toggleMenu} menuIsOpen={menuIsOpen} {...props}/>
     } else {
       return <Redirect to={{pathname: redirectPath}}/>
     }
    }
   }} />
  )
}