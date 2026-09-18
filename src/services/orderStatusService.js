const API_URL = 'https://6aadaa6fa2413bf0ec11b9ec.mockapi.io/estado_orden';

// Obtener todos los estados de orden
export const obtenerEstadosOrden = () => {
  return fetch(API_URL)
    .then((response) => response.json());
};

// Crear un nuevo estado de orden
export const crearEstadoOrden = (estadoOrden) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(estadoOrden)
  }).then((response) => response.json());
};

// Actualizar un estado de orden existente
export const actualizarEstadoOrden = (id, estadoOrden) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(estadoOrden)
  }).then((response) => response.json());
};

// Eliminar un estado de orden por ID
export const eliminarEstadoOrden = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then((response) => response.json());
};
