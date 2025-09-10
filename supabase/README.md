# Configuração do Banco de Dados Supabase para Buffet Sobral

## Estrutura do Banco de Dados

Este documento descreve a estrutura do banco de dados utilizada no projeto Buffet Sobral.

### Tabelas

1. **services** - Serviços oferecidos pelo buffet
   - id (UUID)
   - name (VARCHAR) - Nome do serviço
   - description (TEXT) - Descrição do serviço
   - price (DECIMAL) - Preço do serviço
   - image_url (TEXT) - URL da imagem do serviço
   - created_at (TIMESTAMP) - Data de criação
   - updated_at (TIMESTAMP) - Data de atualização

2. **reviews** - Avaliações dos clientes
   - id (UUID)
   - name (VARCHAR) - Nome do cliente
   - stars (INTEGER) - Número de estrelas (1-5)
   - comment (TEXT) - Comentário do cliente
   - created_at (TIMESTAMP) - Data da avaliação

3. **space_photos** - Fotos do espaço do buffet
   - id (UUID)
   - name (VARCHAR) - Nome da foto
   - data (TEXT) - Dados da imagem em base64
   - upload_date (TIMESTAMP) - Data de upload

4. **featured_videos** - Vídeos em destaque
   - id (UUID)
   - url (TEXT) - URL do vídeo
   - video_id (TEXT) - ID do vídeo (ex: YouTube ID)
   - title (VARCHAR) - Título do vídeo
   - added_date (TIMESTAMP) - Data de adição

5. **contact_info** - Informações de contato
   - id (UUID)
   - whatsapp_number (VARCHAR) - Número do WhatsApp
   - contact_email (VARCHAR) - Email de contato
   - contact_phone (VARCHAR) - Telefone de contato
   - last_updated (TIMESTAMP) - Última atualização

6. **streaming_config** - Configurações de streaming ao vivo
   - id (UUID)
   - channel_id (VARCHAR) - ID do canal de streaming
   - status (VARCHAR) - Status do streaming (enabled/disabled)
   - last_updated (TIMESTAMP) - Última atualização

7. **packages_config** - Configurações dos pacotes oferecidos
   - id (UUID)
   - basic_name (VARCHAR) - Nome do pacote básico
   - basic_price (DECIMAL) - Preço do pacote básico
   - basic_description (TEXT) - Descrição do pacote básico
   - complete_name (VARCHAR) - Nome do pacote completo
   - complete_price (DECIMAL) - Preço do pacote completo
   - complete_description (TEXT) - Descrição do pacote completo
   - last_updated (TIMESTAMP) - Última atualização

## Configuração Inicial

### Passo 1: Criar as tabelas

Execute o arquivo `setup.sql` no editor SQL do Supabase:

1. Acesse o painel do Supabase
2. Vá para a seção "SQL Editor"
3. Cole o conteúdo do arquivo `setup.sql`
4. Execute o script

### Passo 2: Inserir dados de exemplo (opcional)

Para popular o banco com dados de exemplo, execute o arquivo `seed.sql`:

1. No "SQL Editor" do Supabase
2. Cole o conteúdo do arquivo `seed.sql`
3. Execute o script

## Políticas de Segurança

As seguintes políticas de segurança foram configuradas:

- Leitura pública para todas as tabelas (usuários anônimos podem ler os dados)
- Acesso restrito para escrita (apenas usuários autenticados podem modificar)

## Índices

Índices foram criados para melhorar a performance nas seguintes colunas:

- services.name
- reviews.created_at
- space_photos.upload_date
- featured_videos.added_date

## Gatilhos

Um gatilho foi criado para atualizar automaticamente o campo `updated_at` na tabela `services` sempre que um registro for modificado.

## Manutenção

### Adicionar novos serviços

```sql
INSERT INTO services (name, description, price, image_url)
VALUES ('Novo Serviço', 'Descrição do novo serviço', 99.99, 'https://exemplo.com/imagem.jpg');
```

### Atualizar preços

```sql
UPDATE services 
SET price = 55.00, updated_at = NOW()
WHERE name = 'Buffet Completo';
```

### Adicionar nova avaliação

```sql
INSERT INTO reviews (name, stars, comment)
VALUES ('Nome do Cliente', 5, 'Comentário da avaliação');
```

### Atualizar informações de contato

```sql
UPDATE contact_info 
SET whatsapp_number = '(85) 98888-8888', 
    contact_email = 'novoemail@buffetsobral.com',
    last_updated = NOW()
WHERE id = (SELECT id FROM contact_info LIMIT 1);
```

## Backup e Restauração

### Exportar dados

```sql
-- Exportar tabela específica
COPY services TO '/caminho/para/arquivo.csv' WITH CSV HEADER;

-- Ou usar o painel do Supabase para exportar todo o banco
```

### Importar dados

```sql
-- Importar tabela específica
COPY services FROM '/caminho/para/arquivo.csv' WITH CSV HEADER;
```

## Troubleshooting

### Problemas comuns

1. **Erro de permissão**: Certifique-se de que as políticas RLS estão configuradas corretamente
2. **Dados não aparecem**: Verifique se os índices estão atualizados e se não há filtros aplicados
3. **Campos obrigatórios**: Verifique se todos os campos NOT NULL estão sendo preenchidos

### Consultas úteis

```sql
-- Verificar todas as tabelas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Contar registros em cada tabela
SELECT 'services' as table_name, COUNT(*) as count FROM services
UNION ALL
SELECT 'reviews' as table_name, COUNT(*) as count FROM reviews
UNION ALL
SELECT 'space_photos' as table_name, COUNT(*) as count FROM space_photos;

-- Verificar últimas atualizações
SELECT * FROM services ORDER BY updated_at DESC LIMIT 5;
```

## Considerações de Segurança

1. **Chaves de API**: Nunca exponha as chaves de API no código do frontend
2. **Políticas RLS**: Revise regularmente as políticas de segurança
3. **Backups**: Realize backups regulares do banco de dados
4. **Monitoramento**: Utilize as ferramentas de monitoramento do Supabase para acompanhar acessos