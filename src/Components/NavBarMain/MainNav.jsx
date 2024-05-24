import React from 'react'
import './mainnav.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const MainNav = () => {
    const data = localStorage.getItem("user");

 
    return (
        <div className="topbar d-flex align-items-center justify-content-between">
            <div>
                <span className='tittlebar'>BDU Score Compiler</span>
            </div>
            <div className="user-info d-flex align-items-center">
                <i className="bi bi-bell notifi"></i>
                <span className="user-name m-1">{data}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
            </div>

        </div>
    )
}

export default MainNav