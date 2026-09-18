const API_URL = 'https://6aadaa6fa2413bf0ec11b9ec.mockapi.io/usuario';

// Obtener todos los usuarios
export const obtenerUsuarios = () => {
  return fetch(API_URL)
    .then((response) => response.json());
};

// Crear un nuevo usuario
export const crearUsuario = (usuario) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  }).then((response) => response.json());
};

// Actualizar un usuario existente
export const actualizarUsuario = (id, usuario) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  }).then((response) => response.json());
};

// Eliminar un usuario por ID
export const eliminarUsuario = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then((response) => response.json());
};
