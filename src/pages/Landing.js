import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundDown, IoIosArrowRoundForward } from 'react-icons/io';
import { BsPlusCircleFill } from 'react-icons/bs';
import HomeData from '../data/home.json';

const Landing = ({defaultDark, isMobileSafari}) => {

    const [tileExpand, setTileExpand ] = useState('');
    const [ isDesktop, setIsDesktop ] = useState(false);

    const updateWidth = () => {
        if (window.innerWidth < 740) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }

    window.addEventListener("resize", updateWidth);

    const fadeMenuBar = () => {
        let windowHeight = window.innerHeight;
        let currScrollPos2 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (currScrollPos2 > windowHeight / 3) {
            document.getElementById('app-header').style.opacity = currScrollPos2 / (windowHeight / 3) - 2;
            document.getElementById('app-header').style.display = 'flex';
        } else {
            document.getElementById('app-header').style.display = 'none';
        }
    }

    useEffect(() => {
        updateWidth();
        let scrollPoint = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPoint < 100) {
            document.getElementById('app-header').style.opacity = 0;
        }
        document.addEventListener('scroll', fadeMenuBar, true);
        return () => {
            document.removeEventListener('scroll', fadeMenuBar, true);
            document.getElementById('app-header').style.opacity = 1;
            document.getElementById('app-header').style.display = 'flex';
        }
    }, [])

    let isOpen = false;
    let lastOpened;
    let lastIndex;
    let mainEl;
    let passiveEl;

    let mainTileHeight;
    let passiveTileHeight;

    const mainElement = new ResizeObserver((element) => {
        mainTileHeight = element[0].contentRect.height;
        if (!isOpen) {
            document.querySelector(`.row${0}`).style.setProperty('--row-height', 'initial');
            document.querySelector(`.row${1}`).style.setProperty('--row-height', 'initial');
            document.querySelector(`.row${2}`).style.setProperty('--row-height', 'initial');
            document.querySelector(`.row${3}`).style.setProperty('--row-height', 'initial');

            document.querySelector(`.row${lastIndex}`).style.setProperty('--row-height', 'initial');
        } else {
            document.querySelector(`.row${lastIndex}`).style.setProperty('--row-height', mainTileHeight + passiveTileHeight + 25 + 'px');
        }
    });

    const passiveElement = new ResizeObserver((element) => {
        passiveTileHeight = element[0].contentRect.height;
        if (!isOpen) {
            document.querySelector(`.row${0}`).style.setProperty('--row-height', 'initial');
            document.querySelector(`.row${1}`).style.setProperty('--row-height', 'initial');
            document.querySelector(`.row${2}`).style.setProperty('--row-height', 'initial');
            document.querySelector(`.row${3}`).style.setProperty('--row-height', 'initial');

            document.querySelector(`.row${lastIndex}`).style.setProperty('--row-height', 'initial');
        } else {
            document.querySelector(`.row${lastIndex}`).style.setProperty('--row-height', mainTileHeight + passiveTileHeight + 25 + 'px');
        }
    });

    const toggleTile = (slug, rowIndex, passiveTile) => {
        if (isDesktop && mainEl && passiveEl) {
            mainElement.unobserve(mainEl);
            passiveElement.unobserve(passiveEl);
        }
        if (!isDesktop && lastIndex) {
            document.querySelector(`.row${lastIndex}`).style.removeProperty('--row-height');
        }
        if (!lastOpened) {  
            document.querySelector(`.row${rowIndex}`).classList.toggle(`expanded-${slug}`);
        } else if (lastOpened === slug) {
            document.querySelector(`.row${rowIndex}`).classList.toggle(`expanded-${slug}`);
        } else if (isOpen) {
            document.querySelector(`.row${lastIndex}`).classList.toggle(`expanded-${lastOpened}`);
            document.querySelector(`.row${rowIndex}`).classList.toggle(`expanded-${slug}`);
        } else {
            document.querySelector(`.row${rowIndex}`).classList.toggle(`expanded-${slug}`);
        }
        if (document.querySelector(`.row${rowIndex}`).classList.contains(`expanded-${slug}`)) {
            isOpen = true;
        } else {
            isOpen = false;
        }
        lastOpened = slug;
        mainEl = document.getElementById(slug)
        passiveEl = document.getElementById(passiveTile)
        lastIndex = rowIndex;

        if (isDesktop) {
            mainElement.observe(mainEl);
            passiveElement.observe(passiveEl);
        }
    }

    const RenderTileRow = ({row, parentIndex}) => {
        return (
            <div className={isDesktop ? 'project-row' + ' ' + "row"+parentIndex : 'project-row' + ' ' + 'row'+parentIndex}>
                <div className='tile' id={row[0].content.slug} style={{backgroundColor: row[0].color}} >
                    <div className='tile-header'>
                    <img src={defaultDark ? row[0].logoDark : row[0].logoLight} />
                        <h2 style={{color: row[0].fontColor, fontFamily: row[0].font, fontWeight: row[0].weight}}>{row[0].title}</h2>
                    </div>
                    <div className={'tile-description open'}>
                        {row[0].content.description}
                        <Link to={'/projects/' + row[0].content.slug}>Explore {(row[0].title === '') ? 'Sprout' : row[0].title} <IoIosArrowRoundForward /></Link>
                    </div>
                    <BsPlusCircleFill className='tile-toggle' onClick={() => toggleTile(row[0].content.slug, parentIndex, row[1].content.slug)} style={{color: row[0].toggleColor}} />
                </div>
                <div className='tile' id={row[1].content.slug} style={{backgroundColor: row[1].color}} >
                    <div className='tile-header'>
                        <img src={defaultDark ? row[1].logoDark : row[1].logoLight} />
                        <h2 style={{color: row[1].fontColor, fontFamily: row[1].font, fontWeight: row[1].weight}}>{row[1].title}</h2>
                    </div>
                    <div className={'tile-description open'}>
                        {row[1].content.description}
                        <Link to={'/projects/' + row[1].content.slug}>Explore {row[1].title} <IoIosArrowRoundForward /></Link>
                    </div>
                    <BsPlusCircleFill className='tile-toggle' onClick={() => toggleTile(row[1].content.slug, parentIndex, row[0].content.slug)} style={{color: row[1].toggleColor}} />
                </div>
            </div>
        )
    }

    return (
        <section className='landing-wrapper'>
            <section className='fold'>
                <h1>Seth Mitchell</h1>
                <span className='above-the-fold-links'>
                    <Link to='/resume'>resume</Link>
                    <Link to='/work'>work</Link>
                    <Link to='/travel'>travel</Link>
                </span>
                {
                    isMobileSafari ?
                    <a href='#featured-project' className='fold-arrow safari'>
                        <IoIosArrowRoundDown />
                    </a> :
                    <a href='#featured-project' className='fold-arrow' >
                        <IoIosArrowRoundDown />
                    </a>
                } 
            </section>
            {
                    HomeData.landingIntroCards.map((card, index) => {
                        return (
                            <section id={card.id} className='landing-intro-card' key={index}>
                                {
                                    card.id.includes('technologies') ?
                                    <div className='tech-imgs'>
                                        <img id='css3' className='top-end' src={defaultDark ? card.imagesDark[0] : card.imagesLight[0]} />
                                        <img src={defaultDark ? card.imagesDark[1] : card.imagesLight[1]} />
                                        <img className='top-end' src={defaultDark ? card.imagesDark[2] : card.imagesLight[2]} />
                                    </div> :
                                    null
                                }
                                {
                                    card.id.includes('experience') ?
                                    <div className='work-imgs'>
                                        <img className='top-end' src={defaultDark ? card.imagesDark[0] : card.imagesLight[0]} />
                                        <img id='vcu' src={defaultDark ? card.imagesDark[1] : card.imagesLight[1]} />
                                        <img className='top-end' src={defaultDark ? card.imagesDark[2] : card.imagesLight[2]} />
                                    </div> :
                                    null
                                }
                                <div className='card-text'>
                                    {
                                        isDesktop ?
                                        <h2>{card.copy}</h2> :
                                        <h2>{card.mobileCopy ? card.mobileCopy : card.copy}</h2> 
                                    }
                                    <Link to={card.linkRoute}>{card.linkText} <IoIosArrowRoundDown /></Link>
                                </div>
                                {
                                    card.id.includes('featured') ?
                                    <img src={defaultDark ? card.imagesDark[0] : card.imagesLight[0]} /> :
                                    null
                                }
                                {
                                    card.id.includes('experience') ?
                                    <div className='work-imgs'>
                                        <img className='bottom-end' src={defaultDark ? card.imagesDark[3] : card.imagesLight[3]} />
                                        <img id='compass' src={defaultDark ? card.imagesDark[4] : card.imagesLight[4]} />
                                        <img className='bottom-end' src={defaultDark ? card.imagesDark[5] : card.imagesLight[5]} />
                                    </div> :
                                    null
                                }
                                {
                                    card.id.includes('technologies') || card.id.includes('expereince') ?
                                    <div className='tech-imgs'>
                                        <img className='bottom-end' src={defaultDark ? card.imagesDark[3] : card.imagesLight[3]} />
                                        <img src={defaultDark ? card.imagesDark[4] : card.imagesLight[4]} />
                                        <img className='bottom-end' src={defaultDark ? card.imagesDark[5] : card.imagesLight[5]} />
                                    </div> :
                                    null
                                }
                            </section>
                        )
                    })
                }
            <section id='project-tiles'>
                {
                    HomeData.landingProjectTiles.map((row, index) => {
                        return (
                            <RenderTileRow row={row} parentIndex={index} key={index} />
                        )
                    })
                }
            </section>
        </section>
    )
}

export { Landing }