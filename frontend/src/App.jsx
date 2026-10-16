
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { CarritoProvider } from './context/CarritoContext';
import { ProductosProvider } from './context/ProductosContext';

import Navbar from './components/Navbar';
import Catalogo from './pages/Catalogo';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductos from './pages/AdminProductos';

function App() {
  return (
    <CarritoProvider>
      <ProductosProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={<Navigate to="/catalogo" replace />}
            />

            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/productos" element={<AdminProductos />} />
          </Routes>
        </BrowserRouter>
      </ProductosProvider>
    </CarritoProvider>
  );
}

export default App;



