import { Banner } from '../components/layout/Banner';
import { Product } from '../components/layout/Product';

export function CatalogoPage({ productos = [], categoriaActiva, onAddToCart, cargando }) {
  const productosVisibles = productos.filter(
    (p) => p.estado === undefined || p.estado === true || p.estado === 'true' || p.estado === 1 || p.estado === '1'
  );

  const productosFiltrados = categoriaActiva === "Inicio" 
    ? productosVisibles 
    : productosVisibles.filter(p => p.categoria && p.categoria.toLowerCase() === categoriaActiva.toLowerCase());

  return (
    <>
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
        ) : productosFiltrados.length === 0 ? (
          <div className="empty-admin-list" style={{ gridColumn: '1 / -1' }}>
            <p>No hay productos disponibles en esta sección.</p>
          </div>
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
              stock={producto.stock}
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </section>
    </>
  );
}
