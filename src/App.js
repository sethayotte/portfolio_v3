import "./App.scss";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Travel } from "./pages/Travel";
import { Landing } from "./pages/Landing";
import { Resume } from "./pages/Resume";
import { Work } from "./pages/Work";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";
import { Project } from "./pages/Project";

const App = () => {
  const [darkMode, setDarkMode] = useState();

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  function changeThemeColor() {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", defaultDark ? "#131313" : "#ffffff");
  }

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
    changeThemeColor();
  } else {
    setLight();
    changeThemeColor();
  }

  const handleDarkModeToggle = () => {
    if (darkMode) {
      setLight();
      setDarkMode(!darkMode);
    } else {
      setDark();
      setDarkMode(!darkMode);
    }
  };

  const [isMobileSafari, setIsMobileSafari] = useState(false);

  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  useEffect(() => {
    setIsMobileSafari(iOSSafari);
  }, [iOSSafari]);

  

  const ScrollToTop = (props) => {
    const location = useLocation();
    

    useEffect(() => {
      if (!window.sessionStorage.getItem('lastPosition')) {
        window.sessionStorage.setItem('lastPosition', '');
      }
      let lastPosition = window.sessionStorage.getItem('lastPosition');
      console.log(lastPosition);
      if (lastPosition === '') {
        window.sessionStorage.setItem('lastPosition', location.pathname);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        console.log('running');
      }
      if (!lastPosition.includes('/work/') && lastPosition !== location.pathname) {
        window.sessionStorage.setItem('lastPosition', location.pathname);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        console.log('running', !lastPosition.includes('/work/'), lastPosition, location.pathname);
      }
      if (lastPosition.includes('/work/') && location.pathname !== '/work') {
        window.sessionStorage.setItem('lastPosition', location.pathname);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        console.log('running', location.pathname);
      }
    }, [location]);

    return <>{props.children}</>;
  };

  document.addEventListener("touchstart", function () {}, true);

  window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${window.scrollY}px`
    );
  });

  const watchForHover = () => {
    // lastTouchTime is used for ignoring emulated mousemove events
    let lastTouchTime = 0;

    function enableHover() {
      if (new Date() - lastTouchTime < 500) return;
      document.body.classList.add("hasHover");
    }

    function disableHover() {
      document.body.classList.remove("hasHover");
    }

    function updateLastTouchTime() {
      lastTouchTime = new Date();
    }

    document.addEventListener("touchstart", updateLastTouchTime, true);
    document.addEventListener("touchstart", disableHover, true);
    document.addEventListener("mousemove", enableHover, true);

    enableHover();
  };

  watchForHover();

  return (
    <div>
      <Router>
        <div>
          <Header
            handleDarkModeToggle={handleDarkModeToggle}
            defaultDark={defaultDark}
          />
        </div>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Landing defaultDark={defaultDark} isMobileSafari={isMobileSafari} />} />
            <Route path="/work" element={<Work defaultDark={defaultDark} />} />
            <Route path="/work/:projSlug" element={<Project defaultDark={defaultDark} />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ScrollToTop>
        <div>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
