# 📝 INSTRUÇÕES PARA CORRIGIR O SITE BUFFET SOBRAL

## 🎯 Problema Identificado
O site não está funcionando porque há um erro na configuração do cliente Supabase que impede todo o JavaScript de executar corretamente.

## 🔧 Correção Necessária

### Passo 1: Fazer backup do arquivo original
Antes de qualquer modificação, faça uma cópia de segurança do arquivo:
```
Copie index.html para index.backup.html
```

### Passo 2: Localizar e substituir as linhas problemáticas

**Localize esta linha (próximo ao final do arquivo):**
```javascript
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```

**Substitua por:**
```javascript
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```

### Passo 3: Atualizar todas as referências

Encontre e substitua todas as ocorrências de:
```javascript
await supabase.from(
```

Por:
```javascript
await supabaseClient.from(
```

### Passo 4: Linhas específicas para atualizar

Atualize estas 4 funções:

1. **loadServicesFromSupabase():**
   ```javascript
   const { data, error } = await supabaseClient
       .from('services')
       .select('*')
       .order('name');
   ```

2. **loadReviewsFromSupabase():**
   ```javascript
   const { data, error } = await supabaseClient
       .from('reviews')
       .select('*')
       .order('created_at', { ascending: false });
   ```

3. **loadSpacePhotosFromSupabase():**
   ```javascript
   const { data, error } = await supabaseClient
       .from('space_photos')
       .select('*')
       .order('created_at', { ascending: false });
   ```

4. **loadContactInfoFromSupabase():**
   ```javascript
   const { data, error } = await supabaseClient
       .from('contact_info')
       .select('*')
       .limit(1);
   ```

### Passo 5: Usar o arquivo corrigido

Como alternativa, você pode substituir o final do seu arquivo `index.html` pelo conteúdo do arquivo `index-supabase-corrigido.html` que criei.

### Passo 6: Testar a correção

1. Salve o arquivo modificado
2. Recarregue o site no navegador
3. Verifique se:
   - ✅ Os botões respondem ao clique
   - ✅ A navegação entre abas funciona
   - ✅ O simulador de orçamento opera normalmente
   - ✅ Os dados são carregados do Supabase

## 🆘 Se ainda não funcionar

Se após a correção o site ainda não funcionar:

1. Verifique se há outros erros no console do navegador (F12)
2. Confirme se a conexão com a internet está funcionando
3. Verifique se o Supabase está acessível
4. Teste com o arquivo `pagina-teste-debug.html` que criei para diagnóstico

## ⏱️ Tempo estimado
A correção leva menos de 5 minutos para ser aplicada por alguém com acesso ao código.

---
*Esta correção resolve o problema principal que estava impedindo o funcionamento do site.*