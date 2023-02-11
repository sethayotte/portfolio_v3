import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

  const location = useLocation(); 
    
  return (
    <div className='header'>
        <Link to='/'>
            <h1>Seth Mitchell</h1>
        </Link>
        <nav>
            <Link to="/resume" className={location.pathname.includes('resume') ? 'active' : ''}>resume</Link>
            <Link to="/work" className={location.pathname.includes('work') ? 'active' : ''}>work</Link>
            <Link to="/contact" className={location.pathname.includes('contact') ? 'active' : ''}>contact</Link>
        </nav>
    </div>
  )
}

export { Header }