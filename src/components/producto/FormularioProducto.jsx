import { useState, useEffect } from 'react';

export function FormularioProducto({ productoAEditar, categorias = [], onGuardar, onCancelar, guardando }) {
  const initialFormState = {
    nombre: '',
    descripcion: '',
    precio: '',
    stock: 10,
    estado: true,
    categoria: categorias.length > 0 ? (categorias[0].nombre || categorias[0].label) : 'Hamburguesas',
    imagen: '',
    tag: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (productoAEditar) {
      setFormData({
        nombre: productoAEditar.nombre || '',
        descripcion: productoAEditar.descripcion || '',
        precio: productoAEditar.precio ?? '',
        stock: productoAEditar.stock ?? 0,
        estado: productoAEditar.estado !== undefined ? Boolean(productoAEditar.estado) : true,
        categoria: productoAEditar.categoria || (categorias[0]?.nombre || 'Hamburguesas'),
        imagen: productoAEditar.imagen || '',
        tag: productoAEditar.tag || ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [productoAEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || formData.precio === '') {
      alert('Por favor completa el nombre y el precio del producto.');
      return;
    }

    // Convertir precio y stock a número
    const precioNumerico = typeof formData.precio === 'string'
      ? Number(formData.precio.replace(/[^0-9.-]+/g, ''))
      : Number(formData.precio);

    const dataToSend = {
      ...formData,
      precio: !isNaN(precioNumerico) ? precioNumerico : formData.precio,
      stock: Number(formData.stock) || 0,
      estado: Boolean(formData.estado === true || formData.estado === 'true' || formData.estado === 1 || formData.estado === '1')
    };

    onGuardar(dataToSend);
  };

  const esEdicion = Boolean(productoAEditar);

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">
          {esEdicion ? '✏️ Editar Producto' : '➕ Registrar Nuevo Producto'}
        </h3>
        <p className="form-subtitle">
          {esEdicion ? 'Modifica los datos del producto seleccionado' : 'Ingresa los datos para agregar un producto al catálogo'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre del Producto *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-input"
              placeholder="Ej. Hamburguesa Doble Queso"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Precio */}
          <div className="form-group">
            <label htmlFor="precio" className="form-label">Precio ($) *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              min="0"
              className="form-input"
              placeholder="Ej. 18500"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </div>

          {/* Stock */}
          <div className="form-group">
            <label htmlFor="stock" className="form-label">Stock / Cantidad *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              className="form-input"
              placeholder="Ej. 20"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          {/* Estado */}
          <div className="form-group">
            <label htmlFor="estado" className="form-label">Estado del Producto</label>
            <select
              id="estado"
              name="estado"
              className="form-input"
              value={String(formData.estado)}
              onChange={handleChange}
            >
              <option value="true">🟢 Activo (Visible en Catálogo)</option>
              <option value="false">⚪ Inactivo (Oculto)</option>
            </select>
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              className="form-input"
              value={formData.categoria}
              onChange={handleChange}
            >
              {categorias.length > 0 ? (
                categorias
                  .filter(c => (c.nombre || c.label) !== "Inicio")
                  .map(c => {
                    const val = c.nombre || c.label;
                    return <option key={c.id} value={val}>{val}</option>;
                  })
              ) : (
                <>
                  <option value="Hamburguesas">Hamburguesas</option>
                  <option value="Perros Calientes">Perros Calientes</option>
                  <option value="Salchipapas">Salchipapas</option>
                  <option value="Bebidas">Bebidas</option>
                </>
              )}
            </select>
          </div>

          {/* Tag / Etiqueta */}
          <div className="form-group">
            <label htmlFor="tag" className="form-label">Etiqueta (Opcional)</label>
            <input
              type="text"
              id="tag"
              name="tag"
              className="form-input"
              placeholder="Ej. Popular, Nuevo, Combo"
              value={formData.tag}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Imagen URL */}
        <div className="form-group">
          <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
          <input
            type="url"
            id="imagen"
            name="imagen"
            className="form-input"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={formData.imagen}
            onChange={handleChange}
          />
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-input form-textarea"
            placeholder="Detalles sobre los ingredientes o características del producto..."
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        {/* Botones de Acción */}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
          
          {esEdicion && (
            <button type="button" className="btn-cancel" onClick={onCancelar} disabled={guardando}>
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
