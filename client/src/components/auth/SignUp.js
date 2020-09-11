import React, { useState, Fragment} from 'react'
import Home from '../Home'



const SignUp = () => {

    const [toggle, setToggle] = useState(true)
    let visible = toggle ? 'visible' : ''

    let email, password, passwordConfirm, name ;
    const changeHendler = () => {

    }
    
    const submitHendler = () => {

    }

    const toggleHendler = () => setToggle(false)

    return (
        <Fragment>
            <Home /> 
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
