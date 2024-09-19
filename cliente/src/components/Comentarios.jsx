import React, { useState, useEffect } from 'react';

const Comentarios = ({ publicacionId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetchComentarios();
  }, []);

  const fetchComentarios = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/comentarios/${publicacionId}`);
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error('Error obteniendo comentarios:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4001/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicacionId, usuario: 'usuarioActual', mensaje }) // Reemplaza 'usuarioActual' con el usuario logueado
      });
      if (response.ok) {
        fetchComentarios();
        setMensaje('');
      } else {
        alert('Error creando comentario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creando comentario');
    }
  };

  return (
    <div>
      <h5>Comentarios</h5>
      {comentarios.map((comentario) => (
        <div key={comentario.id}>
          <p><strong>{comentario.usuario}:</strong> {comentario.mensaje}</p>
          <p><small>{new Date(comentario.fechaCreacion).toLocaleString()}</small></p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        <button type="submit">Comentar</button>
      </form>
    </div>
  );
};

export default Comentarios;