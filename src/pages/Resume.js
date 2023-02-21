import React, { useState } from 'react';
import ResumeData from '../data/resume.json';
import Headshot from '../assets/SethMitchell_Headshot_Scaled.jpg';
import { HiOutlineArrowDownCircle } from 'react-icons/hi2';
import { RxCrumpledPaper } from 'react-icons/rx';
import { IoLogoLinkedin, IoLogoTwitter, IoLogoGithub } from 'react-icons/io';
import { IoPaperPlane } from 'react-icons/io5';

const Resume = () => {

    const [ sectionOpen, setSectionOpen ] = useState('');

    const toggleSection = (section) => {
        if (section === sectionOpen) {
            setSectionOpen('');
        } else {
            setSectionOpen(section);
        }
    }

  return (
    <div className='resume'>
        <section className='intro'>
            <div className='intro-text'>
                <h2>Hi, I'm Seth.</h2>
                <p>I'm a designer, developer, & traveler.</p>
                <p className='mobile-intro-text'>I'm a </p>
                <div className='social-icons'>
                    <a className='link' href="https://www.linkedin.com/in/sethayottemitchell/">
                        <IoLogoLinkedin />
                    </a>
                    <a className='link' href="https://twitter.com/sethmitchelldev">
                        <IoLogoTwitter />
                    </a>
                    <a className='link' href="https://github.com/sethayotte">
                        <IoLogoGithub />
                    </a>
                    <a className='link' href="mailto:hello@sethmitchell.dev?subject=Howdy!">
                        <IoPaperPlane />
                    </a>
                </div>
            </div>
            <div>
                <img src={Headshot} />
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
                            <h3 onClick={() => toggleSection(item.section)}>{item.section}<HiOutlineArrowDownCircle className={(sectionOpen === item.section) ? 'up' : ''} /></h3>
                            { <SectionList item={item} sectionOpen={sectionOpen} /> }
                        </div>
                    )
                })
            }
        </section>
        {
            ResumeData.footer.disclaimer ?
            <section className='disclaimer'>
                <div className='disclaimer-container'>
                    {ResumeData.footer.disclaimer}
                </div>
            </section> :
            null
        }
        <div className='digital-copy-text'>
            <RxCrumpledPaper /> 
            <p>Need a digital copy?&nbsp;<a>Download it here</a></p>
            
        </div>
    </div>
  )
}

const SectionList = ({item, sectionOpen}) => {
    return (
        <div className={(sectionOpen === item.section) ? 'section-list open' : 'section-list'}>
            {
               item.items.map((listItem, index) => {
                   if (sectionOpen && sectionOpen === item.section) {
                    return (
                        <span key={index}>
                            {listItem}
                        </span>
                    )
                   } else {
                    return null;
                   }
               })
            }
        </div>
    )
}

export { Resume }