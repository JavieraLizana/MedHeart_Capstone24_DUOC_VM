// src/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importa la función para crear usuarios
import { auth } from './firebaseConfig'; // Importa la configuración de Firebase
import './Registro.css'; // Importa los estilos para el componente

function Register() {
  // Estados para almacenar los datos del formulario de registro
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Hook para la navegación entre rutas

  // Función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
      return;
    }

    try {
      // Crear un nuevo usuario con correo y contraseña usando Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario registrado exitosamente");
      navigate('/home'); // Redirigir a la página principal después del registro
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Error al registrar el usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <div className="login-redirect">
          <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
