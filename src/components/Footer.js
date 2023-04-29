import React from 'react';
import { RiCopyrightLine } from 'react-icons/ri';
import { TbArrowIteration, TbSquareRoundedLetterV, TbCircleCheckFilled } from 'react-icons/tb';

const Footer = () => {

  return (
    <footer>
        <span className='copyright'>
            <span>
              <span>Seth Mitchell <RiCopyrightLine /> {new Date().getFullYear()}.&nbsp;</span> 
              <span>All rights reserved.</span>
            </span>
        </span>
        <sl-dropdown>
          <span className='version-toggle' slot="trigger"><TbArrowIteration /> v3.0</span>
          <sl-menu style={{marginBottom: 10}}>
            <sl-menu-label>EMULATED VERSION</sl-menu-label>
            
            <sl-menu-item type="checkbox"><TbSquareRoundedLetterV /> 1.0</sl-menu-item>
            <sl-menu-item type="checkbox">
              <TbSquareRoundedLetterV /> 2.0
            </sl-menu-item>
            <sl-menu-item type="checkbox" checked><TbSquareRoundedLetterV /> 3.0 (latest)</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
    </footer>
  )
}

export { Footer };