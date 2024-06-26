'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEllipsisV, FaTrashAlt, FaShareAlt } from 'react-icons/fa';
import jwt from 'jsonwebtoken';

const deleteByHash = async (hash, userId) => {
    try {
        const response = await fetch(`http://localhost:5000/notes/delete/${hash}/${userId}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Error al eliminar la nota');
        }
        window.location.reload();
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
    }
}

const OptionsMenu = ({ onClose, hashToDelete, userId }) => (
    <div className="absolute top-0 left-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
        <ul className="py-1">
            <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => deleteByHash(hashToDelete, userId)}>
                <FaTrashAlt className="mr-2" />
                Eliminar
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onClose}>
                <FaShareAlt className="mr-2" />
                Compartir
            </li>
        </ul>
    </div>
);

const NoteSelector = ({ name, targetUrl }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();
    const userId = jwt.decode(localStorage.getItem('token')).id;

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    const handleComponentClick = () => {
        if(showMenu) return;
        router.push("./notas/"+ targetUrl);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div onClick={handleComponentClick} className="relative min-w-[300px] flex items-center justify-between p-3 border rounded-lg bg-gray-100 cursor-pointer">
            <span className="text-base">{name}</span>
            <div className="relative" ref={menuRef}>
                <button onClick={toggleMenu} className="ml-2 p-2 rounded-full text-black">
                    <FaEllipsisV />
                </button>
                {showMenu && <OptionsMenu onClose={() => setShowMenu(false)} hashToDelete={targetUrl+""} userId={userId}/>}
            </div>
        </div>
    );
};

export default NoteSelector;
