export function ListaInformacionAdmin({ informacion = [], onEditar, onEliminar, cargando }) {
  if (cargando) {
    return <p className="loading-text">Cargando información del negocio...</p>;
  }

  if (informacion.length === 0) {
    return (
      <div className="empty-admin-list">
        <p>No hay registros de información configurados en el sistema.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">ℹ️ Información del Negocio</h3>
        <span className="table-count">{informacion.length} registro(s)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Negocio</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Horario</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {informacion.map((info) => (
              <tr key={info.id}>
                <td className="td-id">#{info.id}</td>

                <td className="td-name">
                  <strong>{info.nombre}</strong>
                </td>

                <td>
                  <span>{info.telefono || '-'}</span>
                </td>

                <td>
                  <p className="td-desc">{info.direccion || <span className="text-muted">Sin dirección</span>}</p>
                </td>

                <td>
                  <span className="badge-tag">{info.horario || 'Sin horario'}</span>
                </td>

                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(info)}>
                    ✏️ Editar
                  </button>
                  <button className="btn-action-delete" onClick={() => onEliminar(info.id)}>
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
