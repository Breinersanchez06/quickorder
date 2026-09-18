import { useState } from 'react';

export function ListaUsuariosAdmin({ usuarios = [], onEditar, onEliminar, cargando }) {
  const [clavesVisibles, setClavesVisibles] = useState({});

  const toggleMostrarClave = (id) => {
    setClavesVisibles((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (cargando) {
    return <p className="loading-text">Cargando lista de usuarios...</p>;
  }

  if (usuarios.length === 0) {
    return (
      <div className="empty-admin-list">
        <p>No hay usuarios registrados en el sistema.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">👤 Lista de Usuarios Registrados</h3>
        <span className="table-count">{usuarios.length} usuario(s)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Clave</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td className="td-id">#{user.id}</td>

                <td className="td-name">
                  <strong>{user.nombre}</strong>
                </td>

                <td>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.95rem' }}>
                      {clavesVisibles[user.id] ? user.clave : '••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleMostrarClave(user.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: '#64748b'
                      }}
                      title={clavesVisibles[user.id] ? 'Ocultar' : 'Mostrar'}
                    >
                      {clavesVisibles[user.id] ? '🙈' : '👁️'}
                    </button>
                  </div>
                </td>

                <td>
                  <span className={(user.estado === true || user.estado === 'true' || user.estado === 1 || user.estado === '1' || user.estado === undefined) ? 'badge-status-active' : 'badge-status-inactive'}>
                    {(user.estado === true || user.estado === 'true' || user.estado === 1 || user.estado === '1' || user.estado === undefined) ? '● Activo' : '○ Inactivo'}
                  </span>
                </td>

                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(user)}>
                    ✏️ Editar
                  </button>
                  <button className="btn-action-delete" onClick={() => onEliminar(user.id)}>
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
