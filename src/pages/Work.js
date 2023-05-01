import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProjectData from "../data/projects.json";

const Work = ({ defaultDark }) => {

  const navigate = useNavigate();

  const tileStaggerConfig = [ [60, 40], [30, 70], [60, 40], [35, 65] ];
  const rowStaggerConfig = [ 450, 400, 450, 400 ];

  const navigateToProject = (item, side) => {
    navigate(`${item.row[side].content.slug}`, {state: {project: item.row[side]}});
  }

  const RenderTileRow = (item) => {

    return (
      <div className="project-grid-row" style={{gridTemplateColumns: `${tileStaggerConfig[item.index][0]}% ${tileStaggerConfig[item.index][1]}%`, height: `${rowStaggerConfig[item.index]}px`}}>
        <div 
          className="project-tile" 
          id={item.row[0].content.slug} 
          onClick={() => {navigateToProject(item, 0)}}
          style={{backgroundColor: `${item.row[0].color}`, color: `${item.row[0].fontColor}`}}>
          <div className="branding-wrapper">
            <img src={defaultDark ? item.row[0].logoDark : item.row[0].logoLight} />
            <h2 style={{fontFamily: `${item.row[0].font}, sans-serif`, fontWeight: `${item.row[0].weight}`}}>{item.row[0].title}</h2>
          </div>
        </div>
        <div 
          className="project-tile" 
          id={item.row[1].content.slug}
          onClick={() => {navigateToProject(item, 1)}}
          style={{backgroundColor: `${item.row[1].color}`, color: `${item.row[1].fontColor}`}}>
          <div className="branding-wrapper">
            <img src={defaultDark ? item.row[1].logoDark : item.row[1].logoLight} />
            <h2 style={{fontFamily: `${item.row[1].font}, sans-serif`, fontWeight: `${item.row[1].weight}`}}>{item.row[1].title}</h2>
          </div>
        </div>
      </div>
    )
  }

  let rowDividedData = ProjectData.reduce(function(result, value, index, array) {
    if (index % 2 === 0)
      result.push(array.slice(index, index + 2));
    return result;
  }, []);

  return (
    <div className="projects">
      <h1>Work</h1>
      <section>
        {
          rowDividedData.map((row, index) => {
            return (
              <RenderTileRow row={row} index={index} key={index} />
            )
          })
        }
      </section>
    </div>
  );
};

export { Work };