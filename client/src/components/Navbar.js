import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'




const Navbar = () => {
    const [open, setOpen] = useState(false)
    
    const change = open && 'change' 
    const verNav = open ? 'show': 'close' 

  

    return (
        <nav className="navbar">
            <div className="logo">
                <i className="fas fa-comment-dollar fa-3x" id="dollar"></i>
            </div>
            <button className={`burger ${change}`} onClick={() => setOpen(!open)} >
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </button>
            <ul className={`listNav ${open && 'verticalNav'} ${verNav}`}>
                <li>
                    <NavLink exact to="/" activeClassName="active" className={`navLink btnNavHover `} >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/api/expenses" activeClassName="active" className={`navLink btnNavHover`} >
                        Budget
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/salary" activeClassName="active" className={`navLink btnNavHover`} >
                        Salary
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/login" activeClassName="active" className={`navLink btnNavHover`} >
                        Log In
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/signup" activeClassName="active" className={`navLink btnNavHover`} >
                        Sign Up
                    </NavLink>
                </li>
            </ul>
          
        </nav>
    )
}

export default Navbar
