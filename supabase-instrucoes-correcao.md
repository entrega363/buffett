# 📋 INSTRUÇÕES PARA CONFIGURAR O SUPABASE

Siga estas instruções para colar o código nas 3 partes no SQL Editor do Supabase:

## 🔧 PASSO A PASSO

### 1. **Acesse o Painel do Supabase**
- Vá para: https://supabase.com/dashboard
- Faça login na sua conta
- Selecione o projeto `vopekxfyorbuyrvzcshy`

### 2. **Acesse o SQL Editor**
- No menu lateral, clique em **"SQL Editor"**
- Clique em **"+ New Query"** para criar uma nova consulta

### 3. **Cole e Execute as Partes em Ordem**

---

## 📂 PARTE 1: POLÍTICAS RLS (SEGURANÇA)

**Arquivo:** `supabase-parte1-rls.sql`

**O que faz:**
- Habilita segurança em nível de linha (RLS)
- Cria políticas de leitura pública
- Concede permissões para usuários anônimos

**Como executar:**
1. Copie todo o conteúdo do arquivo `supabase-parte1-rls.sql`
2. Cole no SQL Editor
3. Clique em **"RUN"** (botão verde ▶️)
4. Aguarde a execução completa (sem erros)

---

## 📊 PARTE 2: INSERIR DADOS

**Arquivo:** `supabase-parte2-dados.sql`

**O que faz:**
- Insere 8 serviços do buffet
- Adiciona 4 avaliações de clientes
- Popula 6 fotos do espaço
- Configura informações de contato
- Adiciona 3 vídeos em destaque

**Como executar:**
1. Clique em **"+ New Query"** para nova consulta
2. Copie todo o conteúdo do arquivo `supabase-parte2-dados.sql`
3. Cole no SQL Editor
4. Clique em **"RUN"** (botão verde ▶️)
5. Aguarde a execução completa (sem erros)

---

## ✅ PARTE 3: VERIFICAÇÃO E PERMISSÕES FINAIS

**Arquivo:** `supabase-parte3-verificacao.sql`

**O que faz:**
- Verifica se os dados foram inseridos corretamente
- Concede permissões adicionais para usuários autenticados
- Cria políticas de atualização e exclusão
- Mostra resumo das políticas criadas

**Como executar:**
1. Clique em **"+ New Query"** para nova consulta
2. Copie todo o conteúdo do arquivo `supabase-parte3-verificacao.sql`
3. Cole no SQL Editor
4. Clique em **"RUN"** (botão verde ▶️)
5. Verifique os resultados na parte inferior

---

## 🧪 VERIFICAÇÃO FINAL

Após executar todas as partes:

### 1. **Verifique as tabelas:**
- Clique em **"Table Editor"** no menu lateral
- Confirme que todas as tabelas têm dados:
  - `services`: 8 registros
  - `reviews`: 4 registros
  - `space_photos`: 6 registros
  - `contact_info`: 1 registro
  - `featured_videos`: 3 registros

### 2. **Teste o acesso anônimo:**
- Abra uma nova aba anônima no navegador
- Acesse o site: https://buffet-sobral-novo-m0rq7djhu-entregasobrals-projects.vercel.app
- Verifique se:
  - ✅ Serviços carregam na aba "Catálogo"
  - ✅ Avaliações aparecem na aba "Avaliações"
  - ✅ Preços mostram no simulador
  - ✅ Informações de contato estão visíveis

---

## 🆘 EM CASO DE ERROS

### Se aparecer "relation already exists":
```sql
-- Substitua INSERT por UPSERT
INSERT INTO nome_tabela (...) VALUES (...)
ON CONFLICT DO NOTHING;
```

### Se aparecer problemas de permissão:
```sql
-- Conceda permissões manuais
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
```

---

## 🎉 CONCLUÍDO!

Após seguir todos os passos:
- ✅ Banco de dados configurado corretamente
- ✅ Dados reais inseridos
- ✅ Permissões ajustadas
- ✅ Site funcionando com dados reais

Se precisar de ajuda adicional, estou à disposição!