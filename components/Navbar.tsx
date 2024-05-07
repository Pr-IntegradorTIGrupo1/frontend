'use client'
import React from 'react';

const Navbar = ({ userName }: { userName: string }) => {
    const handleLogout = () => {
        // Aquí puedes manejar la lógica de cierre de sesión
        console.log('User logged out');
    };

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <span>{userName}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;