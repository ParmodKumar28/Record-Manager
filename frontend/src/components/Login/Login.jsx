import React, { useState } from 'react';
import axios from '../../axios';
import { FaUser, FaLock } from 'react-icons/fa';

function Login({ onLogin, setLoggedIn }) {
    // State variables for username, password, and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the server to authenticate the user
            const response = await axios.post('users/login', { username, password });
            console.log(response.data);
            setLoggedIn(true);
            // If the response status is OK, call the onLogin function passed as prop
            if (response.message === "Login successful") {
                onLogin();
            }
        } catch (error) {
            // If an error occurs during login, set the error message
            console.log(error);
            setError(error.response.data.error)
        }
    };

    // JSX for the login form
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl mb-6 font-bold text-gray-800">Welcome Back!</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>} {/* Display the error message if there's an error */}
                <div className="mb-6">
                    <label htmlFor="username" className="flex items-center mb-2 text-lg text-gray-700">
                        <FaUser className="mr-2" /> Username
                    </label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="flex items-center mb-2 text-lg text-gray-700">
                        <FaLock className="mr-2" /> Password
                    </label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">Sign In</button>
            </form>
        </div>
    );
}

export default Login;
