import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Backend} from '../../backend';


const backend = import.meta.env.VITE_BACKEND_URL; 

const Login = () => {
    const isLoggedin = () => {
        return localStorage.getItem('bud-token') ? true : false;
    }

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Button press detected');
        console.log(`Data Recorded:\nEmail: ${email}\nPassword: ${password}`);

        try {
            const response = await axios.post(`${backend}/user/signin`, {
                email: email,
                password: password 
            });

            console.log(response);
            if (response.status === 200) {
                toast.success('Access granted');
                const token = response.data.Token;
                localStorage.setItem("bud-token", token);
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 404) {
                toast.error('Invalid credentials');
            } else {
                toast.error('Error from our side');
            }
        }
    }

    return (
        <>
            {!isLoggedin()
                ? 
                <div className="container">
                    <div className="header">Login</div>
                    <form onSubmit={handleSubmit} className="form" autoComplete="off">
                        <input 
                            type="text" 
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
                        <button type="submit" className="submit-button">Login</button>
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

export default Login;

const LoggedIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/dashboard');
    }, []);

    return null; // No UI to render
};
