import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundDown } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";
import HomeData from "../data/home.json";
import ProjectData from "../data/projects.json";

const Landing = ({ darkMode, isMobileSafari }) => {
  const navigate = useNavigate();

  const [isDesktop, setIsDesktop] = useState(false);

  const updateWidth = () => {
    if (window.innerWidth < 740) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  };

  window.addEventListener("resize", () => {
    updateWidth();
  });

  const fadeMenuBar = () => {
    let windowHeight = window.innerHeight;
    let currScrollPos2 =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (currScrollPos2 > windowHeight / 3) {
      document.getElementById("app-header").style.opacity =
        currScrollPos2 / (windowHeight / 3) - 2;
      document.getElementById("app-header").style.display = "flex";
    } else {
      document.getElementById("app-header").style.display = "none";
    }
  };

  useEffect(() => {
    updateWidth();

    let scrollPoint =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPoint < 100) {
      document.getElementById("app-header").style.opacity = 0;
    }
    document.addEventListener("scroll", fadeMenuBar, true);
    return () => {
      document.removeEventListener("scroll", fadeMenuBar, true);
      document.getElementById("app-header").style.opacity = 1;
      document.getElementById("app-header").style.display = "flex";
    };
  }, []);

  return (
    <section className="landing-wrapper">
      <section className="fold">
        <h1>Seth Mitchell</h1>
        <span className="above-the-fold-links">
          <Link to="/resume">resume</Link>
          <Link to="/work">work</Link>
          <Link to="/travel">travel</Link>
        </span>
        {isMobileSafari ? (
          <a href="#featured-project" className="fold-arrow safari">
            <IoIosArrowRoundDown />
          </a>
        ) : (
          <a href="#featured-project" className="fold-arrow">
            <IoIosArrowRoundDown />
          </a>
        )}
      </section>
      {HomeData.landingIntroCards.map((card, index) => {
        return (
          <section id={card.id} className="landing-intro-card" key={index}>
            {card.id.includes("technologies") ? (
              <div className="tech-imgs">
                <img
                  id="css3"
                  className="top-end"
                  src={darkMode ? card.imagesDark[0] : card.imagesLight[0]}
                />
                <img
                  src={darkMode ? card.imagesDark[1] : card.imagesLight[1]}
                />
                <img
                  className="top-end"
                  src={darkMode ? card.imagesDark[2] : card.imagesLight[2]}
                />
              </div>
            ) : null}
            {card.id.includes("experience") ? (
              <div className="work-imgs">
                <img
                  className="top-end"
                  src={darkMode ? card.imagesDark[0] : card.imagesLight[0]}
                />
                <img
                  id="vcu"
                  src={darkMode ? card.imagesDark[1] : card.imagesLight[1]}
                />
                <img
                  className="top-end"
                  src={darkMode ? card.imagesDark[2] : card.imagesLight[2]}
                />
              </div>
            ) : null}
            <div className="card-text">
              {isDesktop ? (
                <h2>{card.copy}</h2>
              ) : (
                <h2>{card.mobileCopy ? card.mobileCopy : card.copy}</h2>
              )}
              <Link to={card.linkRoute}>
                {card.linkText} <IoIosArrowRoundDown />
              </Link>
            </div>
            {card.id.includes("featured") ? (
              <img src={darkMode ? card.imagesDark[0] : card.imagesLight[0]} />
            ) : null}
            {card.id.includes("experience") ? (
              <div className="work-imgs">
                <img
                  className="bottom-end"
                  src={darkMode ? card.imagesDark[3] : card.imagesLight[3]}
                />
                <img
                  id="compass"
                  src={darkMode ? card.imagesDark[4] : card.imagesLight[4]}
                />
                <img
                  className="bottom-end"
                  src={darkMode ? card.imagesDark[5] : card.imagesLight[5]}
                />
              </div>
            ) : null}
            {card.id.includes("technologies") ||
            card.id.includes("expereince") ? (
              <div className="tech-imgs">
                <img
                  className="bottom-end"
                  src={darkMode ? card.imagesDark[3] : card.imagesLight[3]}
                />
                <img
                  src={darkMode ? card.imagesDark[4] : card.imagesLight[4]}
                />
                <img
                  className="bottom-end"
                  src={darkMode ? card.imagesDark[5] : card.imagesLight[5]}
                />
              </div>
            ) : null}
          </section>
        );
      })}
      <section className="landing-project-tiles">
        <h2 className="landing-project-help-text">
          Select a tile to explore a project:
        </h2>
        <div className="tiles-container">
          {ProjectData.map((project, index) => {
            return (
              <div
                className="landing-page-project-card"
                key={index}
                style={{
                  backgroundColor: project.color,
                  color: project.fontColor,
                }}
                onClick={() => navigate(`/work/${project.slug}`)}
              >
                <img src={darkMode ? project.logoDark : project.logoLight} />
                <h2
                  style={{
                    fontFamily: project.font,
                    fontWeight: project.weight,
                    color: project.fontColor,
                  }}
                >
                  {project.title}
                </h2>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export { Landing };
