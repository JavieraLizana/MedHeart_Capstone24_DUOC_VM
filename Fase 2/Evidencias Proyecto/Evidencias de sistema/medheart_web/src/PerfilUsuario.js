// src/PerfilUsuario.js
import React, { useState } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './PerfilUsuario.css';
import './Delete.css'; // Importar estilos para el formulario de eliminación

function PerfilUsuario() {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false); // Controlar la vista de confirmación de eliminación
  const navigate = useNavigate();

  // Manejar el cambio de contraseña
  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(auth.currentUser, newPassword);
      setMessage('Contraseña actualizada exitosamente.');
    } catch (error) {
      setMessage(`Error al cambiar la contraseña: ${error.message}`);
    }
  };

  // Mostrar/ocultar el formulario de eliminación de cuenta
  const toggleDeleteConfirmation = () => {
    setConfirmDelete(!confirmDelete);
  };

  // Eliminar cuenta
  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword); // Asegurarse de usar el email correcto
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      alert('Cuenta eliminada exitosamente.');
      navigate('/register');
    } catch (error) {
      setMessage(`Error al eliminar la cuenta: ${error.message}`);
    }
  };

  return (
    <div className="perfil-usuario-container">
      <h2>Perfil de Usuario</h2>
      <div className="profile-box">
        {message && <p className="message">{message}</p>}
        <div className="password-change">
          <h3>Cambiar Contraseña</h3>
          <label>
            <strong>Contraseña Actual:</strong>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Contraseña Actual"
            />
          </label>
          <label>
            <strong>Nueva Contraseña:</strong>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva Contraseña"
            />
          </label>
          <button className="change-password-button" onClick={handleChangePassword}>
            Cambiar Contraseña
          </button>
        </div>

        {/* Botón para mostrar formulario de eliminación */}
        <div className="delete-account-section">
          <h3>Eliminar Cuenta</h3>
          <button className="delete-button" onClick={toggleDeleteConfirmation}>
            {confirmDelete ? 'Cancelar' : 'Eliminar Cuenta'}
          </button>
        </div>

        {/* Formulario de eliminación de cuenta */}
        {confirmDelete && (
          <div className="delete-account-container">
            <div className="delete-account-box">
              <h3>Confirmar Eliminación de Cuenta</h3>
              <p>Ingresa tu contraseña para confirmar la eliminación de la cuenta.</p>
              <input
                type="password"
                placeholder="Contraseña"
                className="input-field"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button onClick={handleDeleteAccount} className="delete-button confirm-delete">
                Confirmar Eliminación
              </button>
            </div>
          </div>
        )}

        <button className="back-button" onClick={() => navigate('/home')}>Volver al Inicio</button>
      </div>
    </div>
  );
}

export default PerfilUsuario;
