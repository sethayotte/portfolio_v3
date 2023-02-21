import React from 'react';
import { RiCopyrightLine } from 'react-icons/ri'

const Footer = () => {

  return (
    <footer>
        <span className='copyright'>
            <span>Seth Mitchell <RiCopyrightLine /> {new Date().getFullYear()}. All rights reserved.</span>
        </span>
    </footer>
  )
}

export { Footer };