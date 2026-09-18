import { useState, useEffect } from 'react';

export function FormularioCategoria({ categoriaAEditar, onGuardar, onCancelar, guardando }) {
  const initialFormState = {
    nombre: '',
    descripcion: '',
    estado: 1
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (categoriaAEditar) {
      setFormData({
        nombre: categoriaAEditar.nombre || '',
        descripcion: categoriaAEditar.descripcion || '',
        estado: categoriaAEditar.estado !== undefined ? Number(categoriaAEditar.estado) : 1
      });
    } else {
      setFormData(initialFormState);
    }
  }, [categoriaAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('Por favor completa el nombre de la categoría.');
      return;
    }

    const dataToSend = {
      ...formData,
      estado: Number(formData.estado)
    };

    onGuardar(dataToSend);
  };

  const esEdicion = Boolean(categoriaAEditar);

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">
          {esEdicion ? '✏️ Editar Categoría' : '➕ Registrar Nueva Categoría'}
        </h3>
        <p className="form-subtitle">
          {esEdicion
            ? 'Modifica los datos de la categoría seleccionada'
            : 'Ingresa los datos para agregar una nueva categoría al catálogo'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre de la Categoría *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-input"
              placeholder="Ej. Postres, Entradas, Bebidas..."
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Estado */}
          <div className="form-group">
            <label htmlFor="estado" className="form-label">Estado de la Categoría</label>
            <select
              id="estado"
              name="estado"
              className="form-input"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="1">🟢 Activo (Visible en Navegación)</option>
              <option value="0">⚪ Inactivo (Oculto)</option>
            </select>
          </div>

          {/* Descripción */}
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="descripcion" className="form-label">Descripción (Opcional)</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-input form-textarea"
              placeholder="Detalles o descripción sobre los productos de esta categoría..."
              rows="3"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Categoría' : 'Guardar Categoría'}
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
