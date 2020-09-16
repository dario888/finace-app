import React, {useState, useContext, Fragment,  } from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from '../context/auth/authState'
import {ExpensesContext} from '../context/expenses/expensesState'




const Navbar = () => {

    const {logout, isAuthenticated, setToggle, setSignUp} = useContext(AuthContext)
    const {clearExpanses} = useContext(ExpensesContext)

    const [open, setOpen] = useState(false)

    const change = open && 'change' 
    const verNav = open ? 'show': 'close' 

    
    const logoutHendeler = () =>{ 
        logout();
        clearExpanses();
        
    };
 
    const openLogInForm = () => {
        setToggle(true);
        setOpen(!open);
    }
    const openSignUpForm = () => {
        setSignUp(true); 
        setOpen(!open)
    }

    const authLinks = (
        <Fragment>
            <li>
                <a href='#!' onClick={logoutHendeler} className="navLink btnNavHover" >
                    <i className="fas fa-sign-out-alt"></i> <span className="hideSm">Log Out</span>
                </a>
            </li>
        </Fragment>
    )

    return (
        <nav className="navbar">
            <a href='/' className="logo">F<span>P</span> </a>
            <button className={`burger ${change}`} onClick={() => setOpen(!open)} >
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </button>
            <ul className={`listNav ${open && 'verticalNav'} ${verNav}`}>
                <li>
                    <NavLink exact to="/" onClick={() => setOpen(!open)} activeClassName="active" className="navLink btnNavHover" >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/api/expenses" activeClassName="active" 
                    onClick={openLogInForm} className="navLink btnNavHover" >
                        Bilance
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/salary" activeClassName="active" 
                    onClick={openLogInForm} className="navLink btnNavHover" >
                        Salary
                    </NavLink>
                </li>
                {
                    isAuthenticated ? authLinks :
                    <Fragment>
                    <li>
                        <NavLink exact to="/login" activeClassName="active" 
                        onClick={openLogInForm} className="navLink btnNavHover" >
                            Log In
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/signup" activeClassName="active" 
                        onClick={openSignUpForm} className="navLink btnNavHover" >
                            Sign Up 
                        </NavLink>
                    </li>
                </Fragment>
                }
            </ul>
          
        </nav>
    )
}

export default Navbar
