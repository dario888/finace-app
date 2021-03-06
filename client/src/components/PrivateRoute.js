import React, {useState, useContext, Fragment } from 'react'
import {AuthContext} from '../context/auth/authState'
import {Route, Redirect} from 'react-router-dom'



const PrivateRoute = ({component: Component, ...rest}) => {

    const { isAuthenticated, loading} = useContext(AuthContext)

    return (
       <Route {...rest} render={props => !isAuthenticated && !loading ? 
        (<Redirect to='/login' /> ): (<Component {...props} />)
    } />
    )
}

export default PrivateRoute
