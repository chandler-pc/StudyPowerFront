// src/app/perfil/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
function ProfilePage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [university, setUniversity] = useState('');
  const [birthday, setBirthday] = useState('');
  const [theme, setTheme] = useState('Claro');

  useEffect(() => {
    fetch(`http://localhost:5000/profile/get/${jwt.decode(localStorage.getItem('token')).id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setSurname(data.lastName);
        setUniversity(data.university);
        const date = new Date(data.birthDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setBirthday(formattedDate);
      });
  }, []);

  const handleUpdateProfile = () => {
    const localDate = document.getElementById('birthdayInput').value;
    const localDateTime = new Date(localDate);
    const utcYear = localDateTime.getUTCFullYear();
    const utcMonth = String(localDateTime.getUTCMonth() + 1).padStart(2, '0');
    const utcDay = String(localDateTime.getUTCDate()).padStart(2, '0');
    const utcDate = `${utcYear}-${utcMonth}-${parseInt(utcDay)+1}`;
    fetch(`http://localhost:5000/profile/update/${jwt.decode(localStorage.getItem('token')).id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: document.getElementById('nameInput').value,
          lastName: document.getElementById('surnameInput').value,
          university: document.getElementById('universityInput').value,
          birthDate: utcDate,
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          window.location.reload();
        }
      });
  };

  const handleEditProfile = () => {
    const nameInput = document.getElementById('nameInput');
    const surnameInput = document.getElementById('surnameInput');
    const universityInput = document.getElementById('universityInput');
    const birthdayInput = document.getElementById('birthdayInput');
    if (nameInput.disabled) {
      nameInput.disabled = false;
      surnameInput.disabled = false;
      universityInput.disabled = false;
      birthdayInput.disabled = false;
      return;
    }
    nameInput.disabled = true;
    surnameInput.disabled = true;
    universityInput.disabled = true;
    birthdayInput.disabled = true;
    return;
  }

  const handleEnable2FA = () => {
    alert('2FA habilitado');
  };

  const handleChangePassword = () => {
    alert('Contraseña cambiada');
  };

  return (
    <section className="container mx-auto flex flex-col md:gap-12 gap-4 p-4 md:ml-16 w-auto">
      <div className="md:w-5/6 mt-10 border-b-2 border-[#111827]/40 pb-4 text-2xl">Bienvenido a tu Perfil</div>
      <div className='text-xl'>Inicio &gt; Perfil</div>
      <div className="flex flex-col gap-4 md:w-2/3 w-full mt-4">
        <div className="flex items-center justify-between p-4 border-b-2 border-black/5 text-lg">
          <span>Nombre : <input id="nameInput" value={name} disabled={true} onChange={(e) => { setName(document.getElementById('nameInput').value) }} /></span>
        </div>
        <div className="flex items-center justify-between p-4 border-b-2 border-black/5 text-lg">
          <span>Apellido : <input id="surnameInput" value={surname} disabled={true} onChange={(e) => { setSurname(document.getElementById('surnameInput').value) }} /></span>
        </div>
        <div className="flex items-center justify-between p-4 border-b-2 border-black/5 text-lg">
          <span>Universidad : <input id="universityInput" value={university} disabled={true} onChange={(e) => { setUniversity(document.getElementById('universityInput').value) }} /></span>
        </div>
        <div className="flex items-center justify-between p-4 border-b-2 border-black/5 text-lg">
          <span>Cumpleaños : <input id="birthdayInput" type="date" value={birthday} disabled={true} onChange={(e) => { setBirthday(document.getElementById('birthdayInput').value) }} /></span>
        </div>
        <div className='flex items-center justify-start gap-10 text-lg'>
          <button
            onClick={handleUpdateProfile}
            className="mt-8 px-6 py-2 mt-1 rounded-full w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm"
          >
            Actualizar perfil
          </button>
          <button
            onClick={handleEditProfile}
            className="mt-8 px-6 py-2 mt-1 rounded-full w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm"
          >
            Editar perfil
          </button>
        </div>
        <div className="py-4 flex flex-col gap-2 text-lg">
          <label className="block mb-2 text-sm font-medium  text-lg">
            <p className='text-lg'>Tema:</p>
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-5 py-2 border border-gray-300 rounded-md w-[170px] "
          >
            <option value="Claro">Claro</option>
            <option value="Oscuro">Oscuro</option>
          </select>
        </div>
        <div className="mt-6 flex items-center justify-start gap-10 text-lg">
          <button
            onClick={handleEnable2FA}
            className=" px-6 py-2 rounded-full w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm"
          >
            Habilitar 2FA
          </button>
          <button
            onClick={handleChangePassword}
            className=" px-6 py-2 rounded-full w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm"
          >
            Cambiar contraseña
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
