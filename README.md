# Buffet Sobral

Site para o Buffet Sobral, com integração Supabase.

## Estrutura do Projeto

- `index.html` - Página principal do site
- `admin.html` - Painel administrativo
- `supabase.js` - Configuração e funções do Supabase
- `supabase/` - Arquivos de configuração do banco de dados
  - `setup.sql` - Script para criar tabelas e inserir dados iniciais
  - `seed.sql` - Dados de exemplo para testes
  - `README.md` - Documentação detalhada do banco de dados
- `images/` - Imagens do site
- `package.json` - Dependências e scripts do projeto

## Integração com Supabase

Este projeto utiliza o Supabase para armazenar e gerenciar dados dinâmicos como:

- Serviços e preços
- Avaliações de clientes
- Fotos do espaço
- Informações de contato
- Configurações do site

### Credenciais do Supabase

As credenciais do Supabase estão configuradas no arquivo `.env`:

```
SUPABASE_URL=https://vopekxfyorbuyrvzcshy.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ1OTI2MywiZXhwIjoyMDczMDM1MjYzfQ.CEziwcAFfb7reGiGorqLneb-81OHDSHwR1ew5Ibg0yk
```

## Desenvolvimento

### Instalação

```bash
npm install
```

### Executar localmente

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Deploy

O site é automaticamente implantado no Vercel a cada push no repositório.

## Estrutura do Banco de Dados

O projeto utiliza as seguintes tabelas no Supabase:

1. `services` - Armazena informações sobre os serviços oferecidos
2. `reviews` - Avaliações dos clientes
3. `space_photos` - Fotos do espaço do buffet
4. `featured_videos` - Vídeos em destaque
5. `contact_info` - Informações de contato
6. `streaming_config` - Configurações de streaming ao vivo
7. `packages_config` - Configurações dos pacotes oferecidos

### Configuração Inicial do Banco de Dados

Para configurar o banco de dados Supabase:

1. Execute o script `supabase/setup.sql` no SQL Editor do Supabase
2. (Opcional) Execute `supabase/seed.sql` para inserir dados de exemplo

Documentação completa disponível em `supabase/README.md`

## Funcionalidades

- Catálogo de serviços com preços dinâmicos
- Simulador de orçamento
- Agenda de eventos
- Avaliações de clientes
- Galeria de fotos
- Vídeos em destaque
- Câmera ao vivo
- Painel administrativo para gerenciar conteúdo

## Atualização de Dados

Os dados são sincronizados automaticamente entre o frontend e o Supabase:

- Alterações feitas no painel administrativo são salvas no localStorage e sincronizadas com o Supabase
- Dados carregados do Supabase são armazenados no localStorage para acesso offline
- O site verifica atualizações no Supabase ao carregar