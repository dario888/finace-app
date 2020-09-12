import React, { useState, useContext, useEffect, Fragment} from 'react'
import  {useHistory} from 'react-router-dom';
import Home from '../Home'

import {AlertContext} from '../../context/alert/alertState';
import {AuthContext} from '../../context/auth/authState';




const LogIn = () => {
    //CONTEXT
    const {setAlert} = useContext(AlertContext); 
    const {login, error, clearErrors, isAuthenticated} = useContext(AuthContext); 

    const [toggle, setToggle] = useState(true)
    const [user, setUser] = useState({ email: '', password: ''})

    const history = useHistory();

    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }

        if(error === 'Invalid Credentials'){
            setAlert(error, 'danger')
            clearErrors();
        }


        //eslint-disable-next-line
    }, [error,isAuthenticated, history])
    
    let {email, password} = user;

    //Set the user
    const changeHendler = (e) => setUser({...user, [e.target.name]: e.target.value });
    
    const submitHendler = (e) => {
        e.preventDefault();

        login({email, password})
        
    }
    
    const toggleHendler = () => setToggle(false)
    
    let visible = toggle ? 'visible' : ''


    return (
        <Fragment>
            <Home />         
            <div id="backdrop" className={visible} onClick={toggleHendler}></div>
            <div className={`modal ${visible}`}>
            <h1>Account <span className="textPrimary">Login</span></h1>
            <form onSubmit={submitHendler}>             
                <div className="modalContent">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={email} onChange={changeHendler} required/>
                </div>
                <div className="modalContent">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={changeHendler} required/>
                </div>
                <div className="modalActions">
                    <input type="button" onClick={toggleHendler} value="Cancel" className="btnForm btnHover" id="cancel"/>
                    <input type="submit" value="Submit" className="btnForm btnHover" id="subLogin"/>
                </div>
            </form>
            </div>
        </Fragment>
    )
}

export default LogIn
