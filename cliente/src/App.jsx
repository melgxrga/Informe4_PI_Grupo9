import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [profileRegistro, setProfileRegistro] = useState('');
  const [usuario, setUsuario] = useState('');

  const handleLogin = (status, usuario) => {
    setIsAuthenticated(status);
    setUsuario(usuario);
  };

  const handleRegister = (status) => {
    setIsRegistering(false);
  };

  const handleResetPassword = (status) => {
    setIsResettingPassword(false);
  };

  const handlePostCreated = () => {
    setIsCreatingPost(false);
  };

  const handleViewProfile = (registro) => {
    setProfileRegistro(registro);
    setViewingProfile(true);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        isCreatingPost ? (
          <CreatePost usuario={usuario} onPostCreated={handlePostCreated} />
        ) : viewingProfile ? (
          <UserProfile registroAcademico={profileRegistro} isEditable={profileRegistro === usuario} />
        ) : (
          <Home onCreatePost={() => setIsCreatingPost(true)} onViewProfile={handleViewProfile} />
        )
      ) : isRegistering ? (
        <Register onRegister={handleRegister} />
      ) : isResettingPassword ? (
        <ResetPassword onReset={handleResetPassword} />
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <div>
            <button onClick={() => setIsRegistering(true)}>Registrarse</button>
            <button style={{marginTop:'20px'}} onClick={() => setIsResettingPassword(true)}>¿Olvidó su contraseña?</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;