"use client";
import jwt from 'jsonwebtoken';
import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
const TaskModal = ({ isOpen, onClose, onSave }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    expire: '',
    dificulty: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const decoded = jwt.decode(localStorage.getItem('token'));
    const data = {
      ...task,
      userId: decoded.id
    };

    fetch(`http://localhost:5000/tasks/${decoded.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(newTask => {
        onSave(newTask);
        onClose(); 
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-md">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold py-4">Crear Tarea</h2>
          <button onClick={onClose} className="text-lg"><IoCloseOutline size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="gap-4 flex flex-col">
            <label className="text-lg font-medium">Título</label>
            <input
              name='title'
              type="text"
              value={task.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 text-lg rounded-md"
              required
            />
          </div>
          <div className="gap-4 flex flex-col">
            <label className="text-lg font-medium">Descripción</label>
            <textarea
              name='description'
              value={task.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 text-lg rounded-md"
              required
            />
          </div>
          <div className="gap-4 flex flex-col">
            <label className="text-lg font-medium">Expira</label>
            <input
              name='expire'
              type="date"
              value={task.expire}
              onChange={handleChange}
              className="p-2 border border-gray-300 text-lg rounded-md"
            />
          </div>
          <div className="gap-4 flex flex-col">
            <label className="text-lg font-medium">Dificultad</label>
            <select
              name='dificulty'
              value={task.dificulty}
              onChange={handleChange}
              className="p-2 border border-gray-300 text-lg rounded-md"
            >
              <option value={0}>Fácil</option>
              <option value={1}>Media</option>
              <option value={2}>Difícil</option>
            </select>
          </div>
          <div className="py-4 flex justify-end">
            <button type="submit" className="px-6 py-2 mt-1 rounded-full w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
