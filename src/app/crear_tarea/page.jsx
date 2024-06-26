"use client";
import jwt from 'jsonwebtoken';
import React from 'react';
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const decoded = jwt.decode(localStorage.getItem('token'));
  const data = Object.fromEntries(formData.entries());

  fetch(`http://localhost:5000/tasks/${decoded.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function TaskPage() {
  return (
    <section className="container mx-auto flex flex-col md:gap-12 gap-4 p-4 md:ml-16 ml-2 ">
      <div className='flex md:w-5/6 mt-10 border-b-2 border-[#111827]/40 pb-4 text-2xl'>Bienvenido a tus tareas</div>
      <div className='text-xl'>Inicio &gt; Tareas</div>
      <div className="flex flex-col md:w-2/3 w-full mt-4">
        <div className="flex flex-col bg-gray-200 p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Crear Tarea</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium">Título</label>
              <input name='title' type="text" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col mb-4 md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Descripción</label>
              <textarea name='description' className="w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium">Expira</label>
              <input name='expire' type="date" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium">Dificultad</label>
              <select name='dificulty' className="w-full p-2 border border-gray-300 rounded-md">
                <option value={0}>Fácil</option>
                <option value={1}>Media</option>
                <option value={2}>Difícil</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TaskPage;
