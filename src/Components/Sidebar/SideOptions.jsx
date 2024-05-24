import React from 'react'
import './Sidenavbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bduLogo from '../../assets/BDU_logo (1) 1.svg'
import {Link} from 'react-router-dom'

const SideOptions = () => {
  return (
    <div className='navbar-wrapper'>
            <div className='sidebartry'>
                <div className="logotry" >
                    <img src={bduLogo} alt="Your Logo" className="your-logo" />
                </div>
                <nav className="nav flex-column mt-5 navthings">
                    <Link to="#main-menu" className="nav-link text-white mb-3 navanchor">
                        <div className='ps-2 pe-2 pt-1 pb-1 rounded navitems'>
                            <i className="bi bi-house"></i>
                        </div>
                    </Link>
                    <Link to="#subjects" className="nav-link text-white mb-3 navanchor">
                        <div className='ps-2 pe-2 pt-1 pb-1 rounded navitems'>
                            <i className="bi bi-book"></i>
                        </div>
                    </Link>
                    <Link to="#results" className="nav-link text-white mb-3 navanchor">
                        <div className='ps-2 pe-2 pt-1 pb-1 rounded navitems'>
                            <i className="bi bi-clipboard-data"></i>
                        </div>
                    </Link>
                    <Link to="#support" className="nav-link text-white mb-3 navanchor">
                        <div className='ps-2 pe-2 pt-1 pb-1 rounded navitems'>
                            <i className="bi bi-headset"></i>
                        </div>
                    </Link>
                    <Link to="#about" className="nav-link text-white mb-3 navanchor">
                        <div className='ps-2 pe-2 pt-1 pb-1 rounded navitems'>
                            <i className="bi bi-info-circle"></i>
                        </div>
                    </Link>
                </nav>
                <div className="logout mt-auto mb-4">
                    <a href="#logout" className="nav-link text-white"><div className='ps-2 pe-2 pt-1 pb-1 rounded logitem'><i className="bi bi-box-arrow-right"></i></div></a>
                </div>
            </div>
        </div>
  )
}

export default SideOptions