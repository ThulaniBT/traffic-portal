const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://zqumonwgogduccorkbhp.supabase.co', 'sb_publishable_c5HmmGQbDnnawu6fU1Vkog_3-L-wl_J');

async function resetDB() {
  console.log('Resetting traffic lights to online...');
  const { data: tlData, error: tlError } = await supabase
    .from('traffic_lights')
    .update({ status: 'online' })
    .neq('status', 'online');
  if (tlError) console.error('Traffic Lights Error:', tlError);

  console.log('Clearing old reports...');
  const { data: rData, error: rError } = await supabase
    .from('reports')
    .delete()
    .neq('status', 'placeholder_impossible_value'); // Delete all
  if (rError) console.error('Reports Error:', rError);

  console.log('Database reset complete.');
}

resetDB();