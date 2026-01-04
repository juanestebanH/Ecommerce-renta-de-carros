const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const carrosControllers = require('../../controllers/admin/carrosControllers');

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // carpeta donde guarda multer primero
  },
  filename: (req, file, cb) => {
    // nombre temporal único (luego lo renombramos en GuardarFoto con la placa)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', carrosControllers.ListarCarros);
router.post('/', upload.single('foto'), carrosControllers.AgregarVehiculo);
router.put('/:placa', upload.single('foto'), carrosControllers.ActualizarVehiculo);
router.delete('/', carrosControllers.DesactivarCarro);
router.get('/:placa', carrosControllers.DetalleCarro);

module.exports = router;
