// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from './firebaseConfig';
// import './Login.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const googleProvider = new GoogleAuthProvider(); // Proveedor de Google

//   // Función para iniciar sesión con correo electrónico y contraseña
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Inicio de sesión exitoso");
//       navigate('/home');
//     } catch (error) {
//       alert('Error en el inicio de sesión. Por favor, revisa tus credenciales.');
//       console.error('Error al iniciar sesión:', error);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       alert("Inicio de sesión con Google exitoso");
//       navigate('/home');
//     } catch (error) {
//       alert('Error en el inicio de sesión con Google.');
//       console.error('Error al iniciar sesión con Google:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-logo">
//         <img src="img/Logo_MedHeart_png.png" alt="MedHeart Logo" />
//       </div>
//       <div className="login-box">
//         <h2>Bienvenidos a MedHeart</h2>
//         <div className="login-tabs">
//           <Link to="/register"><button>Regístrate</button></Link>
//           <Link to="/login"><button>Iniciar Sesión</button></Link>
//         </div>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Correo electrónico"
//             className="input-field"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Contraseña"
//             className="input-field"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="login-button">Iniciar Sesión</button>
//         </form>

//         <button className="google-login-button" onClick={handleGoogleLogin}>
//         <img src="/img/image.png" alt="Google logo" className="google-icon" />
//         Iniciar Sesión con Google
//         </button>

//         <div className="forgot-password">
//           <Link to="/forgot-password">¿Olvidaste la contraseña?</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar visibilidad de la contraseña
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider(); // Proveedor de Google

  // Función para iniciar sesión con correo electrónico y contraseña
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Inicio de sesión exitoso");
      navigate('/home');
    } catch (error) {
      alert('Error en el inicio de sesión. Por favor, revisa tus credenciales.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  // Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Inicio de sesión con Google exitoso");
      navigate('/home');
    } catch (error) {
      alert('Error en el inicio de sesión con Google.');
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src="img/Logo_MedHeart_png.png" alt="MedHeart Logo" />
      </div>
      <div className="login-box">
        <h2>Bienvenidos a MedHeart</h2>
        <div className="login-tabs">
          <Link to="/register"><button>Regístrate</button></Link>
          <Link to="/login"><button>Iniciar Sesión</button></Link>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}  // Cambia entre texto y contraseña
              placeholder="Contraseña"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={togglePasswordVisibility} className="toggle-password">
              {showPassword ? '👁️' : '🙈'} 
            </span>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>

        <button className="google-login-button" onClick={handleGoogleLogin}>
          <img src="/img/image.png" alt="Google logo" className="google-icon" />
          Iniciar Sesión con Google
        </button>

        <div className="forgot-password">
          <Link to="/forgot-password">¿Olvidaste la contraseña?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

