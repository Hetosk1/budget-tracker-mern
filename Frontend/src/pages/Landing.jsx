import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const isLoggedIn = () => {
        return localStorage.getItem('bud-token') ? true : false;
    };

    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Welcome to Budget Tracker</h1>
            {!isLoggedIn() 
                ? 
                <>
                    <button onClick={() => navigate('/register')}>Register</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                </>
                : 
                <>
                    <NotLoggedIn />
                </>
            }
            <style jsx>{`
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4; /* Light grey background */
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh; /* Full viewport height */
                }

                h1 {
                    color: #333; /* Dark grey color for heading */
                    margin-bottom: 20px;
                }

                button {
                    background-color: #007bff; /* Bootstrap primary color */
                    color: white; /* White text */
                    border: none;
                    border-radius: 5px; /* Rounded corners */
                    padding: 10px 20px; /* Padding for button */
                    font-size: 16px; /* Font size */
                    cursor: pointer; /* Pointer cursor on hover */
                    margin: 10px; /* Space between buttons */
                    transition: background-color 0.3s ease; /* Smooth transition for hover effect */
                }

                button:hover {
                    background-color: #0056b3; /* Darker shade on hover */
                }

                .not-logged-in-message {
                    color: #ff0000; /* Red color for error message */
                    margin-top: 20px;
                }
            `}</style>
        </div>
    );
};

export default Landing;

const NotLoggedIn = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate("/dashboard");
    }, []);
    
    return (
        <div className="not-logged-in-message">
            {/* Optionally, you can add a message here */}
        </div>
    );
};
