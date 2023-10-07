import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundDown } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";
import HomeData from "../data/home.json";
import ProjectData from "../data/projects.json";

const Landing = ({ darkMode, isMobileSafari }) => {
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

  const tileStaggerConfig = [
    [60, 40],
    [30, 70],
    [60, 40],
    [35, 65],
  ];
  const rowStaggerConfig = [450, 400, 450, 400];

  const RenderTileRow = (item) => {
    // Desktop Drawer Elements
    let leftDrawer = document?.getElementById(
      `description-drawer-${item.index}-0`
    );
    let leftOpenButton = document?.getElementById(
      `open-drawer-${item.index}-0`
    );
    let leftCloseButton = document?.getElementById(
      `close-drawer-${item.index}-0`
    );
    let rightDrawer = document?.getElementById(
      `description-drawer-${item.index}-1`
    );
    let rightOpenButton = document?.getElementById(
      `open-drawer-${item.index}-1`
    );
    let rightCloseButton = document?.getElementById(
      `close-drawer-${item.index}-1`
    );

    // Mobile Dialog Elements
    let leftDialog = document?.getElementById(
      `description-dialog-${item.index}-0`
    );
    let leftDialogOpenButton = document?.getElementById(
      `open-dialog-${item.index}-0`
    );
    let leftDialogCloseButton = document?.getElementById(
      `close-dialog-${item.index}-0`
    );
    let rightDialog = document?.getElementById(
      `description-dialog-${item.index}-1`
    );
    let rightDialogOpenButton = document?.getElementById(
      `open-dialog-${item.index}-1`
    );
    let rightDialogCloseButton = document?.getElementById(
      `close-dialog-${item.index}-1`
    );

    useEffect(() => {
      leftDrawer = document?.getElementById(
        `description-drawer-${item.index}-0`
      );
      leftOpenButton = document?.getElementById(`open-drawer-${item.index}-0`);
      leftCloseButton = document?.getElementById(
        `close-drawer-${item.index}-0`
      );
      rightDrawer = document?.getElementById(
        `description-drawer-${item.index}-1`
      );
      rightOpenButton = document?.getElementById(`open-drawer-${item.index}-1`);
      rightCloseButton = document?.getElementById(
        `close-drawer-${item.index}-1`
      );

      leftDialog = document?.getElementById(
        `description-dialog-${item.index}-0`
      );
      leftDialogOpenButton = document?.getElementById(
        `open-dialog-${item.index}-0`
      );
      leftDialogCloseButton = document?.getElementById(
        `close-dialog-${item.index}-0`
      );
      rightDialog = document?.getElementById(
        `description-dialog-${item.index}-1`
      );
      rightDialogOpenButton = document?.getElementById(
        `open-dialog-${item.index}-1`
      );
      rightDialogCloseButton = document?.getElementById(
        `close-dialog-${item.index}-1`
      );

      if (leftDrawer && rightDrawer && isDesktop) {
        leftOpenButton.addEventListener("click", () => {
          leftDrawer.show();
          document.body.style.setProperty(
            "--tile-popup-color",
            item.row[0].color
          );
        });
        leftCloseButton.addEventListener("click", () => leftDrawer.hide());
        rightOpenButton.addEventListener("click", () => {
          rightDrawer.show();
          document.body.style.setProperty(
            "--tile-popup-color",
            item.row[1].color
          );
        });
        rightCloseButton.addEventListener("click", () => rightDrawer.hide());
      }

      if (leftDialog && rightDialog && !isDesktop) {
        leftDialogOpenButton.addEventListener("click", () => {
          leftDialog.show();
          document.body.style.setProperty(
            "--tile-popup-color",
            item.row[0].color
          );
        });
        leftDialogCloseButton.addEventListener("click", () =>
          leftDialog.hide()
        );
        rightDialogOpenButton.addEventListener("click", () => {
          rightDialog.show();
          document.body.style.setProperty(
            "--tile-popup-color",
            item.row[1].color
          );
        });
        rightDialogCloseButton.addEventListener("click", () =>
          rightDialog.hide()
        );
      }
    }, [leftDrawer, rightDrawer, leftDialog, rightDialog]);

    return (
      <div
        className="project-grid-row"
        style={{
          gridTemplateColumns: `${tileStaggerConfig[item.index][0]}% ${
            tileStaggerConfig[item.index][1]
          }%`,
          height: `${rowStaggerConfig[item.index]}px`,
        }}
      >
        <div
          className="project-landing-tile"
          id={item.row[0].content.slug}
          style={{
            backgroundColor: `${item.row[0].color}`,
            color: `${item.row[0].fontColor}`,
          }}
        >
          <div className="branding-wrapper">
            <img
              src={darkMode ? item.row[0].logoDark : item.row[0].logoLight}
            />
            <h2
              style={{
                fontFamily: `${item.row[0].font}, sans-serif`,
                fontWeight: `${item.row[0].weight}`,
              }}
            >
              {item.row[0].title}
            </h2>
          </div>
          <BsPlusCircleFill
            id={
              isDesktop
                ? "open-drawer-" + item.index + "-0"
                : "open-dialog-" + item.index + "-0"
            }
            className="project-info-toggle"
            style={{ color: `${item.row[0].toggleColor}` }}
          />
        </div>
        <div
          className="project-landing-tile"
          id={item.row[1].content.slug}
          style={{
            backgroundColor: `${item.row[1].color}`,
            color: `${item.row[1].fontColor}`,
          }}
        >
          <div className="branding-wrapper">
            <img
              src={darkMode ? item.row[1].logoDark : item.row[1].logoLight}
            />
            <h2
              style={{
                fontFamily: `${item.row[1].font}, sans-serif`,
                fontWeight: `${item.row[1].weight}`,
              }}
            >
              {item.row[1].title}
            </h2>
          </div>
          <BsPlusCircleFill
            id={
              isDesktop
                ? "open-drawer-" + item.index + "-1"
                : "open-dialog-" + item.index + "-1"
            }
            className="project-info-toggle"
            style={{ color: `${item.row[1].toggleColor}` }}
          />
        </div>

        <sl-drawer
          contained
          label="Drawer"
          placement="bottom"
          id={"description-drawer-" + item.index + "-0"}
        >
          <h2
            slot="label"
            style={{
              color: `${item.row[0].fontColor}`,
              fontFamily: `${item.row[0].font}`,
              fontWeight: `${item.row[0].weight}`,
            }}
          >
            <img
              src={darkMode ? item.row[0].logoDark : item.row[0].logoLight}
            />{" "}
            {item.row[0].title}
          </h2>
          <span
            id={"close-drawer-" + item.index + "-0"}
            className="close-btn"
            slot="header-actions"
          >
            <BsPlusCircleFill style={{ color: `${item.row[0].toggleColor}` }} />
          </span>
          <span
            style={{
              color: `${item.row[0].fontColor}`,
              fontFamily: `${item.row[0].font}`,
              fontWeight: `${item.row[0].content.descriptionFontWeight}`,
            }}
          >
            {item.row[0].content.description}
          </span>
        </sl-drawer>
        <sl-drawer
          contained
          placement="bottom"
          id={"description-drawer-" + item.index + "-1"}
        >
          <h2
            slot="label"
            style={{
              color: `${item.row[1].fontColor}`,
              fontFamily: `${item.row[1].font}, sans-serif`,
              fontWeight: `${item.row[1].weight}`,
            }}
          >
            <img
              src={darkMode ? item.row[1].logoDark : item.row[1].logoLight}
            />{" "}
            {item.row[1].title}
          </h2>
          <span
            id={"close-drawer-" + item.index + "-1"}
            className="close-btn"
            slot="header-actions"
          >
            <BsPlusCircleFill style={{ color: `${item.row[1].toggleColor}` }} />
          </span>
          <span
            style={{
              color: `${item.row[1].fontColor}`,
              fontFamily: `${item.row[1].font}`,
              fontSize: "18pt",
              fontWeight: `${item.row[1].content.descriptionFontWeight}`,
            }}
            dangerouslySetInnerHTML={{
              __html: item.row[1].content.description,
            }}
          ></span>
        </sl-drawer>
        <sl-dialog id={"description-dialog-" + item.index + "-0"}>
          <h2
            slot="label"
            style={{
              color: `${item.row[0].fontColor}`,
              fontFamily: `${item.row[0].font}, sans-serif`,
              fontWeight: `${item.row[0].weight}`,
            }}
          >
            <img
              src={darkMode ? item.row[0].logoDark : item.row[0].logoLight}
            />{" "}
            {item.row[0].title}
          </h2>
          <span
            id={"close-dialog-" + item.index + "-0"}
            className="close-btn"
            slot="header-actions"
          >
            <BsPlusCircleFill style={{ color: `${item.row[0].toggleColor}` }} />
          </span>
          <span style={{ color: `${item.row[0].fontColor}` }}>
            {item.row[1].content.description}
          </span>
        </sl-dialog>
        <sl-dialog id={"description-dialog-" + item.index + "-1"}>
          <h2
            slot="label"
            style={{
              color: `${item.row[1].fontColor}`,
              fontFamily: `${item.row[1].font}, sans-serif`,
              fontWeight: `${item.row[1].weight}`,
            }}
          >
            <img
              src={darkMode ? item.row[1].logoDark : item.row[1].logoLight}
            />{" "}
            {item.row[1].title}
          </h2>
          <span
            id={"close-dialog-" + item.index + "-1"}
            className="close-btn"
            slot="header-actions"
          >
            <BsPlusCircleFill style={{ color: `${item.row[1].toggleColor}` }} />
          </span>
          <span style={{ color: `${item.row[1].fontColor}` }}>
            {item.row[1].content.description}
          </span>
        </sl-dialog>
      </div>
    );
  };

  let rowDividedData = ProjectData.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

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
      <section id="project-tiles">
        {rowDividedData.map((row, index) => {
          return <RenderTileRow row={row} index={index} key={index} />;
        })}
      </section>
    </section>
  );
};

export { Landing };
