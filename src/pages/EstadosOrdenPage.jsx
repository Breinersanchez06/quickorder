import { GestionEstadosOrden } from '../components/estado_orden/GestionEstadosOrden';

export function EstadosOrdenPage({ estadosOrden, onActualizarEstadosOrden, cargando }) {
  return (
    <GestionEstadosOrden
      estadosOrden={estadosOrden}
      onActualizarEstadosOrden={onActualizarEstadosOrden}
      cargando={cargando}
    />
  );
}
