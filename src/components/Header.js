import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CBGCLogo from "./CbgcLogo"



const Header = ({ isLoggedIn, username }) => (

    <div className='navbar'>
    <header>
    <NavLink to="/">
      <CBGCLogo />
      </NavLink>
   
      <div className='title'>

      <p className="font-bold text-inherit">Classical Board</p>
      <p className="font-bold text-inherit"> Games Collection</p>

      </div>
  
    <ul className="main-nav">
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to={isLoggedIn ? "/user" : "/login"}>{isLoggedIn ? `Hi, ${username}` : "Login"}</NavLink></li>
      {/* <li><NavLink to="/login">Login</NavLink></li> */}
      <li><NavLink to="/allboardgames">All Games</NavLink></li>
      <li><NavLink to="/cart">Cart</NavLink></li>
    </ul>
    <NavLink id='signUp' to="/signup"><button color="primary" variant="flat">Sign Up</button></NavLink>    
  </header>

  </div>
  
);

export default Header;