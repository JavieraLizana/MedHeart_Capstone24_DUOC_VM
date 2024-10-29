import React, { useState } from 'react';
import './Contacto.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'; // Importar los íconos de redes sociales

function Contacto() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Aquí se puede agregar lógica para enviar el formulario a un backend o API

    alert(`Mensaje enviado por ${name}.`);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="contact-container">
      <h2>Contáctanos</h2>
      <div className="contact-box">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Asunto del mensaje"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí"
              required
            />
          </div>

          <button type="submit" className="send-button">Enviar Mensaje</button>
          {submitted && <p className="success-message">¡Tu mensaje ha sido enviado exitosamente!</p>}
        </form>

        {/* Sección de información de contacto adicional */}
        <div className="contact-info">
          <h3>Información de Contacto</h3>
          <p><strong>Dirección:</strong> Av. Ficticia 123, Viña del Mar, Chile</p>
          <p><strong>Teléfono:</strong> +123 456 7890</p>
          <p><strong>Correo:</strong> infinitylabs@contacto.com</p>
          <div className="social-media">
            <h3>Síguenos en nuestras redes:</h3>
            {/* Usar botones en lugar de enlaces vacíos */}
            <button className="social-icon"><FontAwesomeIcon icon={faFacebookF} /></button>
            <button className="social-icon"><FontAwesomeIcon icon={faTwitter} /></button>
            <button className="social-icon"><FontAwesomeIcon icon={faInstagram} /></button>
            <button className="social-icon"><FontAwesomeIcon icon={faLinkedinIn} /></button>
          </div>
        </div>
      </div>

      {/* Contenedor del botón de volver y redes sociales */}
      <div className="footer-container">
        <button className="back-button" onClick={() => navigate('/home')}>Volver al Inicio</button>
      </div>
    </div>
  );
}

export default Contacto;
