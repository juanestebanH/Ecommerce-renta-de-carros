const supabase = require('../../config/conexion');

const rentasRecientesModel = async () => {
  try {
    const { data, error } = await supabase
      .from('rentas')
      .select(
        `
        id_renta,
        fecha_registro,
        carros:carros!rentas_id_carro_fkey (
          nombre
        ),
        clientes:clientes!rentas_id_cliente_fkey (
          nombres
        ),
        pagos:pagos!pagos_id_renta_fkey (
          total_pago
        )
      `
      )
      .order('fecha_registro', { ascending: false })
      .limit(5);

    if (error) throw error;

    // Ajustamos al formato esperado en tu backend:
    const resultado = data.map((r) => ({
      id_renta: r.id_renta,
      carro: r.carros?.nombre || null,
      cliente: r.clientes?.nombres || null,
      pago: r.pagos?.[0]?.total_pago || null,
    }));

    return resultado;
  } catch (error) {
    console.error('Error en rentasRecientesModel:', error.message);
    return [];
  }
};

module.exports = rentasRecientesModel;
