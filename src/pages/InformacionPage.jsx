import { GestionInformacion } from '../components/informacion/GestionInformacion';

export function InformacionPage({ informacion, onActualizarInformacion, cargando }) {
  return (
    <GestionInformacion
      informacion={informacion}
      onActualizarInformacion={onActualizarInformacion}
      cargando={cargando}
    />
  );
}
