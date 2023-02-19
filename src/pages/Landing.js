import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundDown } from 'react-icons/io';
import { BsPlusCircleFill } from 'react-icons/bs';
import { Header } from '../components/Header';
import HomeData from '../data/home.json';

const Landing = ({defaultDark, isMobileSafari}) => {

    const [tileExpand, setTileExpand ] = useState('');

    let isOpen = false;
    let lastOpened;
    let lastIndex;

    const toggleTile = (slug, rowIndex) => {
        console.log(lastOpened, lastIndex);
        console.log(slug, isOpen);
        if (!lastOpened) {  
            console.log(document.querySelector(`.row${rowIndex}`));
            document.querySelector(`.row${rowIndex}`).classList.toggle(`expanded-${slug}`);
        } else if (lastOpened === slug) {
            console.log(document.querySelector(`.row${rowIndex}`));
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
        lastIndex = rowIndex;
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
            <div className={'project-row' + ' ' + "row"+parentIndex}>
                <div className='tile' id={row[0].content.slug} style={{backgroundColor: row[0].color}} >
                    <div className='tile-header'>
                    <img src={defaultDark ? row[0].logoDark : row[0].logoLight} />
                        <h2 style={{color: row[0].fontColor, fontFamily: row[0].font, fontWeight: row[0].weight}}>{row[0].title}</h2>
                    </div>
                    <BsPlusCircleFill className='tile-toggle' onClick={() => toggleTile(row[0].content.slug, parentIndex)} style={{color: row[0].toggleColor}} />
                </div>
                <div className='tile' id={row[1].content.slug} style={{backgroundColor: row[1].color}} >
                    <div className='tile-header'>
                        <img src={defaultDark ? row[1].logoDark : row[1].logoLight} />
                        <h2 style={{color: row[1].fontColor, fontFamily: row[1].font, fontWeight: row[1].weight}}>{row[1].title}</h2>
                    </div>
                    <BsPlusCircleFill className='tile-toggle' onClick={() => toggleTile(row[1].content.slug, parentIndex, 1)} style={{color: row[1].toggleColor}} />
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
                    <a href='#landing-tiles' className='fold-arrow safari'>
                        <IoIosArrowRoundDown />
                    </a> :
                    <a href='#landing-tiles' className='fold-arrow' >
                        <IoIosArrowRoundDown />
                    </a>
                } 
            </section>
            <section id='landing-tiles'>
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