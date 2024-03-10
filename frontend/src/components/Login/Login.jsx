import React, { useState } from 'react';
import axios from '../../axios';
import { FaUser, FaLock } from 'react-icons/fa';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('users/login', { username, password });
            console.log(response.data); // Log the response data to see its structure
            if (response.statusText == "OK") {
                onLogin();
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.error)
        }
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl mb-6 font-bold text-gray-800">Welcome Back!</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>} {/* Display the error message */}
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
