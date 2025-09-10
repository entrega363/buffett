# Correção dos Erros no Setup do Banco de Dados

## Problema 1: Erro na Parte 2 - Coluna "data" da tabela "space_photos"

**Erro:** `ERROR: 42703: column "data" of relation "space_photos" does not exist`

### Causa:
Este erro pode ocorrer por dois motivos:
1. A tabela `space_photos` não foi criada corretamente na Parte 1
2. Há um problema com as permissões ou políticas de segurança aplicadas à tabela

### Soluções:

1. **Verifique se a tabela foi criada corretamente:**
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'space_photos';
   ```

2. **Se a coluna "data" não estiver listada, recrie a tabela:**
   ```sql
   DROP TABLE IF EXISTS space_photos;
   CREATE TABLE space_photos (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name VARCHAR(255),
     data TEXT NOT NULL,
     upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Use a versão alternativa do arquivo `parte2_alternativa.sql`** que está na pasta `supabase`.

## Problema 2: Erro na Parte 3 - Trigger já existente

**Erro:** `ERROR: 42710: trigger "update_services_updated_at" for relation "services" already exists`

### Causa:
Este erro ocorre quando o trigger `update_services_updated_at` já foi criado anteriormente e está tentando ser criado novamente.

### Solução:
Use a versão corrigida do arquivo `parte3_corrigida.sql` que está na pasta `supabase`. Esta versão inclui:

```sql
-- Remover trigger existente se houver e criar novamente
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE
ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Ordem Correta de Execução:

1. Execute a Parte 1 (`parte1.sql`) - Criação das tabelas
2. Execute a Parte 2:
   - Tente primeiro com `parte2_corrigida.sql`
   - Se ainda ocorrer erro, use `parte2_alternativa.sql`
3. Execute a Parte 3 (`parte3_corrigida.sql`) - Configurações de segurança e índices

## Verificação Pós-Execução:

Após executar todas as partes, verifique se as tabelas foram criadas corretamente:

```sql
-- Verificar todas as tabelas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Contar registros em cada tabela
SELECT 'services' as table_name, COUNT(*) as count FROM services
UNION ALL
SELECT 'reviews' as table_name, COUNT(*) as count FROM reviews
UNION ALL
SELECT 'space_photos' as table_name, COUNT(*) as count FROM space_photos
UNION ALL
SELECT 'featured_videos' as table_name, COUNT(*) as count FROM featured_videos;
```

Se ainda encontrar problemas, reinicie o processo limpando todas as tabelas existentes:

```sql
DROP TABLE IF EXISTS services, reviews, space_photos, featured_videos, contact_info, streaming_config, packages_config;
```

E então execute novamente as três partes na ordem correta.