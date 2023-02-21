import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProjectData from "../data/projects.json";

const Projects = ({ defaultDark }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [openProject, setOpenProject] = useState();
  const [openIndex, setOpenIndex] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const expandProject = (slug, index) => {
    setOpenProject(slug);
    setOpenIndex(index);
  };

  const collapseProject = () => {
    if (location.pathname === '/projects') {
      setOpenIndex();
      setOpenProject();
    } 
  }

  const updateWidth = () => {
    if (window.innerWidth < 740) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  };

  window.addEventListener("resize", updateWidth);

  const openProjectFromLink = () => {
    let linkedProject;
    if (!openProject && location.pathname.slice(10)) {
      ProjectData.map((project) => {
        if (project[0].content.slug === location.pathname.slice(10)) {
          linkedProject = project[0];
          expandProject(project[0].content.slug, 0);
        } else if (project[1].content.slug === location.pathname.slice(10)) {
          linkedProject = project[1];
          expandProject(project[1].content.slug, 1);
        }
      });
      if (!linkedProject) {
        navigate('/404');
      }
    }
  }

  useEffect(() => {
    updateWidth();
    collapseProject();
    openProjectFromLink();
  }, [location]);

  const RenderTileRow = ({ row, parentIndex }) => {
    return (
      <div
        className={
          isDesktop
            ? "project-row projects" + " " + "row" + parentIndex
            : "project-row projects" + " " + "row" + parentIndex
        }
      >
        <Link
          className={
            openProject === row[0].content.slug ? "tile fullscreen" : "tile"
          }
          to={row[0].content.slug}
          onClick={() => expandProject(row[0].content.slug, 0)}
          id={row[0].content.slug}
          style={{ backgroundColor: row[0].color }}
        >
          <div className="tile-header">
            <img src={defaultDark ? row[0].logoDark : row[0].logoLight} />
            <h2
              style={{
                color: row[0].fontColor,
                fontFamily: row[0].font,
                fontWeight: row[0].weight,
              }}
            >
              {row[0].title}
            </h2>
          </div>
          <div className={"tile-description open"}>
            {row[0].content.description}
          </div>
        </Link>
        <Link
          className={
            openProject === row[1].content.slug ? "tile fullscreen" : "tile"
          }
          to={row[1].content.slug}
          onClick={() => expandProject(row[1].content.slug, 1)}
          id={row[1].content.slug}
          style={{ backgroundColor: row[1].color }}
        >
          <div className="tile-header">
            <img src={defaultDark ? row[1].logoDark : row[1].logoLight} />
            <h2
              style={{
                color: row[1].fontColor,
                fontFamily: row[1].font,
                fontWeight: row[1].weight,
              }}
            >
              {row[1].title}
            </h2>
          </div>
          <div className={"tile-description open"}>
            {row[1].content.description}
          </div>
        </Link>
      </div>
    );
  };

  const RenderFullscreenProject = ({ row }) => {
    return (
      <section>
        {row[openIndex].content.slug === openProject ? (
          <div className="fullscreen-project" style={{ backgroundColor: row[openIndex].color }}>
            <div className="tile-header">
              <img src={defaultDark ? '../' + row[openIndex].logoDark : '../' + row[openIndex].logoLight} />
              <h2
                style={{
                  color: row[openIndex].fontColor,
                  fontFamily: row[openIndex].font,
                  fontWeight: row[openIndex].weight,
                }}
              >
                {row[openIndex].title}
              </h2>
            </div>
            <div className={"tile-description open"}>
              {row[openIndex].content.description}
            </div>
          </div>
        ) : null}
      </section>
    );
  };

  return (
    <div className="projects">
      <h1>Projects</h1>
      {
        openProject ?
        <Link to='/projects' onClick={() => collapseProject()}><h4>all work</h4></Link> :
        null
      }
      <section id="project-tiles" className="projects-page">
        {ProjectData.map((row, index) => {
          return (
            <>
              {openProject ? (
                <RenderFullscreenProject row={row} key={index} />
              ) : (
                <RenderTileRow row={row} parentIndex={index} key={index} />
              )}
            </>
          );
        })}
      </section>
    </div>
  );
};

export { Projects };
