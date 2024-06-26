'use client';
import React, { useEffect, useState } from 'react';
import TipPreview from '@/components/TipPreview';
import { FaArrowRight, FaStar  } from 'react-icons/fa';
import { MdStars } from "react-icons/md";
import TopUsers from '@/components/TopUsers';
import { SiLevelsdotfyi } from "react-icons/si";
import LogroPreview from '@/components/LogroPreview';
function LogrosPage() {
    const users = [
        { name: 'Usuario 1', level: 'Maestro Sabio 5' },
        { name: 'Usuario 2', level: 'Maestro Sabio 5' },
        { name: 'Usuario 3', level: 'Maestro Sabio 5' },
        { name: 'Usuario 4', level: 'Maestro Sabio 5' },
        { name: 'Usuario 5', level: 'Maestro Sabio 5' },
        // ... otros usuarios ...
        { name: 'Tú', level: 'Retador 4' },
      ];

    const currentUser = { name: 'Tú', level: 'Retador 4', points: 1000 };

    return (
        <section className="container mx-auto flex flex-col md:gap-12 gap-4 p-4 md:ml-16 ">
            <div className='md:w-5/6 mt-10 border-b-2 border-black/40 pb-4 text-2xl'>Bienvenido a tu asistente personal</div>
            <div className='text-xl'>Inicio &gt; Asistencia</div>
            <div className="flex md:flex-row flex-col md:gap-20 gap-4 py-6 px-1  items-center">
                <div className="flex flex-row md:justify-start justify-center items-center gap-4 md:w-2/5 w-full h-full">
                    <MdStars size={40}/> 
                    <p className="text-center text-lg">Tus puntos totales: {currentUser.points}</p>
                </div>
                <div className="flex flex-row md:justify-start justify-center items-center gap-4 md:w-3/5 w-full h-full">
                    <SiLevelsdotfyi size={30}/>
                    <p className="text-center text-lg">Tu nivel actual: {currentUser.level}</p>
                </div>
            </div>
            <div className="flex md:flex-row flex-col gap-20">
                <div className="flex flex-col gap-8 md:w-2/5 w-full h-full">
                    <div>
                        <p className="text-lg ">Tus Logros</p>
                        <LogroPreview tip="aca va un logro" className="rounded-lg "></LogroPreview>
                    </div>
                </div>

                <div className="flex flex-col gap-8 md:w-3/5 w-full">
                <p className="text-lg ">Top de Usuarios</p>

                    <TopUsers users={users} currentUser={currentUser} />  
                </div>
            </div>
        </section>
    );
}

export default LogrosPage;