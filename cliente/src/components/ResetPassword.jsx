import React, { useState } from 'react';
import '../assets/style.css';

const ResetPassword = ({ onReset }) => {
  const [formData, setFormData] = useState({
    registroAcademico: '',
    correoElectronico: '',
    nuevaContrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4001/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        onReset(true);
      } else {
        alert('Error al restablecer la contraseña');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al restablecer la contraseña');
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Registro Académico:</label>
          <input
            type="text"
            name="registroAcademico"
            value={formData.registroAcademico}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            name="nuevaContrasena"
            value={formData.nuevaContrasena}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Restablecer</button>
      </form>
    </div>
  );
};

export default ResetPassword;