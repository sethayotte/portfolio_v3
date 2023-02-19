import React from 'react';
import ResumeData from '../data/resume.json';
import Headshot from '../assets/SethMitchell_Headshot_Scaled.jpg';

const Resume = () => {
  return (
    <div className='resume'>
        <section className='intro'>
            <div>
                <img src={Headshot} />
            </div>
            <div className='intro-text'>
                <h2>Hi, I'm Seth.</h2>
                <p>I'm a designer, developer, & traveler.</p>
                <p className='mobile-intro-text'>I'm a </p>
            </div>
        </section>
        <section className='education'>
            <span className='section-heading'>Education</span>
            {
                ResumeData.education.map((item, index) => {
                    return (
                        <div className='item' key={index}>
                            <span>{item.dates}</span>
                            <h3>{item.title}</h3>
                            <p>{item.degree}</p>
                            <p>{item.description}</p>
                        </div>
                    )
                })
            }
        </section>
        <section className='experience'>
            <span className='section-heading'>Work & Other Projects</span>
            {
                ResumeData.experience.map((item, index) => {
                    return (
                        <div className='item' key={index}>
                            <span>{item.dates}</span>
                            <h3>{item.company}</h3>
                            <p>{item.location}</p>
                            <p>{item.position}</p>
                        </div>
                    )
                })
            }
        </section>
        <section className='proficiencies'>
            <span className='section-heading'>Proficiencies</span>
            {
                ResumeData.proficiencies.map((item, index) => {
                    return (
                        <div className='category' key={index}>
                            <h4>{item.section}</h4>
                        </div>
                    )
                })
            }
        </section>
        {
            ResumeData.header.disclaimer ?
            <section className='disclaimer'>
                <div className='disclaimer-container'>
                    {ResumeData.header.disclaimer}
                </div>
            </section> :
            null
        }
        <div>
            Need a digital copy? <a> Download it here</a>
        </div>
    </div>
  )
}

export { Resume }