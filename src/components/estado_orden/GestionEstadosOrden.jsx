import { useState } from 'react';
import { FormularioEstadoOrden } from './FormularioEstadoOrden';
import { ListaEstadosOrdenAdmin } from './ListaEstadosOrdenAdmin';
import { crearEstadoOrden, actualizarEstadoOrden, eliminarEstadoOrden } from '../../services/orderStatusService';

export function GestionEstadosOrden({ estadosOrden = [], onActualizarEstadosOrden, cargando }) {
  const [estadoOrdenAEditar, setEstadoOrdenAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = (formData) => {
    setGuardando(true);
    if (estadoOrdenAEditar) {
      // Actualizar estado de orden existente
      actualizarEstadoOrden(estadoOrdenAEditar.id, formData)
        .then(() => {
          alert('Estado de orden actualizado con éxito');
          setEstadoOrdenAEditar(null);
          onActualizarEstadosOrden();
        })
        .catch((err) => {
          console.error('Error al actualizar estado de orden:', err);
          alert('Error al actualizar el estado de orden');
        })
        .finally(() => {
          setGuardando(false);
        });
    } else {
      // Crear nuevo estado de orden
      crearEstadoOrden(formData)
        .then(() => {
          alert('Estado de orden creado con éxito');
          onActualizarEstadosOrden();
        })
        .catch((err) => {
          console.error('Error al crear estado de orden:', err);
          alert('Error al registrar el estado de orden');
        })
        .finally(() => {
          setGuardando(false);
        });
    }
  };

  const handleEditar = (estadoOrden) => {
    setEstadoOrdenAEditar(estadoOrden);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEditar = () => {
    setEstadoOrdenAEditar(null);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este estado de orden?')) {
      eliminarEstadoOrden(id)
        .then(() => {
          alert('Estado de orden eliminado con éxito');
          if (estadoOrdenAEditar && estadoOrdenAEditar.id === id) {
            setEstadoOrdenAEditar(null);
          }
          onActualizarEstadosOrden();
        })
        .catch((err) => {
          console.error('Error al eliminar estado de orden:', err);
          alert('Error al eliminar el estado de orden');
        });
    }
  };

  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>📦 Gestión de Estados de Orden</h2>
        <p>Configura los diferentes estados del flujo de pedidos (ej. Pendiente, En Cocina, Entregado).</p>
      </div>

      <FormularioEstadoOrden
        estadoOrdenAEditar={estadoOrdenAEditar}
        onGuardar={handleGuardar}
        onCancelar={handleCancelarEditar}
        guardando={guardando}
      />

      <ListaEstadosOrdenAdmin
        estadosOrden={estadosOrden}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        cargando={cargando}
      />
    </section>
  );
}
