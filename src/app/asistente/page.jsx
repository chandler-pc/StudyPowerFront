'use client';
import React, { useEffect, useState } from 'react';
import TipPreview from '@/components/TipPreview';
import { FaArrowRight, FaStar  } from 'react-icons/fa';
import Link from 'next/link'; 

function AsistenciaPage() {
  const [tip1, setTip1] = useState("");
  const [tip2, setTip2] = useState("");
  const [tip3, setTip3] = useState("");
  const [phrase, setPhrase] = useState("");
  const [chat, setChat] = useState([]);
  
  useEffect(() => {
    setChat([]);
    fetch('http://localhost:5000/tips/phrase').then(res => res.json()).then(data => setPhrase(data.phrase));
    fetch('http://localhost:5000/tips').then(res => res.json()).then(data => setTip1(data.tip));
    fetch('http://localhost:5000/tips').then(res => res.json()).then(data => setTip2(data.tip));
    fetch('http://localhost:5000/tips').then(res => res.json()).then(data => setTip3(data.tip));
    fetch('http://localhost:5000/chat').then(res => res.json()).then(data => {
      setChat([...chat, data.message]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    setChat([...chat, message]);
    e.target[0].value = "";
    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    }).then(res => res.json()).then(data => {
      setChat([...chat,message, data.message]);
    });
  }

  return (
    <section className="container mx-auto flex flex-col md:gap-12 gap-4 p-4 md:ml-16 ">
      <div className='md:w-5/6 mt-10 border-b-2 border-black/40 pb-4 text-2xl'>Bienvenido a tu asistente personal</div>
      <div className='text-xl'>Inicio &gt; Asistencia</div>
      <div className="flex md:flex-row flex-col gap-20">
        <div className="flex flex-col gap-8 md:w-2/5 w-full h-full">
          <p className="text-lg ">Motivación del día</p>
          <div className="flex flex-col items-center gap-8 p-6 rounded-lg bg-slate-200 h-auto min-h-[250px]">
            <FaStar size={58} />
            <p className="md:mt-1 text-center text-lg">{phrase}</p>
          </div>
          <div>
            <p className="text-lg ">Tips recomendados para ti</p>
            <TipPreview tip={tip1} className="rounded-lg "></TipPreview>
            <TipPreview tip={tip2} className="rounded-lg "></TipPreview>
          </div>
          <div>
            <p className="text-lg ">Insignias y Logros</p>
            <Link href="/logros">
              <div className="bg-slate-200 mt-8 rounded-md relative flex  items-center h-[120px]">
                <p className="ml-10 text-xl ">Insignias y Logros</p> 
                <span className="small-triangle-right"></span>
              </div>
            </Link>
          </div>  
        </div>

        <div className="flex flex-col gap-8 md:w-3/5 w-full">
          <p className="text-lg ">Solicita ayuda personalizada</p>
          <div className="bg-slate-200 p-4 rounded-md flex flex-col h-auto min-h-[900px]">
            <div className="flex items-center justify-center mb-4">
              <div className="text-3xl">🧑‍🏫</div>
            </div>
            <div className="bg-slate-300 p-4 rounded-md flex-grow">
              {
                chat.map((message, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <div className={index % 2 == 0 ? "bg-slate-400 p-2 rounded-md flex justify-start" : "bg-blue-200 p-2 rounded-md flex justify-end"}>
                          <p className="text-lg">{message}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="flex py-4  gap-4">
              <form onSubmit={handleSubmit} className='flex gap-4 bg-white border border-gray-300 rounded-lg justify-between items-center w-full'>
                <input type="text" placeholder="Escribir aquí..." className=" bg-transparent grow outline-none text-lg p-3  rounded-lg items-center justify-center" />
                <button type="submit" className="bg-[#212E3F] text-white w-9 h-9 mr-2 rounded-full flex items-center justify-center hover:bg-[#212E3F]/80 transition-colors"><FaArrowRight / ></button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AsistenciaPage;