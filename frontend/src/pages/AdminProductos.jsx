
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';

const formularioVacio = {
  nombre: '',
  categoria: 'Mujer',
  precio: '',
  tallas: '',
  imagen: ''
};

function AdminProductos() {
  const { productos: listaProductos, setProductos } = useProductos();

  const [formulario, setFormulario] = useState(formularioVacio);
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Actualizar la lista de productos
  function guardarLista(lista) {
    setProductos(lista);
  }

  // Guardar los cambios que se escriben en el formulario
  function manejarCambio(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  }

  // Agregar o editar un producto
  function guardarProducto(e) {
    e.preventDefault();

    const nombre = formulario.nombre.trim();
    const precio = Number(formulario.precio);

    const tallas = formulario.tallas
      .split(',')
      .map((talla) => talla.trim())
      .filter(Boolean);

    if (!nombre || !Number.isFinite(precio) || precio <= 0) {
      alert('Ingresa un nombre y un precio válido.');
      return;
    }

    if (tallas.length === 0) {
      alert('Ingresa al menos una talla.');
      return;
    }

    const datos = {
      nombre,
      categoria: formulario.categoria,
      precio,
      tallas,
      imagen:
        formulario.imagen.trim() ||
        'https://placehold.co/400x500?text=Producto',
      disponible: true
    };

    if (editando !== null) {
      // Modificar un producto existente
      guardarLista(
        listaProductos.map((producto) =>
          producto.id === editando
            ? { ...producto, ...datos }
            : producto
        )
      );
    } else {
      // Registrar un producto nuevo
      const nuevoId =
        Math.max(0, ...listaProductos.map((producto) => producto.id)) + 1;

      const nuevoProducto = {
        id: nuevoId,
        ...datos
      };

      guardarLista([...listaProductos, nuevoProducto]);
    }

    cancelarFormulario();
  }

  // Cargar los datos del producto que vamos a editar
  function editarProducto(producto) {
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: String(producto.precio),
      tallas: producto.tallas.join(', '),
      imagen: producto.imagen
    });

    setEditando(producto.id);
    setMostrarFormulario(true);
  }

  // Eliminar un producto
  function eliminarProducto(id) {
    const confirmar = window.confirm(
      '¿Estás segura de que deseas eliminar este producto?'
    );

    if (!confirmar) {
      return;
    }

    guardarLista(
      listaProductos.filter((producto) => producto.id !== id)
    );
  }

  // Limpiar y cerrar el formulario
  function cancelarFormulario() {
    setFormulario(formularioVacio);
    setEditando(null);
    setMostrarFormulario(false);
  }

  return (
    <main className="admin-productos">
      <Link to="/admin" className="volver">
        ← Volver al panel
      </Link>

      {/* Encabezado */}
      <div className="admin-productos-encabezado">
        <div>
          <p className="admin-etiqueta">ÁREA DE EMPRESA</p>
          <h1>Administración de productos</h1>
          <p>Consulta y organiza los productos de la tienda.</p>
        </div>

        <button
          type="button"
          className="btn-nuevo-producto"
          onClick={() => {
            cancelarFormulario();
            setMostrarFormulario(true);
          }}
        >
          + Agregar producto
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <form
          className="formulario-producto"
          onSubmit={guardarProducto}
        >
          <h2>
            {editando !== null
              ? 'Editar producto'
              : 'Nuevo producto'}
          </h2>

          <div className="formulario-grid">
            <label>
              Nombre del producto
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Ej. Blusa casual"
                required
              />
            </label>

            <label>
              Categoría
              <select
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
              >
                <option value="Mujer">Mujer</option>
                <option value="Hombre">Hombre</option>
                <option value="Niños">Niños</option>
                <option value="Calzado">Calzado</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </label>

            <label>
              Precio (L.)
              <input
                type="number"
                name="precio"
                min="0.01"
                step="0.01"
                value={formulario.precio}
                onChange={manejarCambio}
                placeholder="Ej. 350"
                required
              />
            </label>

            <label>
              Tallas disponibles
              <input
                type="text"
                name="tallas"
                value={formulario.tallas}
                onChange={manejarCambio}
                placeholder="S, M, L, XL"
                required
              />
            </label>

            <label className="campo-ancho">
              URL de la imagen
              <input
                type="url"
                name="imagen"
                value={formulario.imagen}
                onChange={manejarCambio}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </label>
          </div>

          <div className="formulario-acciones">
            <button type="submit" className="btn-guardar">
              {editando !== null
                ? 'Guardar cambios'
                : 'Guardar producto'}
            </button>

            <button
              type="button"
              className="btn-cancelar"
              onClick={cancelarFormulario}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Tabla de productos */}
      <div className="admin-tabla-contenedor">
        <table className="admin-tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {listaProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>

                <td>{producto.categoria}</td>

                <td>L. {producto.precio.toFixed(2)}</td>

                <td>
                  <div className="acciones-producto">
                    <button
                      type="button"
                      onClick={() => editarProducto(producto)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {listaProductos.length === 0 && (
              <tr>
                <td colSpan={4}>
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AdminProductos;

