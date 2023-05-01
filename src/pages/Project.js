import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbArrowBack } from 'react-icons/tb';

const Project = ({defaultDark}) => {

    const location = useLocation();

    const [ singleProject, setSingleProject ] = useState();

    if (location.state) {
        var { project } = location.state;
        console.log(project.logoDark);
    } else {
        var project = singleProject;
    }

    return (
        <div className='project-showcase'>
            <Link to='/work' className='back-to-work'><TbArrowBack /> All Work</Link>
            <div className='project-card' id={project.content.slug} style={{backgroundColor: `${project.color}`}}>
                <section className='project-header'>
                    <img src={defaultDark ? '.' + project.logoDark : '.' + project.logoLight} />
                    <h1 style={{color: `${project.fontColor}`, fontFamily: `${project.font}`, fontWeight: `${project.weight}`}}>{project.title}</h1>
                </section>
            </div>
            
        </div>
    )
}

export { Project }