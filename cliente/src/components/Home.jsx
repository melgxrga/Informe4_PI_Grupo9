import React, { useState, useEffect } from 'react';
import '../assets/style.css';
import Comentarios from './Comentarios';

const Home = ({ onCreatePost, onViewProfile }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filters, setFilters] = useState({
    curso: '',
    catedratico: '',
    nombreCurso: '',
    nombreCatedratico: ''
  });
  const [searchRegistro, setSearchRegistro] = useState('');

  useEffect(() => {
    fetchPublicaciones();
  }, [filters]);

  const fetchPublicaciones = async () => {
    const query = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(`http://localhost:4001/api/publicaciones?${query}`);
      const data = await response.json();
      setPublicaciones(data);
    } catch (error) {
      console.error('Error obteniendo publicaciones:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearchChange = (e) => {
    setSearchRegistro(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onViewProfile(searchRegistro);
  };

  return (
    <div>
      <h2>Pantalla Inicial</h2>
      <div>
        <label>Filtrar por Curso:</label>
        <input type="text" name="curso" value={filters.curso} onChange={handleChange} />
      </div>
      <div>
        <label>Filtrar por Catedrático:</label>
        <input type="text" name="catedratico" value={filters.catedratico} onChange={handleChange} />
      </div>
      <div>
        <label>Filtrar por Nombre de Curso:</label>
        <input type="text" name="nombreCurso" value={filters.nombreCurso} onChange={handleChange} />
      </div>
      <div>
        <label>Filtrar por Nombre de Catedrático:</label>
        <input type="text" name="nombreCatedratico" value={filters.nombreCatedratico} onChange={handleChange} />
      </div>
      <button onClick={onCreatePost}>Crear Publicación</button>
      <form onSubmit={handleSearchSubmit}>
        <label>Buscar Usuario por Registro Académico:</label>
        <input type="text" value={searchRegistro} onChange={handleSearchChange} />
        <button type="submit">Buscar</button>
      </form>
      <div>
        <h3>Publicaciones</h3>
        {publicaciones.map((publicacion) => (
          <div key={publicacion.id}>
            <h4>{publicacion.titulo}</h4>
            <p>{publicacion.contenido}</p>
            <p><strong>Curso:</strong> {publicacion.curso}</p>
            <p><strong>Catedrático:</strong> {publicacion.catedratico}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(publicacion.fechaCreacion).toLocaleString()}</p>
            <Comentarios publicacionId={publicacion.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;