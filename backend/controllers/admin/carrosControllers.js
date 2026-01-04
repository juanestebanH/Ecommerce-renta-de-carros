const carrosModel = require('../../models/admin/carrosModel');
const marcasModel = require('../../models/admin/marcasModel');
const path = require('path');
const fs = require('fs');
const { log } = require('console');

const carrosControllers = {
  AgregarVehiculo: async (req, res) => {
    const data = req.body;

    try {
      //verificar si el vehiculo existe

      const carroExistente = await carrosModel.BuscarCarro(data.id_carro);
      if (carroExistente) {
        return res
          .status(400)
          .json({ message: 'El vehículo ya existe con esa placa' });
      }

      // verificar o agregar marca
      let marca = await marcasModel.BuscarMarcaPorNombre(data.id_marca);

      if (!marca) {
        const nuevaMarcaId = await marcasModel.AgregarMarca(data.id_marca);
        if (nuevaMarcaId) {
          data.id_marca = data.id_marca;
        }
      } else {
        data.id_marca = marca.nombre;
      }

      // Guardar la foto
      data.foto = carrosControllers.GuardarFoto(req.file, data.id_carro);

      // agregar el vehiculo
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
      // Verificar si el vehiculo existe
      const carroExistente = await carrosModel.BuscarCarro(placa);
      if (!carroExistente) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }

      // Verificar o agregar marca si cambió
      if (data.id_marca && data.id_marca !== carroExistente.id_marca) {
        let marca = await marcasModel.BuscarMarcaPorNombre(data.id_marca);
        if (!marca) {
          const nuevaMarcaId = await marcasModel.AgregarMarca(data.id_marca);
          if (nuevaMarcaId) {
            data.id_marca = data.id_marca;
          }
        } else {
          data.id_marca = marca.nombre;
        }
      }

      // Si hay una nueva foto, guardar y eliminar la anterior
      if (req.file) {
        // Eliminar foto anterior si existe
        if (carroExistente.foto) {
          const rutaFotoAnterior = path.join(__dirname, '../../uploads', carroExistente.foto);
          if (fs.existsSync(rutaFotoAnterior)) {
            fs.unlinkSync(rutaFotoAnterior);
          }
        }
        // Guardar nueva foto
        data.foto = carrosControllers.GuardarFoto(req.file, placa);
      }

      // Actualizar el vehiculo
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

  GuardarFoto: (file, placa) => {
    if (!file) return null;

    // Carpeta de destino para las fotos
    const uploadDir = path.join(__dirname, '../../uploads');

    // obtenemos la extensión del archivo
    const ext = path.extname(file.originalname);

    // Nombre del archivo basado en la placa
    const nuevoNombre = `${placa}${ext}`;

    // ruta origila del archivo temporal
    const rutaOriginal = path.join(uploadDir, file.filename);

    // Nueva ruta con el nombre basado en la placa
    const nuevaRuta = path.join(uploadDir, nuevoNombre);

    // Mover el archivo a la nueva ruta
    fs.renameSync(rutaOriginal, nuevaRuta);

    return nuevoNombre;
  },

  ListarCarros: async (req, res) => {
    try {
      const carros = await carrosModel.ListarCarros();

      if (carros) {
        res.status(200).json(carros);
      } else {
        res.status(500).json({ message: 'Error al listar los vehículos' });
      }
    } catch (error) {
      console.error('Error en Controller ListarCarros:', error);
      res.status(500).json({ message: 'Error al listar los vehículos' });
    }
  },

  DesactivarCarro: async (req, res) => {
    const { placa } = req.body;

    try {
      const resultado = await carrosModel.DesactivarCarro(placa);
      if (resultado) {
        res.status(200).json({ message: 'Vehículo desactivado' });
      } else {
        res.status(500).json({ message: 'Error al desactivar el vehículo' });
      }
    } catch (error) {
      console.error('Error en Controller DesactivarCarro:', error);
      res.status(500).json({ message: 'Error al desactivar el vehículo' });
    }
  },

  DetalleCarro: async (req, res) => {
    const { placa } = req.params;

    try {
      const carro = await carrosModel.BuscarCarro(placa);
      if (carro) {
        res.status(200).json(carro);
      } else {
        res.status(404).json({ message: 'Vehículo no encontrado' });
      }
    } catch (error) {
      console.error('Error en Controller DetalleCarro:', error);
      res
        .status(500)
        .json({ message: 'Error al obtener el detalle del vehículo' });
    }
  },
};

module.exports = carrosControllers;
