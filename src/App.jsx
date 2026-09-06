import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Product } from './components/Product';

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState("Inicio");
  const [cartCount, setCartCount] = useState(0);

  const productos = [
    {
      id: 1,
      nombre: "Hamburguesa Doble",
      categoria: "Hamburguesas",
      descripcion: "Hamburguesa Doble Carne con queso cheddar, pepinillos y tocineta crocante",
      precio: "20.000",
      tag: "Más Vendido",
      imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      nombre: "Papas Criollas",
      categoria: "Salchipapas",
      descripcion: "Papas criollas crujientes sazonadas con sal marina y especias de la casa",
      precio: "10.000",
      tag: "Popular",
      imagen: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      nombre: "Bebida Refrescante",
      categoria: "Bebidas",
      descripcion: "Limonada natural recién exprimida con menta y mucho hielo",
      precio: "2.000",
      tag: "Refrescante",
      imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      nombre: "Perro Caliente",
      categoria: "Perros Calientes",
      descripcion: "Perro Caliente especial con salchicha premium, papitas fósforo y salsas",
      precio: "5.000",
      tag: "Clásico",
      imagen: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&auto=format&fit=crop&q=80"
    }
  ];

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
        <section className="hero-banner">
          <div className="banner-badge">🔥 Menú Rápido & Delicioso</div>
          <h1 className="banner-title">Pide tus Platillos Favoritos al Instante</h1>
          <p className="banner-subtitle">
            Explora nuestro menú seleccionado, ingredientes frescos y entrega rápida a tu mesa o domicilio.
          </p>
        </section>

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
          {productosFiltrados.map((producto) => (
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
          ))}
        </section>
      </main>

      {/* Footer integrado directamente en App.jsx */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-brand-section">
            <div className="footer-brand">
              <span className="brand-logo">⚡</span>
              <span className="brand-name">Quick<span className="brand-highlight">Order</span></span>
            </div>
            <p className="footer-description">
              Tu comida favorita lista para ordenar de forma rápida, fresca y sin complicaciones.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-column">
              <h4 className="footer-heading">Categorías</h4>
              <ul className="footer-list">
                <li><button onClick={() => setCategoriaActiva("Hamburguesas")}>Hamburguesas</button></li>
                <li><button onClick={() => setCategoriaActiva("Salchipapas")}>Salchipapas</button></li>
                <li><button onClick={() => setCategoriaActiva("Perros Calientes")}>Perros Calientes</button></li>
                <li><button onClick={() => setCategoriaActiva("Bebidas")}>Bebidas</button></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Contacto & Horarios</h4>
              <p className="footer-info">📍 Av. Principal #123, Ciudad</p>
              <p className="footer-info">🕒 Lunes a Domingo: 11:00 AM - 10:00 PM</p>
              <p className="footer-info">📞 +57 300 000 0000</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} QuickOrder. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;



