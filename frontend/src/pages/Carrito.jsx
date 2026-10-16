
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    cambiarCantidad,
    total
  } = useCarrito();

  return (
    <main className="carrito-pagina">
      <Link to="/catalogo" className="volver">
        ← Seguir comprando
      </Link>

      <h1>Mi carrito</h1>
      <p className="carrito-subtitulo">
        Revisa los productos que has seleccionado.
      </p>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <h2>Tu carrito está vacío</h2>
          <p>Todavía no has agregado ningún producto.</p>
          <Link to="/catalogo" className="carrito-enlace">
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="carrito-contenido">
          <section className="carrito-productos">
            {carrito.map((producto) => (
              <article
                className="carrito-item"
                key={`${producto.id}-${producto.talla}`}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                />

                <div className="carrito-item-info">
                  <h3>{producto.nombre}</h3>
                  <p>Talla: {producto.talla}</p>
                  <p>L. {producto.precio.toFixed(2)}</p>

                  <div className="carrito-cantidad">
                    <button
                      type="button"
                      disabled={producto.cantidad <= 1}
                      onClick={() =>
                        cambiarCantidad(
                          producto.id,
                          producto.talla,
                          producto.cantidad - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span>{producto.cantidad}</span>

                    <button
                      type="button"
                      onClick={() =>
                        cambiarCantidad(
                          producto.id,
                          producto.talla,
                          producto.cantidad + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="eliminar-producto"
                    onClick={() =>
                      eliminarDelCarrito(
                        producto.id,
                        producto.talla
                      )
                    }
                  >
                    Eliminar
                  </button>
                </div>

                <strong>
                  L. {(producto.precio * producto.cantidad).toFixed(2)}
                </strong>
              </article>
            ))}
          </section>

          <aside className="carrito-resumen">
            <h2>Resumen del pedido</h2>

            <div className="resumen-linea">
              <span>Subtotal</span>
              <span>L. {total.toFixed(2)}</span>
            </div>

            <div className="resumen-linea resumen-total">
              <strong>Total</strong>
              <strong>L. {total.toFixed(2)}</strong>
            </div>

            <p>
              El costo de envío, si corresponde,
              se calculará al confirmar el pedido.
            </p>

            <button
              type="button"
              className="finalizar-compra"
              disabled
            >
              Finalizar pedido (próximamente)
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Carrito;
