import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormularioDiagnostico.css';
import { useNavigate } from 'react-router-dom';


const FormularioDiagnostico = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    edad: '',
    sexo: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validaciones de los datos
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido.';
    if (!formData.rut) newErrors.rut = 'El RUT es requerido.';
    if (formData.edad < 0 || formData.edad > 120) newErrors.edad = 'La edad debe estar entre 0 y 120.';
    if (formData.trestbps < 80 || formData.trestbps > 200) newErrors.trestbps = 'La presión arterial debe estar entre 80 y 200.';
    if (formData.chol < 100 || formData.chol > 600) newErrors.chol = 'El colesterol debe estar entre 100 y 600.';
    if (!formData.cp) newErrors.cp = 'El tipo de dolor en el pecho es requerido.';
    if (!formData.fbs) newErrors.fbs = 'El nivel de azúcar en sangre es requerido.';
    if (!formData.restecg) newErrors.restecg = 'El resultado del electrocardiograma es requerido.';
    if (formData.thalach < 60 || formData.thalach > 202) newErrors.thalach = 'La frecuencia cardíaca máxima debe estar entre 60 y 202.';
    if (!formData.exang) newErrors.exang = 'Indique si hay angina inducida por ejercicio.';
    if (formData.oldpeak < 0 || formData.oldpeak > 6.2) newErrors.oldpeak = 'La depresión ST debe estar entre 0 y 6.2.';
    if (!formData.slope) newErrors.slope = 'La pendiente del segmento ST es requerida.';
    if (!formData.ca) newErrors.ca = 'El número de vasos coloreados es requerido.';
    if (!formData.thal) newErrors.thal = 'El tipo de talasemia es requerido.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar datos al backend y obtener el resultado
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    fetch('http://34.28.35.110:5001/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        age: Number(formData.edad),
        sex: Number(formData.sexo),
        cp: Number(formData.cp),
        trestbps: Number(formData.trestbps),
        chol: Number(formData.chol),
        fbs: Number(formData.fbs),
        restecg: Number(formData.restecg),
        thalach: Number(formData.thalach),
        exang: Number(formData.exang),
        oldpeak: Number(formData.oldpeak),
        slope: Number(formData.slope),
        ca: Number(formData.ca),
        thal: Number(formData.thal)
      })      
    })
    .then(response => response.json())
    .then(data => {
      setLoading(false);
      setResult(data.prediction);
      console.log(data); // Para verificar la respuesta completa.
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
    
  };

  // Descargar el resultado como PDF con formato de informe médico
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Agregar el título
    doc.setFontSize(18);
    doc.text('Diagnóstico MedHeart', 70, 20);

    // Información del paciente
    doc.setFontSize(14);
    doc.text(`Paciente: ${formData.nombre}`, 20, 60);
    doc.text(`RUT: ${formData.rut}`, 20, 70);
    doc.text(`Edad: ${formData.edad} años`, 20, 80);
    doc.text(`Sexo: ${formData.sexo === '1' ? 'Masculino' : 'Femenino'}`, 20, 90);

    // Resultados
    doc.setFontSize(16);
    doc.text('Resultados del Diagnóstico:', 20, 110);
    doc.setFontSize(12);
    doc.text(`${result === 1 ? 'Alta probabilidad de enfermedad cardíaca detectada.' : 'Baja probabilidad de enfermedad cardíaca.'}`, 20, 120);
    doc.text('Se recomienda realizar un estudio cardiovascular detallado para confirmar el diagnóstico.', 20, 130);

    // Indicadores clínicos
    doc.setFontSize(16);
    doc.text('Indicadores Clínicos:', 20, 150);
    doc.setFontSize(12);
    doc.text(`Presión Arterial en Reposo: ${formData.trestbps} mm Hg`, 20, 160);
    doc.text(`Colesterol: ${formData.chol} mg/dl`, 20, 170);
    doc.text(`Frecuencia Cardíaca Máxima: ${formData.thalach} lpm`, 20, 180);
    doc.text(`Angina inducida por ejercicio: ${formData.exang === '1' ? 'Sí' : 'No'}`, 20, 190);

    // Información del médico
    doc.setFontSize(16);
    doc.text('Médico tratante:', 20, 210);
    doc.setFontSize(12);
    doc.text('Dr. Juan Pablo González', 20, 220);
    doc.text('Medicina y Salud - Cardiología y Ecocardiografía', 20, 230);
    doc.text('www.juanpablogonzalez.cl', 20, 240);
    doc.text('+56 9 74996662', 20, 250);

    // Guardar el PDF
    doc.save(`informe_diagnostico_${formData.nombre}.pdf`);
  };

  return (
    <div style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/img/fotoDiag.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="form-container">
        <h2>Formulario de Diagnóstico Cardíaco</h2>
        <form onSubmit={handleSubmit} className="diagnostico-form">
          <label>Nombre del Paciente</label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            className={errors.nombre ? 'input-error' : ''} 
            required 
          />
          {errors.nombre && <p className="error">{errors.nombre}</p>}

          <label>RUT</label>
          <input 
            type="text" 
            name="rut" 
            value={formData.rut} 
            onChange={handleChange} 
            className={errors.rut ? 'input-error' : ''} 
            required 
          />
          {errors.rut && <p className="error">{errors.rut}</p>}

          <label>Edad</label>
          <input 
            type="number" 
            name="edad" 
            value={formData.edad} 
            onChange={handleChange} 
            min="0" 
            max="120" 
            className={errors.edad ? 'input-error' : ''} 
            required 
          />
          {errors.edad && <p className="error">{errors.edad}</p>}

          <label>Sexo</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="1">Masculino</option>
            <option value="0">Femenino</option>
          </select>

          <label>Tipo de dolor en el pecho (cp)</label>
          <select name="cp" value={formData.cp} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="0">Angina típica</option>
            <option value="1">Angina atípica</option>
            <option value="2">Dolor no anginoso</option>
            <option value="3">Asintomático</option>
          </select>

          <label>Presión Arterial en Reposo (trestbps)</label>
          <input 
            type="number" 
            name="trestbps" 
            value={formData.trestbps} 
            onChange={handleChange} 
            min="80" 
            max="200" 
            className={errors.trestbps ? 'input-error' : ''} 
            required 
          />
          {errors.trestbps && <p className="error">{errors.trestbps}</p>}

          <label>Colesterol (chol)</label>
          <input 
            type="number" 
            name="chol" 
            value={formData.chol} 
            onChange={handleChange} 
            min="100" 
            max="600" 
            className={errors.chol ? 'input-error' : ''} 
            required 
          />
          {errors.chol && <p className="error">{errors.chol}</p>}

          <label>Azúcar en sangre en ayunas (fbs)</label>
          <select name="fbs" value={formData.fbs} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="0">Menos de 120 mg/dl</option>
            <option value="1">Más de 120 mg/dl</option>
          </select>

          <label>Resultado del electrocardiograma en reposo (restecg)</label>
          <select name="restecg" value={formData.restecg} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="0">Normal</option>
            <option value="1">Anormalidad de onda ST-T</option>
            <option value="2">Hipertrofia ventricular izquierda</option>
          </select>

          <label>Frecuencia cardíaca máxima (thalach)</label>
          <input 
            type="number" 
            name="thalach" 
            value={formData.thalach} 
            onChange={handleChange} 
            min="60" 
            max="202" 
            required 
          />
          {errors.thalach && <p className="error">{errors.thalach}</p>}

          <label>Angina inducida por ejercicio (exang)</label>
          <select name="exang" value={formData.exang} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>

          <label>Depresión ST inducida por ejercicio (oldpeak)</label>
          <input 
            type="number" 
            name="oldpeak" 
            value={formData.oldpeak} 
            onChange={handleChange} 
            min="0" 
            max="6.2" 
            required 
          />
          {errors.oldpeak && <p className="error">{errors.oldpeak}</p>}

          <label>Pendiente de la cima del segmento ST (slope)</label>
          <select name="slope" value={formData.slope} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="0">Pendiente descendente</option>
            <option value="1">Pendiente plana</option>
            <option value="2">Pendiente ascendente</option>
          </select>

          <label>Número de vasos principales coloreados (ca)</label>
          <input 
            type="number" 
            name="ca" 
            value={formData.ca} 
            onChange={handleChange} 
            min="0" 
            max="3" 
            required 
          />
          {errors.ca && <p className="error">{errors.ca}</p>}

          <label>Tipo de talasemia (thal)</label>
          <select name="thal" value={formData.thal} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="0">Normal</option>
            <option value="1">Defecto fijo</option>
            <option value="2">Defecto reversible</option>
          </select>

          <button type="submit" className="submit-btn">Enviar</button>
        </form>

        {loading && <p>Cargando resultado...</p>}
        {result !== null && (
       <div className="diagnostic-result-container">
       <h3 className="diagnostic-title">
         <i className="fas fa-heartbeat"></i> Resultado del Diagnóstico
       </h3>
       <div className={`diagnostic-content ${result === 1 ? 'fade-in-high' : 'fade-in-low'}`}>
         {result === 1 ? (
           <div className="high-probability">
             <p className="diagnostic-message">
               <strong>Alta probabilidad de enfermedad cardíaca</strong>. Los factores clínicos proporcionados sugieren que el paciente <strong>{formData.nombre}</strong>, de <strong>{formData.edad}</strong> años, con una presión arterial en reposo de <strong>{formData.trestbps}</strong> mm Hg y un nivel de colesterol de <strong>{formData.chol}</strong> mg/dl, presenta indicios de posibles complicaciones cardíacas.
             </p>
             <p>
               La presencia de {formData.exang === '1' ? 'angina inducida por ejercicio' : 'ausencia de angina inducida por ejercicio'} y una frecuencia cardíaca máxima de <strong>{formData.thalach}</strong> lpm son factores importantes a considerar en este diagnóstico. Se recomienda una evaluación médica más detallada y un seguimiento con un especialista en cardiología.
             </p>
           </div>
         ) : (
           <div className="low-probability">
             <p className="diagnostic-message">
               <strong>Baja probabilidad de enfermedad cardíaca</strong>. Según los datos ingresados, el paciente <strong>{formData.nombre}</strong>, de <strong>{formData.edad}</strong> años, con una presión arterial en reposo de <strong>{formData.trestbps}</strong> mm Hg y un nivel de colesterol de <strong>{formData.chol}</strong> mg/dl, no presenta indicadores significativos de una condición cardíaca grave en este momento.
             </p>
             <p>
               No obstante, se sugiere continuar con controles médicos regulares y mantener un estilo de vida saludable para prevenir futuros riesgos.
             </p>
           </div>
         )}
         <p className="project-info">
           Este diagnóstico es parte del proyecto <strong>MedHeart</strong>, un sistema diseñado para ayudar en la identificación temprana de posibles enfermedades cardíacas a través del análisis de síntomas y factores clínicos.
         </p>
       </div>
       <button onClick={downloadPDF} className="modern-download-btn">
         <i className="fas fa-file-download"></i> Descargar Resultado en PDF
       </button>
     </div>
     
     
    )}

    <button className="back-button" onClick={() => navigate('/home')}>Volver al Inicio</button>
      </div>
     </div>
  );
};

export default FormularioDiagnostico;


