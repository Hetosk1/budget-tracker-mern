import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const isLoggedIn = () => {
        return localStorage.getItem('bud-token') ? true : false;
    }

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Button pressed detected');
        console.log(`Data Recorded:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);

        try {
            const response = await axios.post('http://localhost:3000/user/signup', {
                name: username,
                email: email,
                password: password
            });
            console.log(response);
            toast.success('User created successfully, now login again');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Email already exists');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            {!isLoggedIn() 
                ? 
                <div className="container">
                    <div className="header">Register</div>
                    <form className="form" autoComplete="off" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="input-field"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="input-field"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="input-field"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="submit-button">Register</button>
                    </form>

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

                        .header {
                            text-align: center;
                            font-size: 2rem; /* Larger font size for header */
                            margin-bottom: 20px; /* Space below header */
                        }

                        .form {
                            display: flex;
                            flex-direction: column;
                            width: 300px; /* Fixed width for the form */
                        }

                        .input-field {
                            padding: 10px; /* Padding inside input fields */
                            margin-bottom: 15px; /* Space between input fields */
                            border-radius: 5px; /* Rounded corners */
                            border: 1px solid #ccc; /* Light grey border */
                        }

                        .submit-button {
                            background-color: #007bff; /* Bootstrap primary color */
                            color: white; /* White text */
                            border: none;
                            border-radius: 5px; /* Rounded corners */
                            padding: 10px; /* Padding for button */
                            font-size: 16px; /* Font size */
                            cursor: pointer; /* Pointer cursor on hover */
                        }

                        .submit-button:hover {
                            background-color: #0056b3; /* Darker shade on hover */
                        }
                    `}</style>
                </div>
                : 
                <LoggedIn />
            }
        </>
    );
};

export default Register;

const LoggedIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/dashboard');
    }, []);
};