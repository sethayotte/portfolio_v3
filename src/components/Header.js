import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosMenu } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import Switch from "react-switch";

const Header = ({handleDarkModeToggle, defaultDark}) => {

    const location = useLocation(); 

    const [ expandedMenu, setExpandedMenu ] = useState(false);
    const [ isDesktop, setIsDesktop ] = useState(false);
    

    const updateWidth = () => {
        if (window.innerWidth < 740) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
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
            <section className={expandedMenu ? 'nav close' : 'nav'}>
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
                {
                    isDesktop ?
                    <nav className={isDesktop ? 'desktop' : 'hidden'}>
                        <Link to="/resume" className={location.pathname.includes('resume') ? 'active' : ''}>resume</Link>
                        <Link to="/projects" className={location.pathname.includes('projects') ? 'active' : ''}>projects</Link>
                        <Link to="/travel" className={location.pathname.includes('travel') ? 'active' : ''}>travel</Link>
                        <label>
                            <Switch 
                                onChange={handleDarkModeToggle} 
                                checked={defaultDark ? true : false} 
                                offColor='#D4D4D4'
                                onColor='#1B1B1B'
                                onHandleColor='#3C3C3C'
                                checkedIcon={false}
                                uncheckedIcon={false}
                                height={35}
                                width={65}
                                handleDiameter={25}
                            />
                        </label>
                    </nav> :
                    <nav className={expandedMenu ? 'mobile open' : 'mobile'}>
                        <Link to="/resume" onClick={toggleMenu} className={location.pathname.includes('resume') ? 'active' : ''}>resume</Link>
                        <Link to="/projects" onClick={toggleMenu} className={location.pathname.includes('projects') ? 'active' : ''}>projects</Link>
                        <Link to="/travel" onClick={toggleMenu} className={location.pathname.includes('travel') ? 'active' : ''}>travel</Link>
                        <label>
                            <Switch 
                                onChange={handleDarkModeToggle} 
                                checked={defaultDark ? true : false} 
                                offColor='#D4D4D4'
                                onColor='#1B1B1B'
                                onHandleColor='#3C3C3C'
                                checkedIcon={false}
                                uncheckedIcon={false}
                                height={35}
                                width={65}
                                handleDiameter={25}
                            />
                        </label>
                    </nav>
                }
            </section>
        </div>
    </div>
  )
}

export { Header }