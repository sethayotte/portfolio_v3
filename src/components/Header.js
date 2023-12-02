import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Switch from "react-switch";

const Header = ({ darkMode, handleDarkModeToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [expandedMenu, setExpandedMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const updateWidth = () => {
    if (window.innerWidth < 740) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  };

  window.addEventListener("resize", updateWidth);

  const toggleMenu = () => {
    setExpandedMenu(!expandedMenu);
  };

  useEffect(() => {
    updateWidth();
  }, []);

  const scrollHandler = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      id="app-header"
      className={isDesktop || !expandedMenu ? "header" : "header expanded"}
    >
      <div className="header-content">
        <a onClick={() => scrollHandler()}>
          <h1>Seth Mitchell</h1>
        </a>
        <section className={expandedMenu ? "nav close" : "nav"}>
          {isDesktop ? null : (
            <div className="mobile-menu-toggle">
              {expandedMenu ? (
                <IoCloseOutline onClick={toggleMenu} />
              ) : (
                <IoIosMenu onClick={toggleMenu} />
              )}
            </div>
          )}
          {isDesktop ? (
            <nav className={isDesktop ? "desktop" : "hidden"}>
              <Link
                to="/resume"
                className={location.pathname.includes("resume") ? "active" : ""}
              >
                resume
              </Link>
              <Link
                to="/work"
                className={location.pathname.includes("work") ? "active" : ""}
              >
                work
              </Link>
              <Link
                to="/travel"
                className={location.pathname.includes("travel") ? "active" : ""}
              >
                travel
              </Link>
              <label id="color-mode-toggle">
                <Switch
                  onChange={handleDarkModeToggle}
                  checked={darkMode ? true : false}
                  offColor="#D4D4D4"
                  onColor="#3C3C3C"
                  onHandleColor="#1B1B1B"
                  checkedIcon={<BsFillMoonFill />}
                  uncheckedIcon={<BsFillSunFill />}
                  height={35}
                  width={65}
                  handleDiameter={25}
                />
              </label>
            </nav>
          ) : (
            <nav className={expandedMenu ? "mobile open" : "mobile"}>
              <Link
                to="/resume"
                onClick={toggleMenu}
                className={location.pathname.includes("resume") ? "active" : ""}
              >
                resume
              </Link>
              <Link
                to="/work"
                onClick={toggleMenu}
                className={location.pathname.includes("work") ? "active" : ""}
              >
                work
              </Link>
              <Link
                to="/travel"
                onClick={toggleMenu}
                className={location.pathname.includes("travel") ? "active" : ""}
              >
                travel
              </Link>
              <label id="color-mode-toggle">
                <Switch
                  onChange={handleDarkModeToggle}
                  checked={darkMode ? true : false}
                  offColor="#D4D4D4"
                  onColor="#3C3C3C"
                  onHandleColor="#1B1B1B"
                  checkedIcon={<BsFillMoonFill />}
                  uncheckedIcon={<BsFillSunFill />}
                  height={35}
                  width={65}
                  handleDiameter={25}
                />
              </label>
            </nav>
          )}
        </section>
      </div>
      {expandedMenu && !isDesktop ? (
        <span id="mobile-menu-overlay" onClick={toggleMenu}></span>
      ) : null}
    </header>
  );
};

export { Header };
