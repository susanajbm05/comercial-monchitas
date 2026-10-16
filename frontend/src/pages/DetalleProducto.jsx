
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

function DetalleProducto() {
  const { productos } = useProductos();
  const { id } = useParams();

  const producto = productos.find(
    (item) => item.id === Number(id)
  );

  const [talla, setTalla] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCarrito();

  if (!producto) {
    return (
      <main className="detalle">
        <h2>Producto no encontrado</h2>
        <Link to="/catalogo">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main className="detalle">
      <Link to="/catalogo" className="volver">
        ← Volver al catálogo
      </Link>

      <div className="detalle-contenido">
        <div className="detalle-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <p className="producto-categoria">
            {producto.categoria}
          </p>

          <h1>{producto.nombre}</h1>

          <h2>L. {producto.precio.toFixed(2)}</h2>

          <p>
            Conoce los detalles de esta prenda
            y selecciona la talla que necesitas.
          </p>

          <h3>Selecciona tu talla</h3>

          <div className="tallas">
            {producto.tallas.map((opcion) => (
              <button
                key={opcion}
                type="button"
                className={talla === opcion ? 'seleccionada' : ''}
                onClick={() => setTalla(opcion)}
              >
                {opcion}
              </button>
            ))}
          </div>

          <h3>Cantidad</h3>

          <div className="cantidad">
            <button
              type="button"
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            >
              -
            </button>

            <span>{cantidad}</span>

            <button
              type="button"
              onClick={() => setCantidad(cantidad + 1)}
            >
              +
            </button>
          </div>

           <button
              type="button"
              className="agregar-carrito"
               onClick={() => {
              if (!talla) {
                alert('Selecciona una talla');
                return;
              }

             agregarAlCarrito(producto, talla, cantidad);
             alert('Producto agregado al carrito correctamente');
             }}
             >
               Agregar al carrito
           </button>

        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
