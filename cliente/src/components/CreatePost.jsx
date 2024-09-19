import React, { useState } from 'react';
import '../assets/style.css';

const CreatePost = ({ usuario, onPostCreated }) => {
  const [formData, setFormData] = useState({
    tipo: 'curso',
    cursoOCatedratico: '',
    mensaje: ''
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
      const response = await fetch('http://localhost:4001/api/publicaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, usuario })
      });
      if (response.ok) {
        onPostCreated();
      } else {
        alert('Error creando publicación');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creando publicación');
    }
  };

  return (
    <div>
      <h2>Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo:</label>
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="curso">Curso</option>
            <option value="catedratico">Catedrático</option>
          </select>
        </div>
        <div>
          <label>{formData.tipo === 'curso' ? 'Curso' : 'Catedrático'}:</label>
          <input
            type="text"
            name="cursoOCatedratico"
            value={formData.cursoOCatedratico}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CreatePost;