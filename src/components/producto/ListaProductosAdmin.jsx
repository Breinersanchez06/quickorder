export function ListaProductosAdmin({ productos = [], onEditar, onEliminar, cargando }) {
  if (cargando) {
    return <p className="loading-text">Cargando lista de productos...</p>;
  }

  if (productos.length === 0) {
    return (
      <div className="empty-admin-list">
        <p>No hay productos registrados en el sistema.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">📋 Lista de Productos Registrados</h3>
        <span className="table-count">{productos.length} producto(s)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td className="td-id">#{prod.id}</td>
                <td className="td-img">
                  {prod.imagen ? (
                    <img src={prod.imagen} alt={prod.nombre} className="table-thumb" />
                  ) : (
                    <span className="table-thumb-placeholder">🍔</span>
                  )}
                </td>
                <td className="td-name">
                  <strong>{prod.nombre}</strong>
                  <p className="td-desc">{prod.descripcion}</p>
                </td>
                <td>
                  <span className="badge-category">{prod.categoria || 'Sin categoría'}</span>
                </td>
                <td className="td-price">
                  {typeof prod.precio === 'number'
                    ? `$ ${prod.precio.toLocaleString('es-CO')}`
                    : String(prod.precio || '').startsWith('$')
                    ? prod.precio
                    : `$ ${prod.precio || 0}`}
                </td>
                <td>
                  <span className={`badge-stock ${Number(prod.stock) === 0 ? 'badge-stock-out' : Number(prod.stock) <= 5 ? 'badge-stock-low' : ''}`}>
                    {prod.stock !== undefined && prod.stock !== null ? prod.stock : '-'}
                  </span>
                </td>
                <td>
                  <span className={(prod.estado === true || prod.estado === 'true' || prod.estado === 1 || prod.estado === '1' || prod.estado === undefined) ? 'badge-status-active' : 'badge-status-inactive'}>
                    {(prod.estado === true || prod.estado === 'true' || prod.estado === 1 || prod.estado === '1' || prod.estado === undefined) ? '● Activo' : '○ Inactivo'}
                  </span>
                </td>
                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(prod)}>
                    ✏️ Editar
                  </button>
                  <button className="btn-action-delete" onClick={() => onEliminar(prod.id)}>
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
