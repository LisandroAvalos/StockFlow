import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Dashboard from './features/home/pages/Dashboard';
import Products from './features/products/pages/Products';
import Sales from './features/sales/pages/Sales';
import Reports from './features/reports/pages/Reports';
import Users from './features/admin/pages/Users';
import Layout from './layout/Layout';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/ventas" element={<Sales />} />
        <Route path="/reportes" element={<Reports />} />
        <Route
          path="/usuarios"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;