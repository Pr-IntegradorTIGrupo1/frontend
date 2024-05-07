import React from 'react';

const Sidebar = () => {
    return (
        <div className="h-screen w-64 fixed bg-gray-800 text-white">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Logo</h1>
                <ul>
                    <li className="mb-2">Item 1</li>
                    <li className="mb-2">Item 2</li>
                    <li className="mb-2">Item 3</li>
                    // Agrega más elementos aquí
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;