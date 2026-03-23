import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LoginPage } from './pages/login';
import Dashboard from './pages/clinic_dashboard';
import ClinicDetailsAdmin from './pages/clinic_settings';
import { LoginApi } from './services/api_call';




function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await LoginApi(username, password);
    
    if (result) {
        // Success! Navigate to dashboard
        navigate('/dashboard');
    } else {
        // Show an error message to the user
        alert("Please check your username and password.");
    }
};

  return (
    <Routes>
      {/* Route for the Login Page */}
      <Route 
        path="/" 
        element={
          <LoginPage 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            handleSubmit={handleSubmit} 
          />
        } 
      />

      {/* Route for the Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* 2. New Route for Clinic Settings */}
      <Route path="/clinic-settings" element={<ClinicDetailsAdmin />} />
    </Routes>
  );
}

export default App;
