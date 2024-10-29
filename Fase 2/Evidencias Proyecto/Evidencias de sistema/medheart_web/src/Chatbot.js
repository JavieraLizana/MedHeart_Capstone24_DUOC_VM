import React, { useState } from 'react';
import { sendMessageToChatGPT } from './chatgptApi'; // Importa la función de conexión con la API
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]); // Almacena los mensajes del chat
  const [userMessage, setUserMessage] = useState(''); // Almacena el mensaje actual del usuario
  const [isLoading, setIsLoading] = useState(false); // Indica si se está esperando una respuesta de la API

  // Función para manejar el envío de mensajes
  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return; // No enviar si el mensaje está vacío

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setUserMessage(''); // Limpiar el campo de entrada

    setIsLoading(true); // Mostrar el estado de carga

    // Llamar a la API de OpenAI para obtener la respuesta
    const response = await sendMessageToChatGPT(userMessage);

    // Actualizar los mensajes con la respuesta del asistente
    setMessages([...newMessages, { role: 'assistant', content: response }]);
    setIsLoading(false); // Desactivar el estado de carga
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <strong>{msg.role === 'user' ? 'Tú: ' : 'Asistente: '}</strong>
              {msg.content}
            </div>
          ))}
        </div>
        <textarea
          placeholder="Escribe un mensaje..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          disabled={isLoading} // Deshabilita mientras se envía un mensaje
        ></textarea>
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;