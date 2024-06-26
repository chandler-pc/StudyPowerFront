'use client';
import React, { useEffect } from 'react'
import TaskCalendar from '@/components/Calendar';
import jwt from 'jsonwebtoken';


function CalendarPage() {
  const [events, setEvents] = React.useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/events/${jwt.decode(localStorage.getItem('token')).id}`)
      .then(response => response.json())
      .then(data => {
        data.forEach((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
        }
        );
        setEvents(data);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const formData = {
      title: data.get('title'),
      start: new Date(data.get('start')),
      end: new Date(data.get('end')),
      allDay: data.get('allDay') === 'on'
    };
    fetch(`http://localhost:5000/events/${jwt.decode(localStorage.getItem("token")).id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        window.location.reload();
      });
  }

  return (
    <section className="container mx-auto flex flex-col md:gap-12 gap-4 p-4 md:ml-16 ml-2 ">
      <div className='flex md:w-5/6 mt-10 border-b-2 border-[#111827]/40 pb-4 text-2xl'>Bienvenido a tu Calendario</div>
      <div className='text-xl'>Inicio &gt; Calendario</div>
      <div className="flex flex-col md:flex-row gap-12  w-full">

        <div className="flex flex-col gap-6 pl-3 md:w-3/4 w-full">
          <TaskCalendar events={events}/>
        </div>

        <div className="flex gap-8 pl-3 md:w-1/4 w-full">
          <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <label htmlFor="title" className='text-lg'>Título</label>
              <input type="text" id="title" name="title" className="p-1 border border-gray-300 text-lg rounded-md outline-none"/>
            </div>
            <div className="flex flex-col gap-6">
              <label htmlFor="start" className='text-lg'>Inicio</label>
              <input type="datetime-local" id="start" name="start" className="p-2 border border-gray-300 text-lg rounded-md" />
            </div>
            <div className="flex flex-col gap-6">
              <label htmlFor="end" className='text-lg'>Fin</label>
              <input type="datetime-local" id="end" name="end" className="p-1 border border-gray-300 text-lg rounded-md"/>
            </div>
            <div className="flex items-center justify-start align-center gap-6 py-5">
              <label htmlFor="all" className='text-lg'>Todo el día</label>
              <input type="checkbox" id="all" name="allDay" className='w-5 h-5 ' />
            </div>
            <div className='flex justify-center'>
              <button className="px-8 py-3  rounded-full w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm flex justify-center" type="submit">Crear Evento</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}



export default CalendarPage;