import React, {useState} from 'react'



const Navbar = () => {
    const [open, setOpen] = useState(false)
    
    const change = open && 'change' 
    const verNav = open ? 'show': 'close' 
  



    return (
        <nav className="navbar">
            <div className="logo">
                <i className="fas fa-home fa-2x"></i>
                {/* Logo */}
            </div>
            <button className={`burger ${change}`} onClick={() => setOpen(!open)} >
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </button>
            <ul className={`listNav ${open && 'verticalNav'} ${verNav}`}>
                <li><a href="/" className="navLink">Home</a></li>
                <li><a href="/" className="navLink">Budget</a></li>
                <li><a href="/" className="navLink">Salary</a></li>
                <li><a href="/" className="navLink">Log In</a></li>
                <li><a href="/" className="navLink">Sign Up</a></li>
            </ul>
          
        </nav>
    )
}

export default Navbar
