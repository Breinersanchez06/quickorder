export function ListaEstadosOrdenAdmin({ estadosOrden = [], onEditar, onEliminar, cargando }) {
  if (cargando) {
    return <p className="loading-text">Cargando lista de estados de orden...</p>;
  }

  if (estadosOrden.length === 0) {
    return (
      <div className="empty-admin-list">
        <p>No hay estados de orden registrados en el sistema.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">📦 Lista de Estados de Orden Registrados</h3>
        <span className="table-count">{estadosOrden.length} estado(s)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estado / Color</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estadosOrden.map((eo) => (
              <tr key={eo.id}>
                <td className="td-id">#{eo.id}</td>

                <td className="td-name">
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: eo.color || '#0284c7',
                        boxShadow: '0 0 0 2px rgba(0,0,0,0.05)'
                      }}
                    />
                    <strong>{eo.nombre}</strong>
                  </div>
                </td>

                <td>
                  <p className="td-desc">{eo.descripcion || <span className="text-muted">Sin descripción</span>}</p>
                </td>

                <td>
                  <span className={(eo.estado === true || eo.estado === 'true' || eo.estado === 1 || eo.estado === '1' || eo.estado === undefined) ? 'badge-status-active' : 'badge-status-inactive'}>
                    {(eo.estado === true || eo.estado === 'true' || eo.estado === 1 || eo.estado === '1' || eo.estado === undefined) ? '● Activo' : '○ Inactivo'}
                  </span>
                </td>

                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(eo)}>
                    ✏️ Editar
                  </button>
                  <button className="btn-action-delete" onClick={() => onEliminar(eo.id)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
