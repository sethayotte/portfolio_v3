import React, { useEffect, useState, createElement } from "react";
import { Link, useLocation } from "react-router-dom";
import * as TbIcon from "react-icons/tb";
import * as IoIcon from "react-icons/io5";
import * as FaIcon from "react-icons/fa";
import * as FaSixIcon from "react-icons/fa6";
import * as BsIcon from "react-icons/bs";
import * as HiIcon from "react-icons/hi2";
import * as SiIcon from "react-icons/si";
import { FaIdBadge } from "react-icons/fa";
import { BsAppIndicator } from "react-icons/bs";
import { TbChevronRight } from "react-icons/tb";
import ProjectData from "../data/projects.json";

const Project = ({ darkMode }) => {
  const location = useLocation();

  const [project, setProject] = useState();
  const [invalidProject, setInvalidProject] = useState(false);
  const [iconList, setIconList] = useState();

  const [showingTagCount, setShowingTagCount] = useState(2);

  const [previousModeState, setPreviousModeState] = useState();

  const [screenshotNumber, setScreenshotNumber] = useState();

  const updateWidth = () => {
    if (window.innerWidth < 740) {
      setShowingTagCount(project?.content?.tags?.length);
    } else {
      setShowingTagCount(2);
    }
  };

  window.addEventListener("resize", updateWidth);

  useEffect(() => {
    if (previousModeState === undefined) {
      setPreviousModeState(darkMode);
    }
    setTimeout(() => {
      setPreviousModeState(darkMode);
    }, 500);
  }, [darkMode]);

  useEffect(() => {
    if (location.state && !project) {
      setProject(location.state.project);
    } else {
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

  useEffect(() => {
    if (project) {
      updateWidth();
    }
  }, [project]);

  const toggleTags = (length) => {
    if (length > 2) {
      if (showingTagCount === 2) {
        setShowingTagCount(length);
      } else {
        setShowingTagCount(2);
      }
    }
  };

  const Icon = ({ iconName }) => {
    let icon;

    if (iconName.slice(0, 2) === "Io") {
      icon = React.createElement(IoIcon[iconName]);
    } else if (iconName.slice(0, 2) === "Tb") {
      icon = React.createElement(TbIcon[iconName]);
    } else if (iconName.slice(0, 2) === "Fa") {
      icon = React.createElement(FaIcon[iconName]);
    } else if (iconName.slice(0, 3) === "6Fa") {
      icon = React.createElement(FaSixIcon[iconName.slice(1)]);
    } else if (iconName.slice(0, 2) === "Bs") {
      icon = React.createElement(BsIcon[iconName]);
    } else if (iconName.slice(0, 2) === "Hi") {
      icon = React.createElement(HiIcon[iconName]);
    } else if (iconName.slice(0, 2) === "Si") {
      icon = React.createElement(SiIcon[iconName]);
    }

    return (
      <div
        className={
          (iconName.toLowerCase().includes("stripe") ||
            iconName.toLowerCase().includes("capacitor") ||
            iconName.toLowerCase().includes("expo") ||
            iconName.toLowerCase().includes("sketch")) &&
          "large-icon"
        }
      >
        {icon}
      </div>
    );
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
          className={"project-card animated"}
          id={project.slug}
          style={{ backgroundColor: `${project.color}` }}
        >
          <section
            className={
              project?.content?.tags?.length > 2 && showingTagCount !== 2
                ? "project-header stacked"
                : "project-header"
            }
          >
            <div className="project-brand">
              <img
                src={
                  darkMode ? "." + project.logoDark : "." + project.logoLight
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
            <div
              className={
                project?.content?.tags?.length > 2 && showingTagCount !== 2
                  ? "project-chips expanded"
                  : "project-chips"
              }
            >
              {project?.content?.tags
                ?.slice(0, showingTagCount)
                .map((tag, index) => {
                  return (
                    <span
                      className={
                        index === project?.content?.tags.length - 1
                          ? "tag last-expanded"
                          : "tag"
                      }
                      style={{
                        color: `${project.fontColor}`,
                        backgroundColor: `${project.content.tileColor}`,
                        animationDelay: index / 20 + "s",
                      }}
                    >
                      <Icon
                        iconName={tag?.icon}
                        style={{ color: `${project.fontColor}` }}
                      />
                      <span className="tag-name-wrapper">
                        <div className="tag-name">{tag?.title}</div>
                      </span>
                    </span>
                  );
                })}
              {project?.content?.tags?.length > 2 && showingTagCount === 2 && (
                <span
                  className="tag count"
                  style={{
                    color: `${project.fontColor}`,
                    backgroundColor: `${project.content.tileColor}`,
                  }}
                >
                  +{project?.content?.tags?.length - 2}
                </span>
              )}
              {project?.content?.tags?.length > 2 && (
                <span
                  onClick={() => toggleTags(project?.content?.tags?.length)}
                  className={
                    project?.content?.tags?.length > 2 && showingTagCount !== 2
                      ? "more expanded"
                      : "more"
                  }
                  style={{
                    color: `${project.fontColor}`,
                    backgroundColor: `${project.content.tileColor}`,
                  }}
                >
                  <TbChevronRight />
                </span>
              )}
            </div>
          </section>
          <section className="project-hero-items">
            <div
              className={
                project.leftAlignedTagline ? "tagline left-aligned" : "tagline"
              }
            >
              <h2
                style={{
                  color: `${project.fontColor}`,
                  fontFamily: `${project.font}`,
                  fontWeight: `${project.weight}`,
                }}
                dangerouslySetInnerHTML={{ __html: project.content.tagline }}
              ></h2>
            </div>
            <label
              className="highlight-label"
              style={{ color: `${project.fontColor}` }}
            >
              {project.content.highlightsHeader}
            </label>
            <div className="highlight-tiles">
              {project.content.highlightsItems?.map((item, index) => {
                return (
                  <div
                    className="highlight-tile"
                    key={index}
                    style={{
                      backgroundColor: `${project.content.tileColor}`,
                      color: `${project.fontColor}`,
                    }}
                  >
                    <Icon
                      iconName={item.icon}
                      style={{ color: `${project.fontColor}` }}
                    />
                    <span style={{ color: `${project.fontColor}` }}>
                      {item.label}
                    </span>
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
              <div
                dangerouslySetInnerHTML={{
                  __html: project.content.description,
                }}
                style={{
                  color: `${project.fontColor}`,
                  fontFamily: `${project.font}`,
                  fontWeight: `${project.content.descriptionFontWeight}`,
                }}
              ></div>
            </div>
            {project?.content.hasLinks && (
              <div className="links">
                <div
                  style={{ color: `${project.content.headerIconColor}` }}
                  class="proj-section-header"
                >
                  <Icon iconName={project.content.linksIcon} />
                  <label style={{ color: `${project.fontColor}` }}>
                    {project.content.linksHeader}
                  </label>
                </div>
                <div className="link-tiles">
                  {project.content.links.map((link, index) => {
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        style={{
                          color: `${project.fontColor}`,
                          backgroundColor: `${project.content.tileColor}`,
                        }}
                      >
                        {link.title}
                        <Icon iconName="TbExternalLink" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
            {project?.content.visuals.length > 0 && (
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
                {project.content.notMobileVisuals ? (
                  <div>
                    {project.content.visuals.map((item, index) => {
                      return (
                        <img
                          className={
                            index === 0
                              ? "not-mobile-screenshot phone"
                              : "not-mobile-screenshot"
                          }
                          src={item}
                          key={index}
                        />
                      );
                    })}
                  </div>
                ) : (
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
                    {(!darkMode ||
                      (darkMode && !project.content.visualsHaveDarkAssets)) &&
                      project.content.visuals.map((item, index) => {
                        return (
                          <sl-carousel-item>
                            <img src={item} key={index} />
                          </sl-carousel-item>
                        );
                      })}
                    {darkMode &&
                      project.content.visualsHaveDarkAssets &&
                      project.content?.darkVisuals?.map((item, index) => {
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
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export { Project };
