import React, { useState } from 'react';
import '../Styles/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';


const Login = () => {
    const [loginInfo, setLoginInfo] = useState({ 
        email: '', 
        password: '' 
      });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo, [name]: value };
    setLoginInfo(copyLoginInfo);
    };

 

const navigate = useNavigate();


const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo; 
     
    if( !email || !password ) {
        return handleError('email and password are required');
    }
    try {
        const URL = 'https://test-backend-production-8542.up.railway.app/login';
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginInfo.email.trim(),
                password: loginInfo.password.trim()
              }),
            });
        const result = await response.json();
        const { success, message, jwtToken, name, error } = result;
        if(success){
            handleSuccess(message);
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(() => {
                navigate('/home');
            });
        } else if(error){
            const details = error?.details[0].message;
            handleError(details);
        } else if(!success){
            handleError(message);
        }
        console.log(result);
    } catch (err) {
        handleError(err);
    }
}

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={loginInfo.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={loginInfo.password}
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" className="login-btn">Sign In</button>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
