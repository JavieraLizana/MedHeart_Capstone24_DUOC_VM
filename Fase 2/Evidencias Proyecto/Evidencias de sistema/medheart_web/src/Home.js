import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Chatbot from './Chatbot'; // Importa el Chatbot

function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  // Función para manejar la apertura y cierre del chatbot
  const handleChat = () => {
    setChatOpen(!chatOpen);
  };

  // Función para cerrar sesión
  const handleSignOut = () => {
    alert('Has cerrado sesión');
    navigate('/'); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="home-container">
      {/* Encabezado */}
      <header className="navbar">
        <div className="navbar-logo">
          <img src="img/Logo_MedHeart_png.png" alt="MedHeart Logo" />
        </div>
        <nav className="navbar-links">
          <a href="/home">Inicio</a>
          <a href="/profile">Perfil usuario</a>
          <a href="/diagnostics">Diagnósticos</a>
          <a href="/images">Imágenes</a>
          <a href="/contact">Contacto</a>
        </nav>
        <div className="navbar-tools">
          <input type="text" placeholder="Buscar..." className="search-bar" />
          <button className="signout-button" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main-content">
        {/* Carrusel Bootstrap */}

<div className="carousel-container">
  <div id="medheartCarousel" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="img/Carrusel0.png" className="d-block w-100" alt="Foto 1" />
      </div>
      <div className="carousel-item">
        <img src="img/Carrusel1.jpg" className="d-block w-100" alt="Foto 2" />
      </div>
      <div className="carousel-item">
        <img src="img/Carrusel2.png" className="d-block w-100" alt="Foto 3" />
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#medheartCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Anterior</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#medheartCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Siguiente</span>
    </button>
  </div>
  </div>

        {/* Sección de bienvenida */}
        <div className="welcome-section">
          <h3>Bienvenidos a MedHeart</h3>
          <p>Tu salud cardíaca, nuestra prioridad.</p>
          <img src="img/FotoMed.png" alt="Salud del corazón" className="heart-image" />
          <img src="img/Foto_texto2.png" alt="Texto del corazón" className="heart-image" />
          <img src="img/Foto_ia.png" alt="Inteligencia Artificial" className="heart-image" />
        </div>

        {/* Sección de servicios */}
        <div className="services-section">
          <h2>¡Descarga MedHeart hoy mismo!</h2>
          <p>
            Con nuestra app, mejora tu análisis con tecnología avanzada y lleva el cuidado cardíaco al siguiente nivel.
            ¡Disponible para descarga en todas las plataformas!
          </p>
        </div>

        {/* Sección de tarjetas informativas */}
        <div className="info-cards-section">
          <div className="card-container">
            <div className="card">
              <img src="img/corazon.png" alt="Corazón Saludable" />
              <h3>Cuida tu corazón</h3>
              <p>Consejos para mantener un corazón saludable y prevenir enfermedades cardíacas.</p>
            </div>
            <div className="card">
              <img src="img/investigar.png" alt="Diagnósticos Médicos" />
              <h3>Diagnósticos Médicos</h3>
              <p>Accede a diagnósticos precisos y personalizados a través de MedHeart.</p>
            </div>
            <div className="card">
              <img src="img/adn.png" alt="Genética Cardíaca" />
              <h3>Genética Cardíaca</h3>
              <p>Conoce cómo tus genes pueden influir en tu salud cardíaca y el riesgo de enfermedades.</p>
            </div>
            <div className="card">
              <img src="img/ciencias.png" alt="Pruebas Médicas" />
              <h3>Pruebas Médicas</h3>
              <p>Consulta los resultados de tus pruebas médicas y lo que significan para tu corazón.</p>
            </div>
            <div className="card">
              <img src="img/nanotecnologia.png" alt="Enciclopedia Cardíaca" />
              <h3>Enciclopedia Cardíaca</h3>
              <p>Artículos sobre enfermedades cardíacas, síntomas, exámenes y tratamientos.</p>
            </div>
            <div className="card">
              <img src="img/manzanas.png" alt="Estilo de Vida Saludable" />
              <h3>Estilo de Vida Saludable</h3>
              <p>Recetas y consejos para una dieta y estilo de vida que mantenga tu corazón fuerte.</p>
            </div>
            <div className="card">
              <img src="img/medico.png" alt="Visita a tu médico periódicamente" />
              <h3>Visitas médicas</h3>
              <p>Visita a tu médico periódicamente para evaluar tu salud.</p>
            </div>
            <div className="card">
              <img src="img/casa.png" alt="Cuida a tu familia" />
              <h3>Familia y salud</h3>
              <p>Cuidar tu corazón también es cuidar a tu familia.</p>
            </div>
          </div>
        </div>
      </main>

  {/* Chatbot */}
    <div className="chatbot">
        <button className="chatbot-button" onClick={handleChat}>💬 Chatbot</button>
        {chatOpen && (
          <div className="chat-window">
            <Chatbot /> {/* El componente Chatbot se integra aquí para la interacción directa */}
          </div>
        )}    
  </div>

  <footer>
  <p>InfinityLabs. Todos los derechos reservados</p>
  <div className="social-icons">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
  </div>
  </footer>
</div>
  );
}

export default Home;