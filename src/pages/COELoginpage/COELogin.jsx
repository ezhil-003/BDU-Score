import React from 'react'
import HomeNavbar from '../../Components/Homenav/HomeNavbar'
import './COELogin.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';



const COELogin = () => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const bodydata = JSON.stringify({email,password});
      const response = await fetch("http://localhost:5001/Coe/Coelogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
          const { email, name } = data.userDetails;
          localStorage.setItem("user",name);
          console.log(data.message);
          navigate("/dashboard");
        } else {
          console.log("Login failed:", data.status);
        }
      } else {
        const data = await response.json(); // Read the error message from the response
        console.log("Login failed:", data.status);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <>
      <HomeNavbar />
      <div className="container-fluid login-container pb-5">
        <div className="row justify-content-center row-sm-5 row-md-5 mb-5 ms-2 me-2">
          <div className="loginformcont col-md-5 col-xl-5 col-xxl-5 col-sm-5 col-xs-5 shadow-lg mt-5 rounded m-2">
            <div className="login-form p-1">
              <h2 className="text-center m-3 fs-4">COE Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="emailinp form-control" id="email" placeholder="Enter your Email" onChange={(e) =>{setemail(e.target.value)}} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" >Password</label>
                  <input type="password" className="passinp form-control" id="password" placeholder="Enter your password" onChange={(e) => {setpassword(e.target.value)}} />
                  <div className="form-text text-muted">
                    Forget password? <Link href="reset.html">Reset here</Link>
                  </div>
                </div>
                <button type="submit" className="signtry btn w-100">Sign In</button>
              </form>
              <div className="m-3 text-center">
                <span>New user? </span>
                <Link to='Student Signup'>Register now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand navbar-light bg-light mt-5  justify-content-center">
        <div className="navbar-nav  justify-content-center w-100">
          <Link className="nav-link" to='/Faculty Login' >Faculty Login</Link>
          <Link className="nav-link" to='/Admin Login' >Admin Login</Link>
          <Link className="nav-link" to='/support' >Support</Link>
          <Link className="nav-link" to='/help'>Help</Link>
          <Link className="nav-link" to='/about'>About</Link>
        </div>
      </nav>
    </>
  )
}

export default COELogin