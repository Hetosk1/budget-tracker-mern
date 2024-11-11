import { useState } from 'react';
import { Routes, Route, useNavigate, json } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import BudgetPage from './pages/BudgetPage';
import BudgetRecords from './pages/BudgetRecords';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Landing from './pages/Landing';
import About from './pages/About';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function App() {
    const navigate = useNavigate();

    const isLoggedIn = () => !!localStorage.getItem('bud-token');

    // Sign out the user
    const signOut = () => {
        localStorage.removeItem('bud-token');
        toast.success('You have successfully logged out.');
        navigate('/'); // Redirect to home after logout
    };

    return (
        <>
            <Toaster />
            <header className='header'>
                <div 
                    className='title' 
                    onClick={() => navigate('/')}
                >
                    Budget Planner
                </div>

                {isLoggedIn() ? (
                    <div className='user-info'>
                        <div className='username'>👋🏼 {parseJwt(localStorage.getItem('bud-token')).name}</div>
                        <button 
                            onClick={signOut} 
                            className='sign-out-button'
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                  <div className='about-us'
                    onClick={(e) => {
                      navigate('/about')
                    }}
                  >
                    About Us
                  </div>
                )}
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<BudgetPage />} />
                    <Route path="/budget" element={<BudgetRecords />} />
                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={
                        <div className='route-not-found'>
                            Page not found
                        </div>
                    } />
                </Routes>
            </main>

            {/* Inline CSS */}
            <style jsx>{`
                .about-us{
                  cursor: pointer;
                }

                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4; /* Light grey background */
                    color: #333; /* Dark grey text color */
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 32px; /* Padding around header */
                    background-color: #ffffff; /* White background for header */
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
                }

                .title {
                    font-size: 24px; /* Larger font size for the title */
                    color: #007bff; /* B007bffright red color for title */
                    cursor: pointer; /* Pointer cursor on hover */
                }

                .user-info {
                    display: flex;
                    align-items: center;
                }

                .username {
                    margin-right: 16px; /* Space between username and button */
                }

                .sign-out-button {
                    padding: 10px 15px; /* Padding inside buttons */
                    border: none;
                    border-radius: 5px; /* Rounded corners */
                    background-color: #007bff; /* Bootstrap primary color */
                    color: white; /* White text color */
                    cursor: pointer; /* Pointer cursor on hover */
                    transition: background-color 0.3s ease; /* Smooth transition on hover */
                }

                .sign-out-button:hover {
                    background-color: #0056b3; /* Darker shade on hover */
                }

                main {
                    padding: 20px; /* Padding around main content area */
                }

                .route-not-found {
                    text-align: center;
                    font-size: 1.5rem; /* Larger font size for error message */
                    color: #ff0000; /* Red color for error message */
                }
            `}</style>
        </>
    );
}

export default App;