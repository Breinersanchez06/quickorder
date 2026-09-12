import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { Product } from './components/Product';
import { Footer } from './components/Footer';

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState("Inicio");
  const [cartCount, setCartCount] = useState(0);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://6a9439890e895b145e5f552f.mockapi.io/producto')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        setCargando(false);
      });
  }, []);

  const productosFiltrados = categoriaActiva === "Inicio" 
    ? productos 
    : productos.filter(p => p.categoria.toLowerCase() === categoriaActiva.toLowerCase());

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="app-layout">
      <Header 
        categoriaActiva={categoriaActiva} 
        onSelectCategoria={setCategoriaActiva}
        cartCount={cartCount}
      />
      
      <main className="app-container">
        {/* Banner Section */}
        <Banner />

        {/* Section Header */}
        <section className="catalog-header">
          <div>
            <h2 className="catalog-title">
              {categoriaActiva === "Inicio" ? "Todos los Productos" : categoriaActiva}
            </h2>
            <p className="catalog-count">{productosFiltrados.length} producto(s) disponibles</p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="product-grid">
          {cargando ? (
            <p className="loading-text">Cargando productos...</p>
          ) : (
            productosFiltrados.map((producto) => (
              <Product
                key={producto.id}
                indice={producto.id}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen}
                tag={producto.tag}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </section>
      </main>

      {/* Footer integrado directamente en App.jsx */}
      <Footer setCategoriaActiva={setCategoriaActiva}/>
    </div>
  );
}

export default App;