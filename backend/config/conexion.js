require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

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

// Solo en local
if (!process.env.RENDER) {
  verificarConexion();
}

module.exports = supabase;
