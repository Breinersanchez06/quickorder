import { useState, useEffect } from 'react';

export function FormularioInformacion({ infoAEditar, onGuardar, onCancelar, guardando }) {
  const initialFormState = {
    nombre: '',
    telefono: '',
    direccion: '',
    horario: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (infoAEditar) {
      setFormData({
        nombre: infoAEditar.nombre || '',
        telefono: infoAEditar.telefono || '',
        direccion: infoAEditar.direccion || '',
        horario: infoAEditar.horario || ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [infoAEditar]);

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
      alert('Por favor ingresa el nombre del establecimiento.');
      return;
    }
    onGuardar(formData);
  };

  const esEdicion = Boolean(infoAEditar);

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">
          {esEdicion ? '✏️ Editar Información del Negocio' : '➕ Registrar Información del Negocio'}
        </h3>
        <p className="form-subtitle">
          {esEdicion
            ? 'Modifica los datos del negocio que se muestran a los clientes'
            : 'Configura el nombre, contacto, dirección y horarios de tu negocio'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre del Negocio *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-input"
              placeholder="Ej. QuickOrder Fast Food"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label htmlFor="telefono" className="form-label">Teléfono de Contacto</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="form-input"
              placeholder="Ej. +57 300 000 0000"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          {/* Dirección */}
          <div className="form-group">
            <label htmlFor="direccion" className="form-label">Dirección Física</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              className="form-input"
              placeholder="Ej. Av. Principal #123, Ciudad"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>

          {/* Horario */}
          <div className="form-group">
            <label htmlFor="horario" className="form-label">Horario de Atención</label>
            <input
              type="text"
              id="horario"
              name="horario"
              className="form-input"
              placeholder="Ej. Lunes a Domingo: 11:00 AM - 10:00 PM"
              value={formData.horario}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Información' : 'Guardar Información'}
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
