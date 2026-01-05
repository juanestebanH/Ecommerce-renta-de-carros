const express = require('express');
const router = express.Router();
const multer = require('multer');
const carrosControllers = require('../../controllers/admin/carrosControllers');

// Multer en memoria (para Supabase)
const upload = multer({
  storage: multer.memoryStorage(),
});

router.get('/', carrosControllers.ListarCarros);
router.post('/', upload.single('foto'), carrosControllers.AgregarVehiculo);
router.put(
  '/:placa',
  upload.single('foto'),
  carrosControllers.ActualizarVehiculo
);
router.delete('/', carrosControllers.DesactivarCarro);
router.get('/:placa', carrosControllers.DetalleCarro);

module.exports = router;
