
import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import { productos as productosIniciales } from '../data/productos';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('productosMonchitas');

      return guardados !== null
        ? JSON.parse(guardados)
        : productosIniciales;
    } catch {
      return productosIniciales;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      'productosMonchitas',
      JSON.stringify(productos)
    );
  }, [productos]);

  return (
    <ProductosContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const context = useContext(ProductosContext);

  if (!context) {
    throw new Error('useProductos debe utilizarse dentro de ProductosProvider');
  }

  return context;
}
