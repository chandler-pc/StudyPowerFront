'use client';
import React, { useEffect, useState } from 'react'
import ListTasks from '@/components/ListTasks';
import TaskModal from '@/components/TaskModal'; // Importa el modal
import jwt from 'jsonwebtoken';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    const decoded = jwt.decode(localStorage.getItem('token'));
    fetch(`http://localhost:5000/tasks/${decoded.id}`).then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const addNewTask = () => {
    setIsModalOpen(true); 
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const saveTask = (newTask) => {
    setTasks([...tasks, newTask]);
    window.location.reload();
  }

  return (
    <section className="container mx-auto flex flex-col md:gap-12 gap-4 p-4 md:ml-16 ml-2 ">
      <div className='flex md:w-5/6 mt-10 border-b-2 border-[#111827]/40 pb-4 text-2xl'>Bienvenido a tus tareas</div>
      <div className='text-xl'>Inicio &gt; Tareas</div>
      <div className="flex flex-col gap-4 md:w-4/5 w-full">
        <div className="flex flex-col gap-6 pl-3 ">
          <ListTasks tasks={tasks} className="gap-6" />
          <button onClick={addNewTask} className="px-7 py-2 md:mt-4 mt-2 rounded-full w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm">Agregar tareas</button>
        </div>
      </div>
      <TaskModal isOpen={isModalOpen} onClose={closeModal} onSave={saveTask} /> {}
    </section>
  );
}

export default TaskPage;
