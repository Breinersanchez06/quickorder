import { GestionClientes } from '../components/cliente/GestionClientes';

export function ClientesPage({ clientes, onActualizarClientes, cargando }) {
  return (
    <GestionClientes
      clientes={clientes}
      onActualizarClientes={onActualizarClientes}
      cargando={cargando}
    />
  );
}
