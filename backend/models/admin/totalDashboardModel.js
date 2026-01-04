const supabase = require('../../config/conexion');

const totalDashboardModel = async () => {
  try {
    // ============================
    // TOTAL DE CARROS
    // ============================
    const { count: totalCarros, error: errorCarros } = await supabase
      .from('carros')
      .select('*', { count: 'exact', head: true })
      .neq('estado', 'desactivado');

    if (errorCarros) throw errorCarros;

    // ============================
    // TOTAL DE RENTAS ACTIVAS
    // ============================
    const { count: totalRentas, error: errorRentas } = await supabase
      .from('rentas')
      .select('*', { count: 'exact', head: true })
      .eq('estado', 'activa');

    if (errorRentas) throw errorRentas;

    // ============================
    // TOTAL CLIENTES
    // ============================
    const { count: totalClientes, error: errorClientes } = await supabase
      .from('clientes')
      .select('*', { count: 'exact', head: true });

    if (errorClientes) throw errorClientes;

    // ============================
    // INGRESOS DEL MES
    // ============================
    const now = new Date();
    const mesActual = now.getMonth() + 1; // meses empiezan en 0
    const anioActual = now.getFullYear();

    const { data: totalMes, error: errorMes } = await supabase
      .from('pagos')
      .select('total_pago, fecha_pago');

    if (errorMes) throw errorMes;

    // Filtrar en JavaScript (Supabase no deja usar MONTH() y YEAR())
    let total_ingresos = 0;

    totalMes.forEach((pago) => {
      const fecha = new Date(pago.fecha_pago);
      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();

      if (mes === mesActual && anio === anioActual) {
        total_ingresos += pago.total_pago || 0;
      }
    });

    // ============================
    // RETORNO FINAL
    // ============================
    return {
      total_carros: totalCarros || 0,
      total_rentas: totalRentas || 0,
      total_clientes: totalClientes || 0,
      total_ingresos,
    };
  } catch (error) {
    console.error('Error en totalDashboardModel:', error.message);
    return {
      total_carros: 0,
      total_rentas: 0,
      total_clientes: 0,
      total_ingresos: 0,
    };
  }
};

module.exports = totalDashboardModel;
