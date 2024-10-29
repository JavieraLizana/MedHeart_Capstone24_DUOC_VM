// src/Delete.js
import React, { useState } from 'react';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './Delete.css'; // Estilos personalizados

function DeleteAccount() {
  const [email, setEmail] = useState(''); // Estado para el email
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [message, setMessage] = useState(''); // Estado para mostrar mensajes al usuario
  const navigate = useNavigate();

  // Reautenticar al usuario antes de eliminar la cuenta
  const reauthenticateUser = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
        return true;
      }
    } catch (error) {
      setMessage(`Error de autenticación: ${error.message}`);
    }
    return false;
  };

  // Función para manejar la eliminación de la cuenta
  const handleDeleteAccount = async () => {
    try {
      if (!email || !password) {
        setMessage('Por favor, ingresa tu correo y contraseña para confirmar.');
        return;
      }

      const reauthenticated = await reauthenticateUser();
      if (reauthenticated) {
        const user = auth.currentUser;
        await deleteUser(user); // Elimina la cuenta del usuario autenticado
        setMessage('Cuenta eliminada exitosamente.');
        navigate('/register'); // Redirige a la página de registro
      } else {
        setMessage('No se pudo autenticar al usuario. Por favor, revisa tus credenciales.');
      }
    } catch (error) {
      setMessage(`Error al eliminar la cuenta: ${error.message}`);
    }
  };

  return (
    <div className="delete-account-container">
      <div className="delete-account-box">
        <h2>Eliminar Cuenta</h2>
        <p>Por seguridad, ingresa tus credenciales para confirmar la eliminación de la cuenta.</p>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleDeleteAccount} className="delete-button">
          Eliminar Cuenta
        </button>
        {message && <p className="message">{message}</p>}
        <div className="back-to-login">
          <a href="/login">Volver a Iniciar Sesión</a>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;
