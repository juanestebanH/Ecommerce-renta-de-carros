const carrosModel = require('../../models/admin/carrosModel');
const marcasModel = require('../../models/admin/marcasModel');
const supabase = require('../../config/conexion');

const carrosControllers = {
  AgregarVehiculo: async (req, res) => {
    const data = req.body;

    try {
      const carroExistente = await carrosModel.BuscarCarro(data.id_carro);
      if (carroExistente) {
        return res
          .status(400)
          .json({ message: 'El vehículo ya existe con esa placa' });
      }

      let marca = await marcasModel.BuscarMarcaPorNombre(data.id_marca);
      if (!marca) {
        await marcasModel.AgregarMarca(data.id_marca);
      }

      // 🔥 SUBIR IMAGEN A SUPABASE
      data.foto = await carrosControllers.GuardarFoto(req.file, data.id_carro);

      const resultado = await carrosModel.AgregarVehiculo(data);

      if (resultado) {
        res.status(200).json({ message: 'Vehículo agregado con éxito' });
      } else {
        res.status(500).json({ message: 'Error al agregar el vehículo' });
      }
    } catch (error) {
      console.error('Error en Controller AgregarVehiculo:', error);
      res.status(500).json({ message: 'Error al agregar el vehículo' });
    }
  },

  ActualizarVehiculo: async (req, res) => {
    const { placa } = req.params;
    const data = req.body;

    try {
      const carroExistente = await carrosModel.BuscarCarro(placa);
      if (!carroExistente) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }

      if (data.id_marca && data.id_marca !== carroExistente.id_marca) {
        let marca = await marcasModel.BuscarMarcaPorNombre(data.id_marca);
        if (!marca) {
          await marcasModel.AgregarMarca(data.id_marca);
        } else {
          data.id_marca = marca.nombre;
        }
      }

      if (req.file) {
        if (carroExistente.foto) {
          await carrosControllers.EliminarFotoSupabase(carroExistente.foto);
        }

        data.foto = await carrosControllers.GuardarFoto(req.file, placa);
      }

      const resultado = await carrosModel.ActualizarVehiculo(placa, data);

      if (resultado) {
        res.status(200).json({ message: 'Vehículo actualizado con éxito' });
      } else {
        res.status(500).json({ message: 'Error al actualizar el vehículo' });
      }
    } catch (error) {
      console.error('Error en Controller ActualizarVehiculo:', error);
      res.status(500).json({ message: 'Error al actualizar el vehículo' });
    }
  },

  GuardarFoto: async (file, placa) => {
    if (!file) return null;

    const extension = file.originalname.split('.').pop();
    const nombreArchivo = `${placa}.${extension}`;

    const { data, error } = await supabase.storage
      .from('carros')
      .upload(nombreArchivo, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error('❌ Error subiendo imagen:', error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('carros')
      .getPublicUrl(nombreArchivo);

    return publicUrlData.publicUrl;
  },

  ListarCarros: async (req, res) => {
    try {
      const carros = await carrosModel.ListarCarros();
      res.status(200).json(carros);
    } catch (error) {
      console.error('Error en Controller ListarCarros:', error);
      res.status(500).json({ message: 'Error al listar los vehículos' });
    }
  },

  DesactivarCarro: async (req, res) => {
    const { placa } = req.body;

    try {
      const resultado = await carrosModel.DesactivarCarro(placa);
      res.status(200).json({ message: 'Vehículo desactivado' });
    } catch (error) {
      console.error('Error en Controller DesactivarCarro:', error);
      res.status(500).json({ message: 'Error al desactivar el vehículo' });
    }
  },

  DetalleCarro: async (req, res) => {
    const { placa } = req.params;

    try {
      const carro = await carrosModel.BuscarCarro(placa);
      if (!carro) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      res.status(200).json(carro);
    } catch (error) {
      console.error('Error en Controller DetalleCarro:', error);
      res
        .status(500)
        .json({ message: 'Error al obtener el detalle del vehículo' });
    }
  },

  EliminarFotoSupabase: async (url) => {
    if (!url) return;

    // Extraer nombre del archivo desde la URL
    const nombreArchivo = url.split('/').pop();

    const { error } = await supabase.storage
      .from('carros')
      .remove([nombreArchivo]);

    if (error) {
      console.error('❌ Error eliminando imagen:', error);
    } else {
      console.log('🗑️ Imagen eliminada:', nombreArchivo);
    }
  },
};

module.exports = carrosControllers;
