
import { useState } from 'react';
import { useProductos } from '../context/ProductosContext';
import ProductoCard from '../components/ProductoCard';

function Catalogo() {
  const [categoria, setCategoria] = useState('Todos');
  const { productos } = useProductos();

  const categorias = [
    'Todos',
    'Mujer',
    'Hombre',
    'Niños',
    'Calzado'
  ];

  const productosFiltrados = categoria === 'Todos'
    ? productos
    : productos.filter(
        (producto) => producto.categoria === categoria
      );

  return (
    <main className="catalogo">
      <div className="catalogo-encabezado">
        <p className="subtitulo">COMERCIAL MONCHITA'S</p>
        <h1>Nuestra colección</h1>
        <p>
          Encuentra prendas para cada ocasión.
        </p>
      </div>

      <div className="categorias-filtro">
        {categorias.map((item) => (
          <button
            key={item}
            type="button"
            className={categoria === item ? 'activo' : ''}
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="productos-grid">
        {productosFiltrados.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
          />
        ))}
      </section>
    </main>
  );
}

export default Catalogo;
