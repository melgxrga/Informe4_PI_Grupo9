import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    registroAcademico: '',
    contrasena: ''
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
      const response = await fetch('http://localhost:4001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        onLogin(true, formData.registroAcademico);
      } else {
        alert('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión Ingenieria USAC</h2>
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
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;