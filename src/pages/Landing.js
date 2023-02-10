import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundDown } from 'react-icons/io';

const Landing = ({isMobileSafari}) => {

    return (
        <section>
            <section className='fold'>
                <h1>Seth Mitchell</h1>
                <span className='above-the-fold-links'>
                    <Link to='/resume'>resume</Link>
                    <Link to='/work'>work</Link>
                    <Link to='/contact'>contact</Link>
                </span>
                {
                    isMobileSafari ?
                    <div className='fold-arrow safari'>
                        <IoIosArrowRoundDown />
                    </div> :
                    <a href='#landing-tiles' className='fold-arrow' >
                        <IoIosArrowRoundDown />
                    </a>
                } 
            </section>
            <section id='landing-tiles'>
            <div className='tile'>

</div>
<div className='tile'>

</div>
<div className='tile'>

</div>
<div className='tile'>

</div>
<div className='tile'>

                </div>
                <div className='tile'>

                </div>
                <div className='tile'>

                </div>
                <div className='tile'>

                </div>
                <div className='tile'>

                </div>
                <div className='tile'>

                </div>
                <div className='tile'>

                </div>
                <div className='tile'>

                </div>
            </section>
        </section>
    )
}

export { Landing }