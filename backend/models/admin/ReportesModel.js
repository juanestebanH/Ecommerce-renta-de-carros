const supabase = require('../../config/conexion');

const reportesModel = {
  topCarros: async () => {
    try {
      const { data, error } = await supabase.from('rentas').select(`
          id_carro,
          carros:carros!rentas_id_carro_fkey (
            nombre
          ),
          pagos:pagos!pagos_id_renta_fkey (
            total_pago
          )
        `);

      if (error) throw error;

      const resumen = {};

      data.forEach((r) => {
        const id = r.id_carro;

        if (!resumen[id]) {
          resumen[id] = {
            id_carro: id,
            nombre_carro: r.carros?.nombre || '',
            total_rentas: 0,
            total_ingresos: 0,
          };
        }

        resumen[id].total_rentas += 1;
        resumen[id].total_ingresos += r.pagos?.[0]?.total_pago || 0;
      });

      return Object.values(resumen)
        .sort((a, b) => b.total_rentas - a.total_rentas)
        .slice(0, 5);
    } catch (error) {
      console.error('Error en topCarros:', error.message);
      return [];
    }
  },

  topClientes: async () => {
    try {
      const { data, error } = await supabase.from('rentas').select(`
          id_cliente,
          clientes:clientes!rentas_id_cliente_fkey (
            nombres
          ),
          pagos:pagos!pagos_id_renta_fkey (
            total_pago
          )
        `);

      if (error) throw error;

      const resumen = {};

      data.forEach((r) => {
        const id = r.id_cliente;

        if (!resumen[id]) {
          resumen[id] = {
            id_cliente: id,
            nombre: r.clientes?.nombres || '',
            total_rentas: 0,
            total_pagado: 0,
          };
        }

        resumen[id].total_rentas += 1;
        resumen[id].total_pagado += r.pagos?.[0]?.total_pago || 0;
      });

      return Object.values(resumen)
        .sort((a, b) => b.total_rentas - a.total_rentas)
        .slice(0, 5);
    } catch (error) {
      console.error('Error en topClientes:', error.message);
      return [];
    }
  },

  reportePorCategoria: async () => {
    try {
      const { data, error } = await supabase.from('categorias').select(`
          nombre,
          carros:carros!carros_id_categoria_fkey (
            id_carro,
            rentas:rentas!rentas_id_carro_fkey (
              id_renta,
              pagos:pagos!pagos_id_renta_fkey (
                total_pago
              )
            )
          )
        `);

      if (error) throw error;

      const resultado = data.map((cat) => {
        let total_carros = 0;
        let total_rentas = 0;
        let total_ingresos = 0;

        if (cat.carros) {
          total_carros = cat.carros.length;

          cat.carros.forEach((carro) => {
            if (carro.rentas) {
              total_rentas += carro.rentas.length;

              carro.rentas.forEach((renta) => {
                total_ingresos += renta.pagos?.[0]?.total_pago || 0;
              });
            }
          });
        }

        return {
          id_categoria: cat.id_categoria,
          categoria: cat.nombre,
          total_carros,
          total_rentas,
          total_ingresos,
        };
      });

      return resultado;
    } catch (error) {
      console.error('Error en reportePorCategoria:', error.message);
      return [];
    }
  },
};

module.exports = reportesModel;
