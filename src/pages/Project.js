import React, { useEffect, useState, createElement } from "react";
import { Link, useLocation } from "react-router-dom";
import * as TbIcon from "react-icons/tb";
import * as IoIcon from "react-icons/io5";
import * as FaIcon from "react-icons/fa";
import * as BsIcon from "react-icons/bs";
import { FaIdBadge } from "react-icons/fa";
import { BsAppIndicator } from "react-icons/bs";
import ProjectData from "../data/projects.json";

const Project = ({ defaultDark }) => {
  const location = useLocation();

  const [project, setProject] = useState();
  const [invalidProject, setInvalidProject] = useState(false);
  const [iconList, setIconList] = useState();

  const [screenshotNumber, setScreenshotNumber] = useState();

  useEffect(() => {
    if (location.state && !project) {
      setProject(location.state.project);
    } else {
      console.log(ProjectData);
      console.log("no project set in state");
      ProjectData?.map((project) => {
        if ("/work/" + project.slug === location.pathname) {
          setProject(project);
        }
      });
      if (!project) {
        setTimeout(() => {
          setInvalidProject(true);
        }, 1000);
      }
    }
  }, [location]);

  const Icon = ({ iconName }) => {
    let icon;

    if (iconName.slice(0, 2) === "Io") {
      icon = React.createElement(IoIcon[iconName]);
    } else if (iconName.slice(0, 2) === "Tb") {
      icon = React.createElement(TbIcon[iconName]);
    } else if (iconName.slice(0, 2) === "Fa") {
      icon = React.createElement(FaIcon[iconName]);
    } else if (iconName.slice(0, 2) === "Bs") {
      icon = React.createElement(BsIcon[iconName]);
    }

    return <div>{icon}</div>;
  };

  const handleScreenshotWidth = () => {
    if (window.innerWidth > 1425) {
      setScreenshotNumber(5);
    } else if (window.innerWidth < 1426 && window.innerWidth > 1175) {
      setScreenshotNumber(4);
    } else if (window.innerWidth < 1176 && window.innerWidth > 925) {
      setScreenshotNumber(3);
    } else if (window.innerWidth < 926 && window.innerWidth > 675) {
      setScreenshotNumber(2);
    } else {
      setScreenshotNumber(1);
    }
  };

  useEffect(() => {
    handleScreenshotWidth();

    window.addEventListener("resize", handleScreenshotWidth);

    return () => {
      window.removeEventListener("resize", handleScreenshotWidth);
    };
  }, []);

  return (
    <div className="project-showcase">
      <Link to="/work" className="back-to-work">
        <TbIcon.TbArrowBack /> All Work
      </Link>
      {!project ? (
        !invalidProject ? (
          <div className="project-loader">
            <sl-spinner class="spinner"></sl-spinner>
          </div>
        ) : (
          <div className="project-not-found">
            <TbIcon.TbAlertTriangleFilled />
            <span>
              Project not found. <Link to="/work">See all work here</Link>
            </span>
          </div>
        )
      ) : (
        <div
          className="project-card"
          id={project.content.slug}
          style={{ backgroundColor: `${project.color}` }}
        >
          <section className="project-header">
            <div className="project-brand">
              <img
                src={
                  defaultDark ? "." + project.logoDark : "." + project.logoLight
                }
              />
              <h1
                style={{
                  color: `${project.fontColor}`,
                  fontFamily: `${project.font}`,
                  fontWeight: `${project.weight}`,
                }}
              >
                {project.title}
              </h1>
            </div>
            <div className="status-info-chips">
              <div>
                <span
                  className="project-info-chip"
                  style={{ backgroundColor: `${project.content.tileColor}` }}
                >
                  {project.content.technologies}
                </span>
                {/* <h4>TECH</h4> */}
                <TbIcon.TbCode />
              </div>
              <div>
                <span
                  className="project-info-chip"
                  style={{ backgroundColor: `${project.content.tileColor}` }}
                >
                  {project.content.role}
                </span>
                {/* <h4>ROLE</h4> */}
                <TbIcon.TbIdBadge />
              </div>
              <div>
                <span
                  className="project-info-chip"
                  style={{ backgroundColor: `${project.content.tileColor}` }}
                >
                  {project.content.status}
                </span>
                {/* <h4>STATUS</h4> */}
                <TbIcon.TbCircleDashed />
              </div>
            </div>
          </section>
          <section className="project-hero-items">
            <div className="tagline">
              <h2
                style={{
                  fontFamily: `${project.font}`,
                  fontWeight: `${project.weight}`,
                }}
              >
                {project.content.tagline}
              </h2>
            </div>
            <label className="highlight-label">
              {project.content.highlightsHeader}
            </label>
            <div className="highlight-tiles">
              {project.content.highlightsItems?.map((item, index) => {
                return (
                  <div
                    className="highlight-tile"
                    key={index}
                    style={{ backgroundColor: `${project.content.tileColor}` }}
                  >
                    <Icon iconName={item.icon} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="project-content">
            <div className="description">
              <div
                style={{ color: `${project.content.headerIconColor}` }}
                class="proj-section-header"
              >
                <Icon iconName={project.content.descriptionIcon} />
                <label style={{ color: `${project.fontColor}` }}>
                  {project.content.descriptionHeader}
                </label>
              </div>
              {project.content.description}
            </div>
            <div className="visuals">
              <div
                style={{ color: `${project.content.headerIconColor}` }}
                class="proj-section-header"
              >
                <Icon iconName={project.content.visualsIcon} />
                <label style={{ color: `${project.fontColor}` }}>
                  {project.content.visualsHeader}
                </label>
              </div>
              <sl-carousel
                slides-per-move="1"
                slides-per-page={screenshotNumber}
                navigation
                loop
              >
                <span
                  style={{ color: `${project.fontColor}` }}
                  slot="previous-icon"
                >
                  <TbIcon.TbSquareRoundedArrowLeftFilled />
                </span>
                {project.content.visuals.map((item, index) => {
                  console.log(item);
                  return (
                    <sl-carousel-item>
                      <img src={item} key={index} />
                    </sl-carousel-item>
                  );
                })}
                <span
                  style={{ color: `${project.fontColor}` }}
                  slot="next-icon"
                >
                  <TbIcon.TbSquareRoundedArrowRightFilled />
                </span>
              </sl-carousel>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export { Project };
