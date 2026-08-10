import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Dashboard from './features/home/pages/Dashboard';
import Usuarios from './features/admin/pages/Usuarios';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <AdminRoute>
            <Usuarios />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;