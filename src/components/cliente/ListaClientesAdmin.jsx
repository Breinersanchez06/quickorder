export function ListaClientesAdmin({ clientes = [], onEditar, onEliminar, cargando }) {
  if (cargando) {
    return <p className="loading-text">Cargando lista de clientes...</p>;
  }

  if (clientes.length === 0) {
    return (
      <div className="empty-admin-list">
        <p>No hay clientes registrados en el sistema.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">👥 Lista de Clientes Registrados</h3>
        <span className="table-count">{clientes.length} cliente(s)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cli) => (
              <tr key={cli.id}>
                <td className="td-id">#{cli.id}</td>

                <td className="td-name">
                  <strong>{cli.nombre} {cli.apellido || ''}</strong>
                </td>

                <td>
                  <span className="text-muted">{cli.correo || '-'}</span>
                </td>

                <td>
                  <span>{cli.telefono || '-'}</span>
                </td>

                <td>
                  <p className="td-desc">{cli.direccion || <span className="text-muted">Sin dirección</span>}</p>
                </td>

                <td>
                  <span className={(cli.estado === true || cli.estado === 'true' || cli.estado === 1 || cli.estado === '1' || cli.estado === undefined) ? 'badge-status-active' : 'badge-status-inactive'}>
                    {(cli.estado === true || cli.estado === 'true' || cli.estado === 1 || cli.estado === '1' || cli.estado === undefined) ? '● Activo' : '○ Inactivo'}
                  </span>
                </td>

                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(cli)}>
                    ✏️ Editar
                  </button>
                  <button className="btn-action-delete" onClick={() => onEliminar(cli.id)}>
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
