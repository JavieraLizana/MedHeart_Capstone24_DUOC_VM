// src/chatgptApi.js
import axios from 'axios';

const API_KEY = 'sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Reemplaza con tu clave de API válida de OpenAI
const API_URL = 'https://api.openai.com/v1/chat/completions';


export const sendMessageToChatGPT = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error al conectar con la API de ChatGPT:', error);

    if (error.response) {
      const status = error.response.status; // Obtener el código de estado
      console.error('Error de respuesta de la API:', error.response.data);

      // Personalizar los mensajes de error según el código de estado
      if (status === 401) {
        return 'Error: La clave API no es válida o ha expirado. Revisa la configuración de la API.';
      } else if (status === 429) {
        return 'Error: Has excedido el límite de solicitudes. Intenta de nuevo más tarde.';
      } else if (status === 400) {
        return 'Error: La solicitud a la API está mal formada. Revisa la estructura de la solicitud.';
      } else if (status >= 500) {
        return 'Error: Problema en el servidor de OpenAI. Inténtalo de nuevo más tarde.';
      } else {
        return `Error de la API: ${error.response.data.error.message}`;
      }
    } else if (error.request) {
      console.error('No se recibió respuesta de la API:', error.request);
      return 'No se pudo conectar con la API de OpenAI. Verifica tu conexión y asegúrate de que la API esté disponible.';
    } else {
      console.error('Error al configurar la solicitud a la API:', error.message);
      return 'Hubo un problema al configurar la solicitud. Revisa la configuración e intenta de nuevo.';
    }
  }
};