import React, { useState, useEffect } from 'react';

const UserProfile = ({ registroAcademico, isEditable }) => {
  const [profile, setProfile] = useState({
    registroAcademico: '',
    nombres: '',
    apellidos: '',
    email: ''
  });
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState({ curso: '', creditos: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchCursos();
  }, [registroAcademico]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/usuarios/${registroAcademico}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error obteniendo perfil de usuario:', error);
    }
  };

  const fetchCursos = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/usuarios/${registroAcademico}/cursos`);
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error('Error obteniendo cursos aprobados:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleCursoChange = (e) => {
    const { name, value } = e.target;
    setNuevoCurso({
      ...nuevoCurso,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4001/api/usuarios/${registroAcademico}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });
      if (response.ok) {
        setIsEditing(false);
        fetchProfile();
      } else {
        alert('Error actualizando perfil');
      }
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      alert('Error actualizando perfil');
    }
  };

  const handleCursoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4001/api/usuarios/${registroAcademico}/cursos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCurso)
      });
      if (response.ok) {
        fetchCursos();
        setNuevoCurso({ curso: '', creditos: '' });
      } else {
        alert('Error agregando curso aprobado');
      }
    } catch (error) {
      console.error('Error agregando curso aprobado:', error);
      alert('Error agregando curso aprobado');
    }
  };

  const totalCreditos = cursos.reduce((total, curso) => total + curso.creditos, 0);

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      {isEditable && !isEditing && <button onClick={() => setIsEditing(true)}>Editar Perfil</button>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Registro Académico:</label>
          <input type="text" name="registroAcademico" value={profile.registroAcademico} readOnly />
        </div>
        <div>
          <label>Nombres:</label>
          <input type="text" name="nombres" value={profile.nombres} onChange={handleChange} readOnly={!isEditing} />
        </div>
        <div>
          <label>Apellidos:</label>
          <input type="text" name="apellidos" value={profile.apellidos} onChange={handleChange} readOnly={!isEditing} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} readOnly={!isEditing} />
        </div>
        {isEditing && <button type="submit">Guardar Cambios</button>}
      </form>
      <h3>Cursos Aprobados</h3>
      <ul>
        {cursos.map((curso, index) => (
          <li key={index}>{curso.curso} - {curso.creditos} créditos</li>
        ))}
      </ul>
      <p>Total de Créditos: {totalCreditos}</p>
      {isEditable && (
        <form onSubmit={handleCursoSubmit}>
          <div>
            <label>Curso:</label>
            <input type="text" name="curso" value={nuevoCurso.curso} onChange={handleCursoChange} />
          </div>
          <div>
            <label>Créditos:</label>
            <input type="number" name="creditos" value={nuevoCurso.creditos} onChange={handleCursoChange} />
          </div>
          <button type="submit">Agregar Curso</button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;