import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';


const Home = () => {
  const [isLoggedInUser, setIsLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setIsLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])

  const checkLoginStatus = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const jwtToken = localStorage.getItem('jwtToken');
    
    if (loggedInUser && jwtToken) {
      setIsLoggedInUser(loggedInUser);
    } else {
      setIsLoggedInUser('');
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    
    setIsLoggedInUser('');
    handleSuccess('Logged out successfully');
    navigate('/home');
  }

  const fetchProducts = async () =>{
    try {
        const URL = 'https://test-backend-production-8542.up.railway.app/products';
        const headers = {
            headers : {
                'Authorization': localStorage.getItem('jwtToken')
            }
        }
        const response = await fetch(URL, headers);
        const result = await response.json();
        console.log(result);
        setProducts(result);
    } catch (err) {
        handleError(err);
    }
  }

  useEffect(() => {
    if (isLoggedInUser) {
        fetchProducts();
    }
}, [isLoggedInUser])

  return (
    <div className="home-container">
      {/* Starry Background */}
      <div className="star-background">
        {[...Array(100)].map((_, index) => (
          <div 
            key={index} 
            className="star" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Burning Effect */}
      <div className="burning-overlay"></div>

      {/* Header */}
      <header className="main-header">
        <div className="logo">MyApp</div>
        <nav className="main-nav">
          <a href="/home">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="auth-buttons">
          {!isLoggedInUser ? (
            <>
              <a href="/login" className="loginBtn">Login</a>
              <a href="/signup" className="signupBtn">Sign Up</a>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="home-content">
        <div className="content-wrapper">
          <h1>Welcome to Our Platform</h1>
          <p>Discover amazing features and possibilities!</p>
          
          {isLoggedInUser ? (
            <div className="logged-in-section">
              <h2>Welcome Back!</h2>
              <div className="dashboard-preview">
                <div className="preview-card">
                  <h3 className="username">{isLoggedInUser}</h3>
                  <p>View and edit your information</p>
                </div>
                <div className="preview-card">
                  <h3>Recent Activity</h3>
                  <p>Check your latest updates</p>
                </div>
              </div>
              <div>
            {
                products && products.map((item, index) => (
                    <ul key= {index}>
                        <span>
                            {item.name} : {item.price}
                        </span>
                    </ul>
                ))
            }
        </div>
            </div>
            
          ) : (
            <div className="cta-buttons">
              <a href="/signup" className="cta-btn primary">Get Started</a>
              <a href="/learn-more" className="cta-btn secondary">Learn More</a>
            </div>
          )}
        </div>
        
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#instagram">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 MyApp. All Rights Reserved.
        </div>
      </footer>
      <ToastContainer/>
    </div>
  );
}

export default Home;
