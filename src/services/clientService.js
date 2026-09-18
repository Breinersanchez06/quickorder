const API_URL = 'https://6aadaa6fa2413bf0ec11b9ec.mockapi.io/cliente';

// Obtener todos los clientes
export const obtenerClientes = () => {
  return fetch(API_URL)
    .then((response) => response.json());
};

// Crear un nuevo cliente
export const crearCliente = (cliente) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  }).then((response) => response.json());
};

// Actualizar un cliente existente
export const actualizarCliente = (id, cliente) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  }).then((response) => response.json());
};

// Eliminar un cliente por ID
export const eliminarCliente = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then((response) => response.json());
};
