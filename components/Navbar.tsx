'use client'
import React from 'react';

const Navbar = ({ userName }: { userName: string }) => {
    

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-end">
            <h1>{userName}</h1>
            
        </nav>
    );
};

export default Navbar;