// archivo para menejar listas de marcas
import { helpHttp } from './helperHttp';

export const marcas = async () => {
  try {
    const api = helpHttp();
    const respuesta = await api.get('marcas');
    return respuesta;
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
  }
};
