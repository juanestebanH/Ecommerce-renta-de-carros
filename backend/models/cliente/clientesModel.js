const supabase = require('../../config/conexion');

const clientesModel = {
  agregarCliente: async (data) => {
    try {
      const NuevoCliente = {
        id_cliente: data.id_cliente,
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        fecha_nacimiento: data.fecha_nacimiento,
        numero_licencia: data.numero_licencia || '',
        pais_emision: data.pais_emision || '',
        fecha_vencimiento: data.fecha_vencimiento || null,
      };
      const { error } = await supabase.from('clientes').insert([NuevoCliente]);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model AgregarCliente:', error.message);
      return false;
    }
  },

  buscarCliente: async (id_cliente) => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id_cliente', id_cliente)
        .maybeSingle();

      if (error) throw error;

      return data; // devuelve el objeto del carro
    } catch (error) {
      console.error('Error en Model BuscarCliente:', error.message);
      return null;
    }
  },

  actualizarLicencias: async (data) => {
    try {
      const { error } = await supabase
        .from('clientes')
        .update({
          numero_licencia: data.numero_licencia,
          pais_emision: data.pais_emision,
          fecha_vencimiento: data.fecha_vencimiento,
        })
        .eq('id_cliente', data.id_cliente);

      if (error) throw error;

      return true; // como lo manejarías en MySQL
    } catch (error) {
      console.error('Error en Model actualizarLicencias:', error.message);
      return false;
    }
  },

  reservasCliente: async (id_cliente, estado) => {
    try {
      const { data, error } = await supabase
        .from('rentas')
        .select(
          `
        fecha_inicio,
        fecha_fin,
        fecha_registro,
        carros:carros!rentas_id_carro_fkey (
          nombre
        ),
        pagos:pagos!pagos_id_renta_fkey (
          total_pago
        )
      `
        )
        .eq('id_cliente', id_cliente)
        .eq('estado', estado)
        .order('fecha_inicio', { ascending: false });

      if (error) throw error;

      const resultado = data.map((r) => ({
        fecha_registro: r.fecha_registro,
        fecha_inicio: r.fecha_inicio,
        fecha_fin: r.fecha_fin,
        carro: r.carros?.nombre || null,
        total_pago: r.pagos?.[0]?.total_pago || null,
      }));
      return resultado;
    } catch (error) {
      console.error('Error en Model reservasCliente:', error.message);
      return null;
    }
  },

  listarClientes: async () => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nombres', { ascending: true });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error en Model listarClientes:', error.message);
      return null;
    }
  },

  listaRentasCliente: async (id_cliente) => {
    try {
      const { data, error } = await supabase
        .from('rentas')
        .select(
          `
        id_renta,
        fecha_inicio,
        fecha_fin,
        estado,

        carros:carros!rentas_id_carro_fkey (
          nombre
        ),

        pagos:pagos!pagos_id_renta_fkey (
          total_pago
        )
      `
        )
        .eq('id_cliente', id_cliente)
        .order('fecha_inicio', { ascending: false });

      if (error) throw error;

      // Formato limpio para el controller
      const resultado = data.map((r) => ({
        id_renta: r.id_renta,
        fecha_inicio: r.fecha_inicio,
        fecha_fin: r.fecha_fin,
        estado: r.estado,
        carro: r.carros?.nombre || null,
        total_pago: r.pagos?.[0]?.total_pago || 0,
      }));

      return resultado;
    } catch (error) {
      console.error('Error en Model listaRentasCliente:', error.message);
      return null;
    }
  },
};

module.exports = clientesModel;
