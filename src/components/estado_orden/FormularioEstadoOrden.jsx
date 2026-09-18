import { useState, useEffect } from 'react';

export function FormularioEstadoOrden({ estadoOrdenAEditar, onGuardar, onCancelar, guardando }) {
  const initialFormState = {
    nombre: '',
    descripcion: '',
    color: '#0284c7',
    estado: true
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (estadoOrdenAEditar) {
      setFormData({
        nombre: estadoOrdenAEditar.nombre || '',
        descripcion: estadoOrdenAEditar.descripcion || '',
        color: estadoOrdenAEditar.color || '#0284c7',
        estado: estadoOrdenAEditar.estado !== undefined ? Boolean(estadoOrdenAEditar.estado) : true
      });
    } else {
      setFormData(initialFormState);
    }
  }, [estadoOrdenAEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('Por favor ingresa el nombre del estado de orden.');
      return;
    }

    const dataToSend = {
      ...formData,
      estado: Boolean(formData.estado === true || formData.estado === 'true' || formData.estado === 1 || formData.estado === '1')
    };

    onGuardar(dataToSend);
  };

  const esEdicion = Boolean(estadoOrdenAEditar);

  const coloresPredefinidos = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#64748b'];

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">
          {esEdicion ? '✏️ Editar Estado de Orden' : '➕ Registrar Nuevo Estado de Orden'}
        </h3>
        <p className="form-subtitle">
          {esEdicion
            ? 'Modifica los datos del estado de orden seleccionado'
            : 'Define un nuevo estado para las órdenes (ej. Pendiente, En Cocina, Entregado)'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre del Estado *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-input"
              placeholder="Ej. En Preparación, Despachado, Entregado..."
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Color */}
          <div className="form-group">
            <label htmlFor="color" className="form-label">Color Identificador</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                style={{
                  width: '44px',
                  height: '42px',
                  padding: '2px',
                  borderRadius: '8px',
                  border: '1.5px solid #e2e8f0',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff'
                }}
              />
              <input
                type="text"
                name="color"
                className="form-input"
                placeholder="#0284c7"
                value={formData.color}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
            </div>
            {/* Paleta rápida de colores */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {coloresPredefinidos.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setFormData((prev) => ({ ...prev, color: c }))}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: c,
                    border: formData.color === c ? '2px solid #0f172a' : '1px solid #cbd5e1',
                    cursor: 'pointer'
                  }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Estado */}
          <div className="form-group">
            <label htmlFor="estado" className="form-label">Estado de Activación</label>
            <select
              id="estado"
              name="estado"
              className="form-input"
              value={String(formData.estado)}
              onChange={handleChange}
            >
              <option value="true">🟢 Activo</option>
              <option value="false">⚪ Inactivo</option>
            </select>
          </div>

          {/* Descripción */}
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-input form-textarea"
              placeholder="Detalles sobre qué significa este estado en el flujo de pedidos..."
              rows="3"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Estado' : 'Guardar Estado'}
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
