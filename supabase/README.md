# Integração do Buffet Sobral com Supabase

Este diretório contém todos os arquivos necessários para integrar o Buffet Sobral com o Supabase, substituindo o uso do localStorage por um banco de dados em nuvem.

## Estrutura do Projeto

```
supabase/
├── client.js              # Cliente do Supabase
├── config.js             # Configurações do Supabase
├── models.js             # Modelos de dados
├── services.js           # Serviços para interagir com o Supabase
├── site-integration.js   # Integração do site principal com Supabase
├── admin-integration.js  # Integração do painel administrativo com Supabase
├── package.json          # Dependências do projeto
├── vite.config.js        # Configuração do Vite
├── .env                 # Variáveis de ambiente
└── README.md             # Documentação
```

## Configuração Inicial

1. **Criar projeto no Supabase**:
   - Acesse [https://supabase.com](https://supabase.com)
   - Crie um novo projeto
   - Obtenha a URL do projeto e a chave anônima

2. **Configurar variáveis de ambiente**:
   ```bash
   # Copie o arquivo de exemplo
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais do Supabase
   ```

3. **Instalar dependências**:
   ```bash
   npm install
   ```

4. **Criar tabelas no banco de dados**:
   - Acesse o painel do Supabase
   - Vá para a seção "SQL Editor"
   - Cole o conteúdo do arquivo `schema.sql` e execute

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

## Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Construir para produção
npm run build

# Pré-visualizar build de produção
npm run preview

# Testar conexão com o Supabase
npm test
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