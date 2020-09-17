import React, {useState, useContext, Fragment,  } from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from '../context/auth/authState'
import {ExpensesContext} from '../context/expenses/expensesState'
import {BudgetsContext} from '../context/budget/budgetState'




const Navbar = () => {

    const {logout, isAuthenticated, setToggle, setSignUp} = useContext(AuthContext)
    const {clearExpanses} = useContext(ExpensesContext)
    const {clearBudgets} = useContext(BudgetsContext)

    const [open, setOpen] = useState(false)
    const [openVer, setOpenVer] = useState(true)

    const change = ((open && openVer) || (!open && !openVer)) ? 'change' : null 
    const verNav = ((open && openVer) || (!open && !openVer)) ? 'show': 'close' 
    const verticalNav = ((open && openVer) || (!open && !openVer)) ? 'verticalNav': null

    
    const logoutHendeler = () =>{ 
        logout();
        clearExpanses();
        clearBudgets();
        if(verNav === 'show'){
            setOpenVer(!openVer);
        }
        
    };
 
    const openLogInForm = () => {
        setToggle(true);
        if(verNav === 'show'){
            setOpenVer(!openVer);
        }
    }
    const openSignUpForm = () => {
        setSignUp(true); 
        if(verNav === 'show'){
            setOpenVer(!openVer);
        }
    }

    const authLinks = (
        <Fragment>
            <li>
                <a href='/login' onClick={logoutHendeler} className="navLink btnNavHover" >
                    <i className="fas fa-sign-out-alt"></i> <span className="hideSm">Log Out</span>
                </a>
            </li>
        </Fragment>
    )

    return (
        <nav className="navbar">
            <a href='/' className="logo">F<span id="pLed">P</span></a>
            <button className={`burger ${change}`} onClick={() => setOpen(!open)} >
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </button>
            <ul className={`listNav ${verticalNav} ${verNav}`}>
                <li>
                    <NavLink exact to="/" 
                    onClick={() => verNav === 'show' ? setOpenVer(!openVer) : null} 
                    activeClassName="active" className="navLink btnNavHover" >
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
