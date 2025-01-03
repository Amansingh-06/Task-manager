import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://task-manager-5-cmv8.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                navigate('/dashboard');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10"
        >
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-700"
            >
                Login
            </button>
        </form>
    );
};

export default Login;
