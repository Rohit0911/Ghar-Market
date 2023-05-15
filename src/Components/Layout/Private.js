import {Navigate,Outlet} from 'react-router-dom'

import React from 'react'
import useAuthState from '../../Hooks/useAuthState'
import Spinner from '../Spinner'

const Private = () => {
 
  const {loggedIn,checkState}=useAuthState()
  if(checkState){
    return <Spinner/>
  }
  return loggedIn ? <Outlet/> : <Navigate to="/signin"/>

}

export default Private
