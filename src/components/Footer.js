import React from 'react';
import { RiCopyrightLine } from 'react-icons/ri';
import { TbArrowIteration, TbSquareRoundedLetterV, TbCircleCheckFilled, TbCircleFilled } from 'react-icons/tb';

const Footer = ({ domain }) => {

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
            
            <sl-menu-item>
              {
                (domain === 'v1') ?
                <TbCircleCheckFilled className='activated-version' /> :
                <TbCircleFilled className='inactive-version' />
              }
              <TbSquareRoundedLetterV /> 1.0 (~2019)
            </sl-menu-item>
            <a href="https://sm-v1.netlify.app">
            <sl-menu-item>
              {
                (domain === 'v2') ?
                <TbCircleCheckFilled className='activated-version' /> :
                <TbCircleFilled className='inactive-version' />
              }
              <TbSquareRoundedLetterV /> 2.0 (~2022)
            </sl-menu-item>
            </a>
            
            <sl-menu-item>
              {
                (domain !== 'v1' || domain !== 'v2') ?
                <TbCircleCheckFilled className='activated-version' /> :
                <TbCircleFilled className='inactive-version' />
              }
              <TbSquareRoundedLetterV /> 3.0 (latest)
            </sl-menu-item>
          </sl-menu>
        </sl-dropdown>
    </footer>
  )
}

export { Footer };