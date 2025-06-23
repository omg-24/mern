import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError } from '../utils'
import { handleSuccess } from '../utils'
const Login = () => {
  
  const [loginInfo, setLoginInfo] = useState({
    email:'',
    password:'',
  })

  const handleChange = (e)=>{
    const {name,value} = e.target;
    const copyLoginInfo= {...loginInfo};
    copyLoginInfo[name]= value;
    setLoginInfo(copyLoginInfo);
  }
  const navigate = useNavigate()
  const handleLogin= async (e)=>{
    e.preventDefault();
    const {name,email,password}=loginInfo;
    if(!password||!email){
      return handleError('email and password are required')
    }
    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const {success , message,jwtToken,name,error} = result;
      if(success){
        handleSuccess(message)
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
          navigate('/home')
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
      <h2>Login.!</h2>
      <form onSubmit ={handleLogin}>
       
        <div className="input-group">
          <label htmlFor="email"></label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginInfo.email}
          />
        </div>
        <div className="input-group"> 
          <label htmlFor="password"></label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Signup</button>

        <span>
          Does't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  )
}

export default Login
