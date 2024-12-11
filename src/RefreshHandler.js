import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        
        console.log('Current Location:', location.pathname);
        console.log('JWT Token:', jwtToken);

        if (jwtToken) {
            console.log('User is logged in');
            setIsAuthenticated(true);
            
            // Prevent logged-in user from accessing login/signup pages
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                console.log('Redirecting logged-in user to home');
                navigate('/home', { replace: true });
            }
        } else {
            console.log('User is NOT logged in');
            setIsAuthenticated(false);
            
            // Redirect to home page if not on login/signup/home pages
            const publicPaths = ['/', '/login', '/signup', '/home'];
            if (!publicPaths.includes(location.pathname)) {
                console.log('Redirecting to home page');
                navigate('/', { replace: true });
            }
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;