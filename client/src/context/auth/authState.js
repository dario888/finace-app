import React, {useReducer} from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setToken from '../setToken';
import {SIGNUP_SUCCESS, SIGNUP_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, 
LOGIN_FAIL, LOGOUT, CLEAR_ERRORS, TOGGLE_MODAL, SIGNUP_MODAL} from '../type';



//Creating the Context
export const AuthContext = React.createContext();

const AuthState = (props) => {
    const initialState = {
       token: localStorage.getItem('token'),
       isAuthenticated: null,
       loading: true,
       user: null,
       toggle: true,
       toggleSignUp: true,
       error: null
    };
    // const [toggle, setToggle] = useState(true)
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load User 
    const loadUser = async () => {
        //load token itno global headers
        if(localStorage.token) setToken(localStorage.token);
        
        try {
            const res = await axios.get('/api/auth');
            dispatch({type: USER_LOADED, payload: res.data})//geting user from DB

        } catch (err) {
            dispatch({type: AUTH_ERROR})
            
        }      
    }
      
    //Registar User, sending data req to serverApp, token in localstorage
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {         
            const res = await axios.post('/api/users', formData, config);
            //geting token from DB
            dispatch({type: SIGNUP_SUCCESS, payload: res.data});
            loadUser();

        } catch (err) {
            dispatch({type: SIGNUP_FAIL, payload: err.response.data.msg});
            
        }
    }
   
    //Login User, sending data req to serverApp
    const login = async (formData) => {
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
            dispatch({type: LOGIN_FAIL, payload: err.response.data.msg});
            
        }
    }
   
    //Logout User
   const logout = () => dispatch({type: LOGOUT});
   
    //Clear Errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});
    //Show modal onClik LogIn 
    const setToggle = (boolTrue) => dispatch({type: TOGGLE_MODAL, payload: boolTrue});

    //Show modal onClik Signup
    const setSignUp = (boolTrue) => dispatch({type: SIGNUP_MODAL, payload: boolTrue});
    

    

    return (

        <AuthContext.Provider value={ {
            token: state.token, 
            isAuthenticated: state.isAuthenticated,
            loading: state.loading, 
            error: state.error, 
            user: state.user, 
            toggle: state.toggle, 
            toggleSignUp: state.toggleSignUp, 
            register, 
            loadUser, 
            login, 
            logout, 
            clearErrors,
            setToggle,
            setSignUp

        }}>
            {props.children}
        </AuthContext.Provider>
        
    )




  
}

export default AuthState;
