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
  const [darkMode, setDarkMode] = useState(false);

  const setDark = () => {
    setDarkMode(true);
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", "#131313");
    if (
      document
        .getElementById("portfolio-index")
        .classList.value.includes("sl-theme-light")
    ) {
      document
        .getElementById("portfolio-index")
        .classList?.remove("sl-theme-light");
    }
    document.getElementById("portfolio-index").classList?.add("sl-theme-dark");
  };

  const setLight = () => {
    setDarkMode(false);
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", "#ffffff");
    if (
      document
        .getElementById("portfolio-index")
        .classList.value.includes("sl-theme-dark")
    ) {
      document
        .getElementById("portfolio-index")
        .classList?.remove("sl-theme-dark");
    }
    document.getElementById("portfolio-index").classList?.add("sl-theme-light");
  };

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
    if (storedTheme === "dark") {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const handleDarkModeToggle = () => {
    if (!darkMode) {
      setDark();
    } else {
      setLight();
    }
  };

  const [isMobileSafari, setIsMobileSafari] = useState(false);

  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  let domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];

  useEffect(() => {
    setIsMobileSafari(iOSSafari);
  }, [iOSSafari, domain]);

  const ScrollToTop = (props) => {
    const location = useLocation();

    useEffect(() => {
      if (!window.sessionStorage.getItem("lastPosition")) {
        window.sessionStorage.setItem("lastPosition", "");
      }
      let lastPosition = window.sessionStorage.getItem("lastPosition");
      if (lastPosition === "") {
        window.sessionStorage.setItem("lastPosition", location.pathname);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      if (
        !lastPosition.includes("/work/") &&
        lastPosition !== location.pathname
      ) {
        window.sessionStorage.setItem("lastPosition", location.pathname);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      if (lastPosition.includes("/work/") && location.pathname !== "/work") {
        window.sessionStorage.setItem("lastPosition", location.pathname);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
            darkMode={darkMode}
            handleDarkModeToggle={handleDarkModeToggle}
          />
        </div>
        <ScrollToTop>
          <Routes>
            <Route
              path="/"
              element={
                <Landing darkMode={darkMode} isMobileSafari={isMobileSafari} />
              }
            />
            <Route path="/work" element={<Work darkMode={darkMode} />} />
            <Route
              path="/work/:projSlug"
              element={<Project darkMode={darkMode} />}
            />
            <Route path="/resume" element={<Resume />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ScrollToTop>
        <div>
          <Footer domain={domain} />
        </div>
      </Router>
    </div>
  );
};

export default App;
