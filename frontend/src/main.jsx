import React from 'react'; 
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext'; // ✅ Add this line
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '1039306360250-oo2p0smau55mr1uiosme0bvf3qnh0mpf.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <AdminAuthProvider> {/* ✅ Wrap App inside this */}
            <App />
          </AdminAuthProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);
