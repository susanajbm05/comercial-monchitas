
import { Link, NavLink } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import logo from '../assets/logo.jpeg';


function Navbar() {
  const { carrito } = useCarrito();

  const cantidad = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  return (
    <header className="navbar">
      <Link to="/catalogo" className="navbar-logo">
         <img src={logo} alt="Comercial Monchita's" />
      </Link>

      <nav className="navbar-links">
        <NavLink to="/catalogo">
          Catálogo
        </NavLink>

        <NavLink to="/carrito" className="navbar-carrito">
          🛍️ Carrito ({cantidad})
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
