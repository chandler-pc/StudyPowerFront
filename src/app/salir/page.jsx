'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
    
  const router = useRouter();
  useEffect(() => {
    const handleLogout = async () => {
      try {
        localStorage.removeItem('token');
        router.push('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };
    handleLogout();
  }, []);

  return (
    <div>
      <p>Cerrando sesión...</p>
    </div>
  );
};

export default LogoutPage;
