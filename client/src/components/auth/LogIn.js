import React, { useState, useContext, useEffect, Fragment} from 'react'
import  {useHistory} from 'react-router-dom';
import Home from '../Home'
import Alert from '../../components/Alert'

import {AlertContext} from '../../context/alert/alertState';
import {AuthContext} from '../../context/auth/authState';




const LogIn = () => {
    //CONTEXT
    const {setAlert} = useContext(AlertContext); 
    const {login, error, clearErrors, isAuthenticated, setToggle, toggle} = useContext(AuthContext); 

    
    const [user, setUser] = useState({ email: '', password: ''})
    let {email, password} = user;

    const history = useHistory();

    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }

        if(error === 'Invalid Credentials'){
            setAlert(error, 'danger')
            clearErrors();
        }

        if(error === 'Invalid Password, Please enter valid Password'){
            setAlert(error, 'danger')
            setUser({...user, password: ''})
            clearErrors();
        }
        if(error === 'Please include valid email'){
            setAlert(error, 'danger')
            setUser({...user, password: ''})
            clearErrors();
        }


        //eslint-disable-next-line
    }, [error,isAuthenticated ])
    

    //Set the user
    const changeHendler = (e) => setUser({...user, [e.target.name]: e.target.value });
    
    const submitHendler = (e) => {
        e.preventDefault();

        login({email, password})
        
    }
    
    const toggleHendler = () => {
        setToggle(false)
        setUser({ email: '', password: ''})
    }
    
    let visible = toggle ? 'visible' : ''


    return (
        <Fragment>
            <Home />         
            <Alert />         
            <div id="backdrop" className={visible} onClick={toggleHendler}></div>
            <div className={`modal ${visible}`}>
            <h1>Account <span className="textPrimary">Login</span></h1>
            <form onSubmit={submitHendler}>             
                <div className="modalContent">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} onChange={changeHendler} required/>
                </div>
                <div className="modalContent">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} maxLength={12} minLength={6}
                    onChange={changeHendler} required/>
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
