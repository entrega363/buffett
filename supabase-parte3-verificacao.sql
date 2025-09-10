-- PARTE 3: VERIFICAÇÃO E PERMISSÕES FINAIS
-- Cole esta parte após executar as Partes 1 e 2

-- Verificar se os dados foram inseridos corretamente
SELECT 'services' as tabela, COUNT(*) as registros FROM services
UNION ALL
SELECT 'reviews' as tabela, COUNT(*) as registros FROM reviews
UNION ALL
SELECT 'space_photos' as tabela, COUNT(*) as registros FROM space_photos
UNION ALL
SELECT 'contact_info' as tabela, COUNT(*) as registros FROM contact_info
UNION ALL
SELECT 'featured_videos' as tabela, COUNT(*) as registros FROM featured_videos;

-- Conceder permissões adicionais para usuários autenticados (se necessário)
GRANT ALL ON services TO authenticated;
GRANT ALL ON reviews TO authenticated;
GRANT ALL ON space_photos TO authenticated;
GRANT ALL ON contact_info TO authenticated;
GRANT ALL ON featured_videos TO authenticated;

-- Criar políticas para usuários autenticados (se necessário)
CREATE POLICY "Permitir inserção administrativa"
ON services FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir inserção administrativa"
ON reviews FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir inserção administrativa"
ON space_photos FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir inserção administrativa"
ON contact_info FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir inserção administrativa"
ON featured_videos FOR INSERT
WITH CHECK (true);

-- Criar políticas de atualização para usuários autenticados
CREATE POLICY "Permitir atualização administrativa"
ON services FOR UPDATE
USING (true);

CREATE POLICY "Permitir atualização administrativa"
ON reviews FOR UPDATE
USING (true);

CREATE POLICY "Permitir atualização administrativa"
ON space_photos FOR UPDATE
USING (true);

CREATE POLICY "Permitir atualização administrativa"
ON contact_info FOR UPDATE
USING (true);

CREATE POLICY "Permitir atualização administrativa"
ON featured_videos FOR UPDATE
USING (true);

-- Criar políticas de exclusão para usuários autenticados
CREATE POLICY "Permitir exclusão administrativa"
ON services FOR DELETE
USING (true);

CREATE POLICY "Permitir exclusão administrativa"
ON reviews FOR DELETE
USING (true);

CREATE POLICY "Permitir exclusão administrativa"
ON space_photos FOR DELETE
USING (true);

CREATE POLICY "Permitir exclusão administrativa"
ON contact_info FOR DELETE
USING (true);

CREATE POLICY "Permitir exclusão administrativa"
ON featured_videos FOR DELETE
USING (true);

-- Verificar todas as políticas criadas
SELECT tablename, policyname, roles, action 
FROM pg_policies 
WHERE tablename IN ('services', 'reviews', 'space_photos', 'contact_info', 'featured_videos')
ORDER BY tablename, policyname;

-- Mensagem de conclusão
/*
🎉 CONFIGURAÇÃO CONCLUÍDA!

Agora o site Buffet Sobral deve carregar todos os dados corretamente.

Instruções para o site:
1. O site usa credenciais anônimas para leitura dos dados
2. Para atualizações administrativas, use credenciais de serviço (Service Role Key)
3. Os dados podem ser atualizados diretamente pelo painel do Supabase

Para verificar se está funcionando:
- Acesse o site e verifique se os serviços, avaliações e outras seções carregam
- Confirme que os botões de navegação funcionam
- Verifique se o simulador de orçamento mostra os preços corretos
*/