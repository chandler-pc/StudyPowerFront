'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEllipsisH, FaTrashAlt, FaShareAlt } from 'react-icons/fa';
import jwt from 'jsonwebtoken';

const deleteName = async (name, hash, userId) => {
    const response = await fetch(`http://localhost:5000/notes/delete/name/${hash}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    window.location.reload();
};

const OptionsMenu = ({ onClose, name, hash,userId }) => (
    <div className="absolute top-0 left-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
        <ul className="py-1">
            <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>deleteName(name, hash,userId)}>
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

const NoteTitle = ({ name, hash }) => {
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
        if (showMenu) return;
        router.push("/notas/"+ hash + "/" + name);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div onClick={handleComponentClick} className="relative min-w-[300px] flex items-center justify-between p-3 border rounded-lg cursor-pointer">
            <span className="text-base">{name}</span>
            <div className="relative" ref={menuRef}>
                <button onClick={toggleMenu} className="ml-2 p-2 rounded-full text-black">
                    <FaEllipsisH />
                </button>
                {showMenu && <OptionsMenu onClose={() => setShowMenu(false) } name={name} hash={hash} userId={userId}/>}
            </div>
        </div>
    );
};

export default NoteTitle;
