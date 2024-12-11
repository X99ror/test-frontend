import React, { useState } from 'react';
import '../Styles/Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo, [name]: value };
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupInfo; 
        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        } 
        if(!name || !email || !password || !confirmPassword) {
            return handleError('All fields are required');
        }
        try {
            const URL = 'https://test-backend-production-8542.up.railway.app/signup';
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo),
            });
            const result = await response.json();
            const { success, message, error } = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 400);
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
        <div className="signup-container">
            <div className="signup-form-wrapper">
                <form className="signup-form" onSubmit={handleSignup}>
                    <h2>Create Account</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Username"
                            value={signupInfo.username}
                            onChange={handleChange}
                        />
                        {/* {errors.username && <p className="error-message">{errors.username}</p>} */}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signupInfo.email}
                            onChange={handleChange}
                        />
                        {/* {errors.email && <p className="error-message">{errors.email}</p>} */}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signupInfo.password}
                            onChange={handleChange}
                        />
                        {/* {errors.password && <p className="error-message">{errors.password}</p>} */}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={signupInfo.confirmPassword}
                            onChange={handleChange}
                        />
                        {/* {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>} */}
                    </div>
                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                    <p className="login-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Signup;
