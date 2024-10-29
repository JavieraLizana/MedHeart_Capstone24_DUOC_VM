// src/Password.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './Password.css'; // Crea estilos personalizados si lo deseas

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Se ha enviado un enlace para restablecer la contraseña a tu correo.');
    } catch (error) {
      setMessage(`Error al enviar el correo: ${error.message}`);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Restablecer Contraseña</h2>
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="reset-button">Enviar Enlace</button>
        </form>
        {message && <p className="message">{message}</p>}
        <div className="back-to-login">
          <a href="/login">Volver a Iniciar Sesión</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
