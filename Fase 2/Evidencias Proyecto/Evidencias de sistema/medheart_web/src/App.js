import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; // Componente de inicio de sesión
import Home from './Home'; // Componente de la página principal
import Register from './Registro'; // Componente de registro
import Password from './Password'; // Componente para recuperación de contraseña
import DeleteAccount from './Delete'; // Componente para eliminar la cuenta
import PerfilUsuario from './PerfilUsuario'; // Importar el componente PerfilUsuario
import Contacto from './Contacto';
import FormularioDiagnostico from './FormularioDiagnostico'; // Importar el componente FormularioDiagnostico
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Ruta para el login */}
          <Route path="/login" element={<Login />} /> {/* Redirigir al login */}
          <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}
          <Route path="/forgot-password" element={<Password />} /> {/* Ruta para recuperación de contraseña */}
          <Route path="/home" element={<Home />} /> {/* Ruta para la página principal */}
          <Route path="/delete-account" element={<DeleteAccount />} /> {/* Ruta para eliminar cuenta */}
          <Route path="/profile" element={<PerfilUsuario />} />
          <Route path="/contact" element={<Contacto />} />
          <Route path="/diagnostics" element={<FormularioDiagnostico />} /> {/* Ruta para el diagnóstico */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



