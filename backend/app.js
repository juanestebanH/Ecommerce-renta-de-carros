const express = require('express');
const path = require('path');
const loginRoutes = require('./routes/admin/loginRoutes');
const totalDashboardRoutes = require('./routes//admin/totalDashboardRoutes');
const rentasRecientesRoutes = require('./routes/admin/rentasRecientesRoutes');
const estadoFlotaRoutes = require('./routes/admin/estadoFlotasRoutes');
const carrosRoutes = require('./routes/admin/carrosRoutes');
const marcasRoutes = require('./routes/admin/marcasRoutes');
const carrosRoutesCliente = require('./routes/cliente/carrosRoutes');
const rentasRouterCliente = require('./routes/cliente/rentasRoutes');
const loginRoutesCliente = require('./routes/cliente/loginRoutes');
const clienteRoutes = require('./routes/cliente/clienteRoutes');
const rentasRoutes = require('./routes/admin/rentasRoutes');
const clientesRoutes = require('./routes/admin/clientesRoutes');
const usuariosRoutes = require('./routes/admin/usuariosRoutes');
const reportesRoutes = require('./routes/admin/reportesRoutes');
// Create Express app
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Routes para el cliente
app.use('/api/cliente/carros', carrosRoutesCliente);
app.use('/api/cliente/rentas', rentasRouterCliente);
app.use('/api/cliente/loginInicioSesion', loginRoutesCliente);
app.use('/api/cliente/registrarcliente', clienteRoutes);

// Routes para el admin
app.use('/api/admin/login', loginRoutes);
app.use('/api/admin/totaldashboard', totalDashboardRoutes);
app.use('/api/admin/rentasrecientes', rentasRecientesRoutes);
app.use('/api/admin/estadoFlota', estadoFlotaRoutes);
app.use('/api/admin/carros', carrosRoutes);
app.use('/api/admin/rentas', rentasRoutes);
app.use('/api/admin/clientes', clientesRoutes);
app.use('/api/admin/usuarios', usuariosRoutes);
app.use('/api/admin/reportes', reportesRoutes);

// ruras publicas
app.use('/api/marcas', marcasRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
