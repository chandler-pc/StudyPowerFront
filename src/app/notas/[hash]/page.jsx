'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AddButtonNote from '@/components/AddButtonNote';
import NoteTitle from '@/components/NoteTitle';
import jwt from 'jsonwebtoken';

const NoteDetail = () => {
  const { hash } = useParams();
  const [notes, setNotes] = useState([]);
  const [titleLabel, setTitleLabel] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault()
    const decoded = jwt.decode(localStorage.getItem('token'));
    const formData = new FormData(event.target)
    const data = await fetch(`http://localhost:5000/notes/create/${hash}/${decoded.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const response = await data.json();
    if (response.code !== 201) {
      return;
    }
    setNotes([...notes, response.newName]);
  }
  useEffect(() => {
    const decoded = jwt.decode(localStorage.getItem('token'));
    fetch(`http://localhost:5000/notes/get/${hash}/${decoded.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitleLabel(data.title);
        if (!data.names) return;
        setNotes(data.names)
      });
  }, []);

  const [addNames, setAddname] = useState(false);
  return (
    <section className="container mx-auto flex flex-col md:gap-12 gap-8 p-4 md:ml-16 w-auto">

      <div className='md:w-2/3 mt-10 border-b-2 border-black/50 pb-4 text-2xl'>Bienvenido a tus apuntes</div>
      <div className='text-xl'>Inicio &gt; Apuntes &gt; {titleLabel}</div>
      <div className='grid grid-cols-1 gap-4'>
      {
        notes.map((note) => (
          <NoteTitle name={note} hash={hash}/>
        ))
      }
      </div>
      <AddButtonNote onClick={() => setAddname(!addNames)} />
      {
        addNames && (
          <div className='flex flex-col gap-4 items-center justify-end'>
            <form onSubmit={onSubmit}>
              <input name="newName" type='text' placeholder='Nombre de la nota' className='border-2 border-black/50 p-2' />
              <br />
              <button type="submit" className='bg-gray-800 text-white py-2 px-4 rounded-full shadow w-24'>Añadir</button>
            </form>
          </div>
        )
      }
    </section>
    
  );
};

export default NoteDetail;
