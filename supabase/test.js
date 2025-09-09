// Teste de conexão com o Supabase
import { supabase } from './supabase.js'

async function testSupabaseConnection() {
  console.log('Testando conexão com o Supabase...')
  
  try {
    // Testar conexão básica
    const { data, error } = await supabase
      .from('services')
      .select('id')
      .limit(1)
    
    if (error) {
      console.error('Erro na conexão com Supabase:', error)
      return false
    }
    
    console.log('Conexão com Supabase estabelecida com sucesso!')
    console.log('Tabelas disponíveis:')
    
    // Listar todas as tabelas
    const tables = [
      'services',
      'reviews',
      'space_photos',
      'featured_videos',
      'contact_info',
      'streaming_config',
      'packages_config'
    ]
    
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          console.log(`  ❌ ${table}: Erro ao acessar`)
        } else {
          console.log(`  ✅ ${table}: Conectado`)
        }
      } catch (err) {
        console.log(`  ❌ ${table}: ${err.message}`)
      }
    }
    
    return true
  } catch (err) {
    console.error('Erro ao testar conexão:', err)
    return false
  }
}

// Executar teste
testSupabaseConnection()