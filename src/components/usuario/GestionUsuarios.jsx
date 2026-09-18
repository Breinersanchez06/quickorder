import { useState } from 'react';
import { FormularioUsuario } from './FormularioUsuario';
import { ListaUsuariosAdmin } from './ListaUsuariosAdmin';
import { crearUsuario, actualizarUsuario, eliminarUsuario } from '../../services/userService';

export function GestionUsuarios({ usuarios = [], onActualizarUsuarios, cargando }) {
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = (formData) => {
    setGuardando(true);
    if (usuarioAEditar) {
      // Actualizar usuario existente
      actualizarUsuario(usuarioAEditar.id, formData)
        .then(() => {
          alert('Usuario actualizado con éxito');
          setUsuarioAEditar(null);
          onActualizarUsuarios();
        })
        .catch((err) => {
          console.error('Error al actualizar usuario:', err);
          alert('Error al actualizar el usuario');
        })
        .finally(() => {
          setGuardando(false);
        });
    } else {
      // Crear nuevo usuario
      crearUsuario(formData)
        .then(() => {
          alert('Usuario creado con éxito');
          onActualizarUsuarios();
        })
        .catch((err) => {
          console.error('Error al crear usuario:', err);
          alert('Error al registrar el usuario');
        })
        .finally(() => {
          setGuardando(false);
        });
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioAEditar(usuario);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEditar = () => {
    setUsuarioAEditar(null);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      eliminarUsuario(id)
        .then(() => {
          alert('Usuario eliminado con éxito');
          if (usuarioAEditar && usuarioAEditar.id === id) {
            setUsuarioAEditar(null);
          }
          onActualizarUsuarios();
        })
        .catch((err) => {
          console.error('Error al eliminar usuario:', err);
          alert('Error al eliminar el usuario');
        });
    }
  };

  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>👤 Gestión de Usuarios</h2>
        <p>Registra nuevos usuarios de acceso al sistema o edita las credenciales existentes.</p>
      </div>

      <FormularioUsuario
        usuarioAEditar={usuarioAEditar}
        onGuardar={handleGuardar}
        onCancelar={handleCancelarEditar}
        guardando={guardando}
      />

      <ListaUsuariosAdmin
        usuarios={usuarios}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        cargando={cargando}
      />
    </section>
  );
}
