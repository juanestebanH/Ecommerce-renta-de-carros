// archivo de helpers para manejar las peticiones HTTP

export const helpHttp = () => {
  // url de la api
  const API_URL = 'https://ecommerce-renta-de-carros.onrender.com/api/';
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || 'GET';
    // Si el body es FormData, no agregues headers ni serialices
    const isFormData = options.body instanceof FormData;
    if (!isFormData) {
      options.headers = options.headers
        ? { ...defaultHeader, ...options.headers }
        : defaultHeader;
      options.body = JSON.stringify(options.body) || false;
      if (!options.body) delete options.body;
    } else {
      // Si es FormData, no agregues headers ni serialices
      delete options.headers;
    }
    //console.log(options);
    setTimeout(() => controller.abort(), 3000);

    // Realizar la petición
    return fetch(`${API_URL}${endpoint}`, options)
      .then(async (res) => {
        // Si la respuesta no es ok, manejar el error
        const data = await res.json().catch(() => ({})); // Por si no hay JSON
        if (!res.ok) {
          return {
            err: true,
            status: res.status || '00',
            statusText: res.statusText || 'Ocurrió un error',
            ...data, // Esto agrega el message del backend
          };
        }
        return data;
      })
      .catch((err) => ({
        err: true,
        status: '00',
        statusText: err.message || 'Error de red',
      }));
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = 'POST';
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = 'PUT';
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = 'DELETE';
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
