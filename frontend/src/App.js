import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Login = lazy(() => import("./views/auth/Login"));
const ProductList = lazy(() => import("./views/products/ProductList"));
const CustomerProfile = lazy(() => import("./views/customers/CustomerProfile"));

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Ecommerce
          </Typography>
          <Button color="inherit" component={Link} to="/products">Productos</Button>
          <Button color="inherit" component={Link} to="/profile">Perfil</Button>
          <Button color="inherit" onClick={handleLogout}>Salir</Button>
        </Toolbar>
      </AppBar>

      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><CustomerProfile /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
