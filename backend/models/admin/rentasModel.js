const supabase = require('../../config/conexion');

const rentasModel = {
  listarRentas: async (estado) => {
    try {
      const { data, error } = await supabase
        .from('rentas')
        .select(
          `
        id_renta,
        fecha_inicio,
        fecha_fin,
        estado,
        dias_duracion,

        clientes:clientes!rentas_id_cliente_fkey (
          nombres,
          telefono
        ),

        carros:carros!rentas_id_carro_fkey (
          id_carro,
          nombre
        ),

        pagos:pagos!pagos_id_renta_fkey (
          total_pago
        )
      `
        )
        .eq('estado', estado)
        .order('fecha_inicio', { ascending: false });

      if (error) throw error;

      const resultado = data.map((r) => ({
        id_renta: r.id_renta,
        fecha_inicio: r.fecha_inicio,
        fecha_fin: r.fecha_fin,
        estado: r.estado,
        dias_duracion: r.dias_duracion,

        cliente: {
          nombre: r.clientes?.nombres || null,
          telefono: r.clientes?.telefono || null,
        },

        carro: {
          id_carro: r.carros?.id_carro || null,
          nombre: r.carros?.nombre || null,
        },

        total_pago: r.pagos?.[0]?.total_pago || 0,
      }));

      return resultado;
    } catch (error) {
      console.error('Error en listarRentas:', error.message);
      return [];
    }
  },
  DetalleRenta: async (id_renta) => {
    try {
      const { data, error } = await supabase
        .from('rentas')
        .select(
          `
        id_renta,
        fecha_inicio,
        fecha_fin,
        estado,
        dias_duracion,

        clientes:clientes!rentas_id_cliente_fkey (
          nombres,
          apellidos,
          telefono,
          email,
          numero_licencia
        ),

        carros:carros!rentas_id_carro_fkey (
          id_carro,
          nombre,
          id_marca,
          ano,
          capacidad
        ),

        pagos:pagos!pagos_id_renta_fkey (
          total_pago,
          metodo_pago
        )
      `
        )
        .eq('id_renta', id_renta);

      if (error) throw error;

      const resultado = data.map((r) => ({
        id_renta: r.id_renta,
        fecha_inicio: r.fecha_inicio,
        fecha_fin: r.fecha_fin,
        estado: r.estado,
        dias_duracion: r.dias_duracion,

        cliente: {
          nombre: r.clientes?.nombres || null,
          apellido: r.clientes?.apellidos || null,
          telefono: r.clientes?.telefono || null,
          email: r.clientes?.email || null,
          numero_licencia: r.clientes?.numero_licencia || null,
        },

        carro: {
          id_carro: r.carros?.id_carro || null,
          nombre: r.carros?.nombre || null,
          id_marca: r.carros?.id_marca || null,
          ano: r.carros?.ano || null,
          capacidad: r.carros?.capacidad || null,
        },

        total_pago: r.pagos?.[0]?.total_pago || 0,
        metodo_pago: r.pagos?.[0]?.metodo_pago || null,
      }));

      return resultado;
    } catch (error) {
      console.error('Error en listarRentas:', error.message);
      return [];
    }
  },

  ActualizarRenta: async (id_renta) => {
    try {
      const { error } = await supabase
        .from('rentas')
        .update({ estado: 'completada' })
        .eq('id_renta', id_renta);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en ActualizarRenta:', error.message);
    }
  },

  rentarVehiculo: async (data) => {
    try {
      const nuevaRenta = {
        id_renta: data.id_renta,
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        fecha_registro: data.fecha_registro,
        dias_duracion: data.dias_duracion,
        estado: 'activa',
        id_carro: data.id_carro,
        id_cliente: data.id_cliente,
      };

      const { error } = await supabase.from('rentas').insert([nuevaRenta]);
      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model AgregarRenta:', error.message);
      return false;
    }
  },
};

module.exports = rentasModel;
