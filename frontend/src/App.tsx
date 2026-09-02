import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Dashboard from './features/home/pages/Dashboard';
import Products from './features/products/pages/Products';
import CreateProduct from './features/products/pages/CreateProduct';
import ProductDetail from './features/products/pages/ProductDetail';
import EditProduct from './features/products/pages/EditProduct';
import Categories from './features/categories/pages/Categories';
import CreateCategory from './features/categories/pages/CreateCategory';
import Suppliers from './features/suppliers/pages/Suppliers';
import CreateSupplier from './features/suppliers/pages/CreateSupplier';
import Sales from './features/sales/pages/Sales';
import CreateSale from './features/sales/pages/CreateSale';
import SaleDetail from './features/sales/pages/SaleDetail';
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
        <Route
          path="/productos/nuevo"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route
          path="/productos/:id/editar"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route path="/categorias" element={<Categories />} />
        <Route
          path="/categorias/nueva"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route path="/proveedores" element={<Suppliers />} />
        <Route
          path="/proveedores/nuevo"
          element={
            <AdminRoute>
              <CreateSupplier />
            </AdminRoute>
          }
        />
        <Route path="/ventas" element={<Sales />} />
        <Route path="/ventas/nueva" element={<CreateSale />} />
        <Route path="/ventas/:id" element={<SaleDetail />} />
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