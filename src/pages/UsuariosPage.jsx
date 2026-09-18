import { GestionUsuarios } from '../components/usuario/GestionUsuarios';

export function UsuariosPage({ usuarios, onActualizarUsuarios, cargando }) {
  return (
    <GestionUsuarios
      usuarios={usuarios}
      onActualizarUsuarios={onActualizarUsuarios}
      cargando={cargando}
    />
  );
}
