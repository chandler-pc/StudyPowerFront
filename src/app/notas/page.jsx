'use client';
import NoteSelector from "@/components/NoteSelector";
import AddButtonNote from "@/components/AddButtonNote";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';


export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const decoded = jwt.decode(localStorage.getItem('token'));
        fetch(`http://localhost:5000/notes/get/${decoded.id}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                const _notes = [];
                data.forEach(note => {
                    _notes.push({
                        id: note.id,
                        name: note.title,
                        hash: note.hash
                    });
                });
                setNotes(_notes);
            });
    }, []);
    const [addNotes, setAddNotes] = useState(false);
    const onSubmit = async (event) => {
        event.preventDefault()
        const decoded = jwt.decode(localStorage.getItem('token'));
        const formData = new FormData(event.target)
        const data = await fetch(`http://localhost:5000/notes/create/${decoded.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        const response = await data.json();
        if (response.code !== 201) {
            alert('Error al añadir la nota');
            return;
        }
        setNotes([...notes, {
            id: response.data.userId,
            name: response.data.title,
            hash: response.data.hash
        }]);
        console.log(notes);
    }
    return (
        <section className="container mx-auto flex flex-col md:gap-12 gap-8 p-4 md:ml-16 w-auto">
            <div className='md:w-5/6 mt-10 border-b-2 border-[#111827]/40 pb-4 text-2xl'>Bienvenido a tus apuntes</div>
            <div className='text-xl'>Inicio &gt; Apuntes</div>
            {
                notes.map((note) => (
                    <NoteSelector key={note.id} name={note.name} targetUrl={note.hash} />
                ))
            }
            <AddButtonNote onClick={() => setAddNotes(!addNotes)} />
            {
                addNotes && (
                    <div className='flex flex-col gap-4 items-center justify-end'>
                        <form onSubmit={onSubmit}> 
                            <input name="title" type='text' placeholder='Nombre del apunte' className='border-2 border-black/50 p-2 rounded-lg' />
                            <br/>
                            <button type="submit" className='py-2 px-6 rounded-full shadow w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm'>Añadir</button>
                        </form>
                    </div>
                )
            }
        </section>
    )
}