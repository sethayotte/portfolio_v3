import React, { useEffect, useState, createElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as TbIcon from 'react-icons/tb';
import * as IoIcon from 'react-icons/io5';
import { FaIdBadge } from 'react-icons/fa';
import { BsAppIndicator } from 'react-icons/bs';

const Project = ({defaultDark}) => {

    const location = useLocation();

    const [ singleProject, setSingleProject ] = useState();
    const [ iconList, setIconList ] = useState();

    if (location.state) {
        var { project } = location.state;
        console.log(project.logoDark);
    } else {
        var project = singleProject;
    }

    const Icon = ({iconName}) => {
        let icon;

        if (iconName.slice(0, 2) === 'Io') {
            icon = React.createElement(IoIcon[iconName]);
        } else if (iconName.slice(0, 2) === 'Tb') {
            icon = React.createElement(TbIcon[iconName]);
        }
        
        return (
          <div>{icon}</div>
        );
      };

    useEffect(() => {
        console.log(project);
    }, []);

    return (
        <div className='project-showcase'>
            <Link to='/work' className='back-to-work'><TbIcon.TbArrowBack /> All Work</Link>
            <div className='project-card' id={project.content.slug} style={{backgroundColor: `${project.color}`}}>
                <section className='project-header'>
                    <div className='project-brand'>
                        <img src={defaultDark ? '.' + project.logoDark : '.' + project.logoLight} />
                        <h1 style={{color: `${project.fontColor}`, fontFamily: `${project.font}`, fontWeight: `${project.weight}`}}>{project.title}</h1>
                    </div>
                    <div className='status-info-chips'>
                        <div>
                            <span className='project-info-chip' style={{backgroundColor: `var(${project.content.tileColor})`}}>{project.content.technologies}</span>
                            {/* <h4>TECH</h4> */}
                            <TbIcon.TbCode />
                        </div>
                        <div>
                            <span className='project-info-chip' style={{backgroundColor: `var(${project.content.tileColor})`}}>{project.content.role}</span>
                            {/* <h4>ROLE</h4> */}
                            <TbIcon.TbIdBadge />
                        </div>
                        <div>
                            <span className='project-info-chip' style={{backgroundColor: `var(${project.content.tileColor})`}}>{project.content.status}</span>
                            {/* <h4>STATUS</h4> */}
                            <TbIcon.TbCircleDashed />
                        </div>
                    </div>
                </section>
                <section className='project-hero-items'>
                    <div className='tagline'>
                        <h2 style={{fontFamily: `${project.font}`, fontWeight: `${project.weight}`}}>{project.content.tagline}</h2>
                    </div>
                    <label className='highlight-label'>{project.content.highlightsHeader}</label>
                    <div className='highlight-tiles'>                        
                        {
                            project.content.highlightsItems?.map((item, index) => {
                                console.log(project.content.tileColor);
                               
                                return (
                                    <div className='highlight-tile' key={index} style={{backgroundColor: `var(${project.content.tileColor})`}}>
                                        <Icon iconName={item.icon} />
                                        <span>{item.label}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <section className='project-content'>
                    <div className='description'>

                    </div>
                    <div className='visuals'>

                    </div>
                    <div className='roadmap'>

                    </div>
                </section>
            </div>
            
        </div>
    )
}

export { Project }