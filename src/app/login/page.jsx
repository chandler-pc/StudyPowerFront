// src/app/login/page.jsx
"use client"; // Necesario para usar hooks en componentes de cliente

import React from 'react';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  async function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error en la petición');
    }).then((data) => {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    }).catch((error) => {
      console.error(error);
    });
}

return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Inicio de sesión</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Correo electrónico</label>
          <input name="email" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Contraseña</label>
          <input name="password" type="password" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Iniciar sesión</button>
      </form>
      <div className="flex justify-between py-3 mt-4">
        <button
          onClick={handleForgotPassword}
          className="text-sm text-blue-500 hover:underline"
        >
          Olvidé mi contraseña
        </button>
        <button
          onClick={handleRegister}
          className="text-sm text-blue-500 hover:underline"
        >
          No tienes cuenta? Regístrate
        </button>
      </div>
    </div>
  </div>
);
}

export default LoginPage;
