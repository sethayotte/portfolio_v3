import React, { useState } from "react";
import ResumeData from "../data/resume.json";
import Headshot from "../assets/SethMitchell_Headshot_Scaled.webp";
import ResumePDF from "../assets/Resume_2025.pdf";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { RxCrumpledPaper } from "react-icons/rx";
import { IoLogoTwitter, IoLogoGithub } from "react-icons/io";
import { IoPaperPlane } from "react-icons/io5";
import {
  TbSquareRoundedNumber0,
  TbSquareRoundedNumber1,
  TbSquareRoundedNumber2,
  TbSquareRoundedNumber3,
  TbCircleArrowUp,
  TbCertificate,
  TbCertificate2,
} from "react-icons/tb";

const Resume = () => {
  const [sectionOpen, setSectionOpen] = useState("");
  const [showEducationDetail, setShowEducationDetail] = useState(false);
  const [showExperienceDetail, setShowExperienceDetail] = useState(false);

  let showFooter = false;

  const toggleSection = (section) => {
    if (section === sectionOpen) {
      setSectionOpen("");
    } else {
      setSectionOpen(section);
    }
  };

  const toggleDetails = (src) => {
    if (src === "edu") {
      setShowEducationDetail(!showEducationDetail);
    }
    if (src === "exp") {
      setShowExperienceDetail(!showExperienceDetail);
    }
  };

  const renderExperienceDetail = (details) => {
    return (
      <ul>
        {details?.map((detail, index) => {
          return <li key={`experience-${index}`}>{detail}</li>;
        })}
      </ul>
    );
  };

  const renderMultiplePositions = (positions) => {
    return (
      <section className="multiple-position-wrapper">
        {positions.map((position, index) => {
          const renderMarker = () => {
            switch (index) {
              case 0:
                return <TbSquareRoundedNumber0 />;
                break;
              case 1:
                return <TbSquareRoundedNumber1 />;
                break;
              case 2:
                return <TbSquareRoundedNumber2 />;
                break;
              case 3:
                return <TbSquareRoundedNumber3 />;
                break;
            }
          };

          return (
            <div key={index} className="multiple-positions">
              {renderMarker()}
              <div>
                <p className="role">{position.title}</p>
                <p className="sub-dates">{position.dates}</p>
                <span
                  className={
                    showExperienceDetail
                      ? "experience-detail-wrapper expanded multiple"
                      : "experience-detail-wrapper multiple"
                  }
                >
                  {renderExperienceDetail(position.details)}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    );
  };

  return (
    <div className="resume">
      <section className="intro">
        <div className="intro-text">
          <h2>Hi, I'm Seth.</h2>
          <p>I'm a designer, developer, & traveler.</p>
          <p className="mobile-intro-text">I'm a </p>
          <div className="social-icons">
            <a
              className="link"
              href="https://twitter.com/sethmitchelldev"
              target="_blank"
            >
              <IoLogoTwitter />
            </a>
            <a
              className="link"
              href="https://github.com/sethayotte"
              target="_blank"
            >
              <IoLogoGithub />
            </a>
            <a
              className="link"
              href="mailto:hello@sethmitchell.dev?subject=Howdy!"
            >
              <IoPaperPlane />
            </a>
          </div>
        </div>
        <div>
          <a href="https://nickdavisphotography.com/about/" target="_blank">
            <img src={Headshot} />
          </a>
        </div>
      </section>
      <section className="education">
        <div className="edu-header">
          <span className="section-heading">Education</span>
          {showEducationDetail ? (
            <HiOutlineEyeOff onClick={() => toggleDetails("edu")} />
          ) : (
            <HiOutlineEye onClick={() => toggleDetails("edu")} />
          )}
        </div>
        {ResumeData?.education?.map((item, index) => {
          const renderEducationDocs = (docs) => {
            let documents = docs;
            return (
              <section className="edu-docs-container">
                {documents?.map((doc, index) => {
                  return (
                    <a
                      className="edu-docs"
                      key={index}
                      href={doc.url}
                      target="_blank"
                    >
                      {doc.type === "diploma" ? (
                        <TbCertificate />
                      ) : (
                        <TbCertificate2 className="narrow-cert" />
                      )}
                      {doc.description.toUpperCase()}
                    </a>
                  );
                })}
              </section>
            );
          };

          return (
            <div className="item" key={index}>
              <span>{item.dates}</span>
              <h3>{item.title}</h3>
              <p>{item.degree}</p>
              <p>{item.description}</p>
              <span
                className={
                  showEducationDetail
                    ? "experience-detail-wrapper expanded docs"
                    : "experience-detail-wrapper"
                }
              >
                {renderEducationDocs(item.documents)}
              </span>
            </div>
          );
        })}
      </section>
      <section className="experience">
        <div className="exp-header">
          <span className="section-heading">Work & Other Projects</span>
          {showExperienceDetail ? (
            <HiOutlineEyeOff onClick={() => toggleDetails("exp")} />
          ) : (
            <HiOutlineEye onClick={() => toggleDetails("exp")} />
          )}
        </div>
        {ResumeData.experience.map((item, index) => {
          return (
            <div className="item" key={index}>
              <span>{item.dates}</span>
              <h3>{item.company}</h3>
              <p>{item.location}</p>
              {item.position.length > 1 ? (
                renderMultiplePositions(item.position)
              ) : (
                <>
                  <p>{item.position[0].title}</p>
                  <span
                    className={
                      showExperienceDetail
                        ? "experience-detail-wrapper expanded"
                        : "experience-detail-wrapper"
                    }
                  >
                    {renderExperienceDetail(item.details)}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </section>
      <section className="proficiencies">
        <span className="section-heading">Proficiencies</span>
        {ResumeData.proficiencies.map((item, index) => {
          return (
            <div className="category" key={index}>
              <h3 onClick={() => toggleSection(item.section)}>
                {item.section}
                <TbCircleArrowUp
                  className={sectionOpen === item.section ? "down" : ""}
                />
              </h3>
              {<SectionList item={item} sectionOpen={sectionOpen} />}
            </div>
          );
        })}
      </section>
      {showFooter ? (
        <section className="disclaimer">
          <div className="disclaimer-container">
            {ResumeData.footer.disclaimer}
          </div>
        </section>
      ) : null}
      <div className="digital-copy-text">
        <RxCrumpledPaper />
        <p>
          Need a digital copy?&nbsp;
          <a href={ResumePDF} target="_blank">
            Download it here
          </a>
        </p>
      </div>
    </div>
  );
};

const SectionList = ({ item, sectionOpen }) => {
  return (
    <div
      className={
        sectionOpen === item.section
          ? "section-list-wrapper open"
          : "section-list-wrapper"
      }
    >
      <div className="section-list">
        {item.items.map((listItem, index) => {
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: listItem }}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export { Resume };
