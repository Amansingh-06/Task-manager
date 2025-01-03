import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    };

    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Task Manager</h1>
            <div className="flex gap-4">
                {token ? (
                    <>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;