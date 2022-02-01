import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <header>
        <div className="left"> 
          <Link to="/" />
          <Link to="/Result" Tenor />
          <Link to="/Giphy" Giphy />
        </div>
    </header>
  )
};

export default Navbar;