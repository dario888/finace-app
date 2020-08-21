import React, { useState, Fragment} from 'react'
import Home from '../Home'





const LogIn = () => {

    const [toggle, setToggle] = useState(true)

    let visible = toggle ? 'visible' : ''
    let email, password;
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
                    <input type="button" onClick={toggleHendler} value="Cancel" className="btnForm" id="cancel"/>
                    <input type="submit" value="Submit" className="btnForm" id="sub"/>
                </div>
            </form>
            </div>
        </Fragment>
    )
}

export default LogIn
