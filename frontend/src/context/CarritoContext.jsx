
import { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('carritoMonchitas')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('carritoMonchitas', JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto, talla, cantidad) {
    setCarrito((anterior) => {
      const existente = anterior.find(
        (item) => item.id === producto.id && item.talla === talla
      );

      if (existente) {
        return anterior.map((item) =>
          item.id === producto.id && item.talla === talla
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [...anterior, { ...producto, talla, cantidad }];
    });
  }

  function eliminarDelCarrito(id, talla) {
    setCarrito((anterior) =>
      anterior.filter(
        (item) => !(item.id === id && item.talla === talla)
      )
    );
  }

  function cambiarCantidad(id, talla, cantidad) {
    if (cantidad < 1) return;

    setCarrito((anterior) =>
      anterior.map((item) =>
        item.id === id && item.talla === talla
          ? { ...item, cantidad }
          : item
      )
    );
  }

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        total
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
