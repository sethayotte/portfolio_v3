import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundDown } from 'react-icons/io';
import { BsPlusCircleFill } from 'react-icons/bs';
import { Header } from '../components/Header';
import HomeData from '../data/home.json';

const Landing = ({isMobileSafari}) => {

    const [tileExpand, setTileExpand ] = useState('');

    const toggleTile = (slug, rowIndex, item) => {
        document.querySelector(`.row${rowIndex}`).classList.toggle(`expanded-${slug}`)
    }

    const RenderTileRow = ({row, parentIndex}) => {
        return (
            <div className={'project-row' + ' ' + "row"+parentIndex}>
                <div className='tile' id={row[0].content.slug} style={{backgroundColor: row[0].color}} >
                    <h2 style={{color: row[0].toggleColor}}>{row[0].title}</h2>

                    <BsPlusCircleFill className='tile-toggle' onClick={() => toggleTile(row[0].content.slug, parentIndex, 0)} style={{color: row[0].toggleColor}} />
                </div>
                <div className='tile' id={row[1].content.slug} style={{backgroundColor: row[1].color}} >
                    <h2 style={{color: row[1].toggleColor}}>{row[1].title}</h2>

                    <BsPlusCircleFill className='tile-toggle' onClick={() => toggleTile(row[1].content.slug, parentIndex, 1)} style={{color: row[1].toggleColor}} />
                </div>
            </div>
        )
    }

    return (
        <section>
            <Header />
            <section className='fold'>
                <h1>Seth Mitchell</h1>
                <span className='above-the-fold-links'>
                    <Link to='/resume'>resume</Link>
                    <Link to='/work'>work</Link>
                    <Link to='/contact'>contact</Link>
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