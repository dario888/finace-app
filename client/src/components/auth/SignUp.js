import React, { useState, useContext, useEffect, Fragment} from 'react';
import  {useHistory} from 'react-router-dom';
import Home from '../Home';
import Alert from '../Alert';
import {AlertContext} from '../../context/alert/alertState';
import {AuthContext} from '../../context/auth/authState';


const SignUp = () => {
    //Context
    const {setAlert} = useContext(AlertContext); 
    const {register, error, clearErrors, isAuthenticated} = useContext(AuthContext); 

    const [toggle, setToggle] = useState(true)
   
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    let {email, name, password, passwordConfirm} = user;

    const history = useHistory();

    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }

        if(error === 'User already exists'){
            setAlert(error, 'danger')
            clearErrors();
        }


        //eslint-disable-next-line
    },[error, isAuthenticated, history])
    

    //Set the user
    const changeHendler = (e) => setUser({...user, [e.target.name]: e.target.value });
    
    const submitHendler = (e) => {
        e.preventDefault();
  
        if(password !== passwordConfirm) setAlert('Password do not match', 'danger'); 
        
        register({name, email, password});//geting token from server
        
    }
    
    const toggleHendler = () => setToggle(false)
    
    
    let visible = toggle ? 'visible' : ''


    return (
        <Fragment>
            <Home /> 
            <Alert /> 
            <div id="backdrop" className={visible} onClick={toggleHendler}></div>
            <div className={`modal ${visible}`}>
            <h1>Account <span className="textPrimary">Sign Up</span></h1>
            <form onSubmit={submitHendler}>
                <div className="modalContent">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={name} onChange={changeHendler} required/>
                </div>
                <div className="modalContent">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={email} onChange={changeHendler} required/>
                </div>
                <div className="modalContent">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={changeHendler} required
                    maxLength={12} minLength={6}  placeholder="enter min 6, max 12 character" />
                </div>
                <div className="modalContent">
                    <label htmlFor="passwordConfirm">Password Confirm</label>
                    <input type="password" name='passwordConfirm' value={passwordConfirm} 
                    onChange={changeHendler} required maxLength={12} minLength={6} 
                    placeholder="enter min 6, max 12 character"/>
                </div>
                <div className="modalActions">
                    <input type="button" onClick={toggleHendler} value="Cancel" className="btnForm btnHover" id="cancel"/>
                    <input type="submit" value="Submit" className="btnForm btnHover" id="subSignUp"/>
                </div>
            </form>
        </div>

        </Fragment>
    )
}

export default SignUp
