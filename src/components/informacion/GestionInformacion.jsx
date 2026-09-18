import { useState } from 'react';
import { FormularioInformacion } from './FormularioInformacion';
import { ListaInformacionAdmin } from './ListaInformacionAdmin';
import { crearInformacion, actualizarInformacion, eliminarInformacion } from '../../services/informationService';

export function GestionInformacion({ informacion = [], onActualizarInformacion, cargando }) {
  const [infoAEditar, setInfoAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = (formData) => {
    setGuardando(true);
    if (infoAEditar) {
      // Actualizar información existente
      actualizarInformacion(infoAEditar.id, formData)
        .then(() => {
          alert('Información actualizada con éxito');
          setInfoAEditar(null);
          onActualizarInformacion();
        })
        .catch((err) => {
          console.error('Error al actualizar información:', err);
          alert('Error al actualizar la información');
        })
        .finally(() => {
          setGuardando(false);
        });
    } else {
      // Crear nueva información
      crearInformacion(formData)
        .then(() => {
          alert('Información registrada con éxito');
          onActualizarInformacion();
        })
        .catch((err) => {
          console.error('Error al registrar información:', err);
          alert('Error al registrar la información');
        })
        .finally(() => {
          setGuardando(false);
        });
    }
  };

  const handleEditar = (info) => {
    setInfoAEditar(info);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEditar = () => {
    setInfoAEditar(null);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro de información?')) {
      eliminarInformacion(id)
        .then(() => {
          alert('Información eliminada con éxito');
          if (infoAEditar && infoAEditar.id === id) {
            setInfoAEditar(null);
          }
          onActualizarInformacion();
        })
        .catch((err) => {
          console.error('Error al eliminar información:', err);
          alert('Error al eliminar la información');
        });
    }
  };

  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>ℹ️ Configuración de Información del Negocio</h2>
        <p>Configura o actualiza la información general del negocio (nombre, teléfono, dirección y horarios).</p>
      </div>

      <FormularioInformacion
        infoAEditar={infoAEditar}
        onGuardar={handleGuardar}
        onCancelar={handleCancelarEditar}
        guardando={guardando}
      />

      <ListaInformacionAdmin
        informacion={informacion}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        cargando={cargando}
      />
    </section>
  );
}
