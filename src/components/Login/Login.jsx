import React, { useState, useEffect } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify';

const Login = ({ setShowLogin }) => {

  useEffect(() => {
    // блокировка прокрутки
    document.body.style.overflow = 'hidden';
    // возврат к исходным стилям
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [curState, setCurState] = useState("Sign Up")

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLogin(false);
    toast.success("Logged in!")
  };

  return (
    <div className='login'>
      <form className="login-container">
        <div className="login-title">
          <h2>{curState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-input">
          {curState === "Log In" ? <></> :
            <input type="text" placeholder='Your Name' required />}
          <input type="email" placeholder='Your Email' required />
          <input type="password" placeholder='Your Password' required />
        </div>
        <button onClick={handleSubmit}>{curState === "Sign Up" ? "Create account" : "Log In"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>I agree to the terms of use & privacy policy.</p>
        </div>
        {curState === "Log In"
          ? <p className='question'>Create a new account? <span onClick={() => setCurState("Sign Up")}>Click here</span></p>
          : <p className='question'>Already have an account? <span onClick={() => setCurState("Log In")}>Log in here</span></p>}
      </form>
    </div>
  )
}

export default Login
