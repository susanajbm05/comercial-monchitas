
import { Link } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';

function AdminDashboard() {
  const totalProductos = productos.length;
  const totalCategorias = new Set(
    productos.map((producto) => producto.categoria)
  ).size;
  const { productos } = useProductos();

  return (
    <main className="admin-dashboard">
      <div className="admin-encabezado">
        <div>
          <p className="admin-etiqueta">COMERCIAL MONCHITA'S</p>
          <h1>Panel de administración</h1>
          <p>Consulta y organiza la información de la tienda.</p>
        </div>

        <Link to="/catalogo" className="admin-volver">
          Ver tienda →
        </Link>
      </div>

      <section className="admin-estadisticas">
        <article className="admin-tarjeta">
          <span>Productos registrados</span>
          <h2>{totalProductos}</h2>
          <p>Productos de ejemplo</p>
        </article>

        <article className="admin-tarjeta">
          <span>Categorías</span>
          <h2>{totalCategorias}</h2>
          <p>Categorías disponibles</p>
        </article>

        <article className="admin-tarjeta">
          <span>Pedidos</span>
          <h2>—</h2>
          <p>Pendiente de integración</p>
        </article>
      </section>

      <section className="admin-secciones">
        <h2>Administración de la tienda</h2>

        <div className="admin-opciones">
          <article className="admin-opcion">
            <span className="admin-icono">01</span>
            <h3>Productos</h3>
            <p>
              Agrega, consulta y modifica los productos
              que ofrece la tienda.
            </p>
            <Link to="/admin/productos" className="admin-volver">
              Administrar productos →
            </Link>
          </article>

          <article className="admin-opcion">
            <span className="admin-icono">02</span>
            <h3>Inventario</h3>
            <p>
              Revisa las existencias de los productos
              y sus tallas disponibles.
            </p>
            <span>Próximamente →</span>
          </article>

          <article className="admin-opcion">
            <span className="admin-icono">03</span>
            <h3>Pedidos</h3>
            <p>
              Consulta los pedidos realizados y revisa
              el estado de cada uno.
            </p>
            <span>Próximamente →</span>
          </article>
        </div>
      </section>

      <section className="admin-listado">
        <div className="admin-listado-titulo">
          <h2>Productos del catálogo</h2>
          <span>Vista de prueba</span>
        </div>

        <div className="admin-tabla-contenedor">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>L. {producto.precio.toFixed(2)}</td>
                  <td>
                    {producto.disponible
                      ? 'Disponible'
                      : 'No disponible'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
