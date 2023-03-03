import React from 'react'
import { Link } from 'react-router-dom';
import { IoRocketSharp } from 'react-icons/io5';

const NotFound = () => {
  return (
    <div className='not-found'>
      <h2>404</h2>
      <div>Hmm... what you're looking for doesn't seem to exist.</div>
      <Link to='/'><IoRocketSharp /> take me somewhere else</Link>
    </div>
  )
}

export {NotFound};