// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase con los datos proporcionados
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "medheart-435701.firebaseapp.com",
  projectId: "medheart-435701",
  storageBucket: "medheart-435701.appspot.com",
  messagingSenderId: "743108577727",
  appId: "1:743108577727:web:c214f86bcc8b27bca6f90a",
  measurementId: "G-ZFV7GCH1BT",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Instancia de Firestore para la base de datos
const auth = getAuth(app); // Instancia de Auth para la autenticación
const analytics = getAnalytics(app); // Instancia para Analytics (opcional)

export { db, auth, analytics };


