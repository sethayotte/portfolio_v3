import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosMenu } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

const Header = () => {

    const location = useLocation(); 

    const [ expandedMenu, setExpandedMenu ] = useState(false);
    const [ isDesktop, setIsDesktop ] = useState(true);

    const updateWidth = () => {
        setIsDesktop(window.innerWidth > 740);
    }

    window.addEventListener("resize", updateWidth);

    const toggleMenu = () => {
        setExpandedMenu(!expandedMenu);
    }

    useEffect(() => {
        updateWidth();
    }, [])
    
  return (
    <div className={(isDesktop || !expandedMenu) ? 'header' : 'header expanded'}>
        <div className='header-content'>
            <Link to='/'>
                <h1>Seth Mitchell</h1>
            </Link> 
            <section className={expandedMenu ? 'close' : ''}>
                {
                    isDesktop ?
                    null :
                    <div className='mobile-menu-toggle'>
                        {
                            expandedMenu ?
                            <IoCloseOutline onClick={toggleMenu} /> :
                            <IoIosMenu onClick={toggleMenu} />
                        }
                    </div>
                }
                <nav className={!isDesktop ? expandedMenu ? 'mobile open' : 'mobile' : 'desktop'}>
                    <Link to="/resume" onClick={!isDesktop ? toggleMenu : null} className={location.pathname.includes('resume') ? 'active' : ''}>resume</Link>
                    <Link to="/work" className={location.pathname.includes('work') ? 'active' : ''}>work</Link>
                    <Link to="/contact" className={location.pathname.includes('contact') ? 'active' : ''}>contact</Link>
                </nav>
            </section>
        </div>
    </div>
  )
}

export { Header }