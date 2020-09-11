import React, {useReducer} from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setToken from '../setToken';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, 
LOGIN_FAIL, LOGOUT, CLEAR_ERRORS} from '../types';



//Creating the Context
export const AuthContext = React.createContext();

const AuthState = (props) => {
    const initialState = {
       token: localStorage.getItem('token'),
       isAuthenticated: null,
       loading: true,
       user: null,
       error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load User 
    const loadUser = async () => {
        //load token itno global headers
        if(localStorage.token) setToken(localStorage.token);
        
        try {
            const res = await axios.get('/api/auth');
            dispatch({type: USER_LOADED, payload: res.data})
        } catch (err) {
            dispatch({type: AUTH_ERROR})
            
        }      
    }
      
    //Registar User, sending data req to serverApp, token in localstorage
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {         
            const res = await axios.post('/api/users', formData, config);

            dispatch({type: REGISTER_SUCCESS, payload: res.data});
            loadUser();

        } catch (err) {
            dispatch({type: REGISTER_FAIL, payload: err.response.data.message});
            
        }
    }
   
    //Login User, sending data req to serverApp
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({type: LOGIN_SUCCESS, payload: res.data});
            loadUser();

        } catch (err) {
            dispatch({type: LOGIN_FAIL, payload: err.response.data.message});
            
        }
    }
   
    //Logout User
   const logout = () => dispatch({type: LOGOUT});
   
    //Clear Errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});
        

    

    return (

        <AuthContext.Provider value={ {
            token: state.token, 
            isAuthenticated: state.isAuthenticated,
            loading: state.loading, 
            error: state.error, 
            user: state.user, 
            register, l
            oadUser, 
            login, 
            logout, 
            clearErrors

        }}>
            {props.children}
        </AuthContext.Provider>
        
    )




  
}

export default AuthState;
