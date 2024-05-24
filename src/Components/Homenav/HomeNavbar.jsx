import React from 'react'
import './Homenavbar.css'
import bdulogo from '../../assets/bdulogo.png';

const HomeNavbar = () => {
  return (
    <div className="wrappertry">
    <div className="top-containertry">
      <div className="emblemtry d-flex align-items-center justify-content-center text-white">
        <div className="imgblock w-10">
          <img className="" src={bdulogo} alt="bdulogo" />
        </div>
        <div className="titletry">
          <label className="title1try d-block">School of Computer Science, Engineering and Application's</label>
          <label className="title2try d-block">Bharathidasan University, Tiruchirappalli - 620023</label>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeNavbar