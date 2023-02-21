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

    useEffect(() => {
        updateWidth();
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
        // updateTileStatus(slug);
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

    const updateTileStatus = (slug) => {
        if (tileExpand === '') {
            setTileExpand(slug);
        } else if (lastOpened === slug) {
            setTileExpand('');
        } else {
            setTileExpand(slug);
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
                        <Link to={'/projects/' + row[0].content.slug}>Explore {row[0].title} <IoIosArrowRoundForward /></Link>
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
        <section>
            <section className='fold'>
                <h1>Seth Mitchell</h1>
                <span className='above-the-fold-links'>
                    <Link to='/resume'>resume</Link>
                    <Link to='/projects'>projects</Link>
                    <Link to='/travel'>travel</Link>
                </span>
                {
                    isMobileSafari ?
                    <a href='#project-tiles' className='fold-arrow safari'>
                        <IoIosArrowRoundDown />
                    </a> :
                    <a href='#project-tiles' className='fold-arrow' >
                        <IoIosArrowRoundDown />
                    </a>
                } 
            </section>
            <section id='project-tiles'>
                {
                    HomeData.map((row, index) => {
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