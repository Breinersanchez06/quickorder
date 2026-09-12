const API_URL = 'https://6a9439890e895b145e5f552f.mockapi.io/producto';

export const obtenerProductos = () => {
  return fetch(API_URL)
    .then((response) => response.json());
};
