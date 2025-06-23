import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError } from '../utils'
import { handleSuccess } from '../utils'
const Signup = () => {
  
  const [signupInfo, setSignupInfo] = useState({
    name:'',
    email:'',
    password:'',
  })

  const handleChange = (e)=>{
    const {name,value} = e.target;
    const copySignupInfo= {...signupInfo};
    copySignupInfo[name]= value;
    setSignupInfo(copySignupInfo);
  }
  const navigate = useNavigate()
  const handleSignup= async (e)=>{
    e.preventDefault();
    const {name,email,password}=signupInfo;
    if(!name||!password||!email){
      return handleError('name,email and password are required')
    }
    try {
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const {success , message,error} = result;
      if(success){
        handleSuccess(message)
        setTimeout(()=>{
          navigate('/login')
        },1000)
      }else if(error){
        const details = error?.details[0].message;
        handleError(details)
      }else if(!success){
        handleError(message)
      }
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div className="container">
      <h2>SignUp.!</h2>
      <form onSubmit ={handleSignup}>
        <div className="input-group">
          <label htmlFor="name"></label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={signupInfo.name}

          />
        </div>
        <div className="input-group">
          <label htmlFor="email"></label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupInfo.email}
          />
        </div>
        <div className="input-group"> 
          <label htmlFor="password"></label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  )
}

export default Signup
