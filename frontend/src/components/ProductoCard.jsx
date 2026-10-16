import { Link } from 'react-router-dom';
function ProductoCard({ producto }) {
  return (
    <article className="producto-card">
      <div className="producto-imagen">
        <img
          src={producto.imagen}
          alt={producto.nombre}
        />
      </div>

      <div className="producto-info">
        <p className="producto-categoria">
          {producto.categoria}
        </p>

        <h3>{producto.nombre}</h3>

        <p className="producto-precio">
          L. {producto.precio.toFixed(2)}
        </p>

        <Link
          to={`/producto/${producto.id}`}
          className="producto-boton"
         >
         Ver producto
        </Link>
      </div>
    </article>
  );
}

export default ProductoCard;
