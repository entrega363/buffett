# Integração do Buffet Sobral com Supabase

Este diretório contém todos os arquivos necessários para integrar o Buffet Sobral com o Supabase, substituindo o uso do localStorage por um banco de dados em nuvem.

## Estrutura do Projeto

```
supabase/
├── client.js          # Cliente do Supabase
├── config.js          # Configurações do Supabase
├── models.js          # Modelos de dados
├── services.js        # Serviços para interagir com o Supabase
├── auth.js            # Autenticação com Supabase
├── store.js          # Gerenciamento de estado da aplicação
├── migrate.js        # Script de migração de dados do localStorage
├── site-integration.js # Integração do site principal com Supabase
├── admin-integration.js # Integração do painel administrativo com Supabase
├── admin-auth.js     # Autenticação do painel administrativo
├── schema.sql        # Esquema do banco de dados
├── package.json      # Dependências do projeto
├── .env.example     # Exemplo de variáveis de ambiente
└── README.md         # Documentação
```

## Configuração Inicial

1. **Criar projeto no Supabase**:
   - Acesse [https://supabase.com](https://supabase.com)
   - Crie um novo projeto
   - Obtenha a URL do projeto e a chave anônima

2. **Configurar variáveis de ambiente**:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais do Supabase
   ```

3. **Criar tabelas no banco de dados**:
   - Acesse o painel do Supabase
   - Vá para a seção "SQL Editor"
   - Cole o conteúdo do arquivo `tables.sql` e execute
   - Opcionalmente, execute também o arquivo `seed.sql` para dados de exemplo

4. **Instalar dependências**:
   ```bash
   npm install
   ```

5. **Executar migração de dados**:
   ```bash
   node migrate.js
   ```

## Estrutura do Banco de Dados

O banco de dados contém as seguintes tabelas:

- `services` - Serviços oferecidos pelo buffet
- `contact_info` - Informações de contato
- `events` - Associação entre serviços e tipos de eventos
- `packages` - Pacotes de serviços
- `reviews` - Avaliações dos clientes
- `photos` - Fotos do espaço
- `videos` - Vídeos em destaque
- `admins` - Administradores do sistema

### Detalhes das Tabelas

#### services
- `id` (UUID) - Identificador único do serviço
- `name` (VARCHAR) - Nome do serviço
- `description` (TEXT) - Descrição do serviço
- `price` (DECIMAL) - Preço por pessoa
- `image_url` (TEXT) - URL da imagem do serviço
- `category` (VARCHAR) - Categoria do serviço
- `created_at` (TIMESTAMP) - Data de criação
- `updated_at` (TIMESTAMP) - Data de atualização

#### events
- `id` (UUID) - Identificador único da associação
- `service_id` (UUID) - Referência ao serviço
- `event_type` (VARCHAR) - Tipo de evento (birthday, wedding, graduation, corporate)
- `created_at` (TIMESTAMP) - Data de criação

#### packages
- `id` (UUID) - Identificador único do pacote
- `name` (VARCHAR) - Nome do pacote
- `price` (DECIMAL) - Preço por pessoa
- `description` (TEXT) - Descrição do pacote
- `created_at` (TIMESTAMP) - Data de criação
- `updated_at` (TIMESTAMP) - Data de atualização

## Criação de Tabelas

Para criar as tabelas no banco de dados do Supabase, você pode usar os arquivos SQL fornecidos:

1. **Arquivo `tables.sql`**: Contém o esquema completo do banco de dados
2. **Arquivo `seed.sql`**: Contém dados de exemplo para testes

### Como executar os arquivos SQL:

1. Acesse o painel do Supabase
2. Vá para a seção "SQL Editor"
3. Cole o conteúdo do arquivo `tables.sql` e clique em "Run"
4. Opcionalmente, cole o conteúdo do arquivo `seed.sql` e clique em "Run" para dados de exemplo

## Migração de Dados

O script de migração (`migrate.js`) transfere automaticamente todos os dados do localStorage para o Supabase:

```bash
node migrate.js
```

## Funcionalidades Implementadas

### Site Principal
- Carregamento de dados em tempo real do Supabase
- Atualizações automáticas quando os dados são modificados
- Integração com WhatsApp usando número configurado

### Painel Administrativo
- Autenticação segura com Supabase Auth
- Gerenciamento completo de todos os dados
- Interface em tempo real com atualizações automáticas

## Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Construir para produção
npm run build

# Deploy do esquema do banco de dados
npm run supabase:deploy

# Gerar tipos TypeScript
npm run supabase:types
```

## Segurança

- Todos os dados sensíveis são armazenados de forma segura
- Autenticação baseada em tokens JWT
- Acesso controlado por políticas de segurança
- Criptografia em trânsito (HTTPS)

## Contribuição

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um novo Pull Request

## Licença

MIT © Buffet Sobral