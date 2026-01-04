// Cargar variables de entorno
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

// Crear la conexión a Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Verificar conexión
async function verificarConexion() {
  const { data, error } = await supabase
    .from('carros')
    .select('id_carro')
    .limit(1);

  if (error) {
    console.error('❌ Error conectando a Supabase:', error.message);
  } else {
    console.log('✅ Conexión a Supabase exitosa');
  }
}

verificarConexion();

module.exports = supabase;
