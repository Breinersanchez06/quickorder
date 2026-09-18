const API_URL = 'https://6aadaa6fa2413bf0ec11b9ec.mockapi.io/information';

// Obtener la información del negocio
export const obtenerInformacion = () => {
  return fetch(API_URL)
    .then((response) => response.json());
};

// Crear nueva información
export const crearInformacion = (info) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  }).then((response) => response.json());
};

// Actualizar información existente
export const actualizarInformacion = (id, info) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  }).then((response) => response.json());
};

// Eliminar información por ID
export const eliminarInformacion = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then((response) => response.json());
};
