import React from 'react';
import './navbar.css';
import ibblogo from "../ibb-logo.svg";

export default function Navbar(){
  return (
    <div className="heading">
      
      <img src={ibblogo} alt='ibblogo' className='ibb-logo'></img>
      <div className='vertical-line'></div>
      <p>ibb<span>ispark</span></p>

   
    </div>
  );
}