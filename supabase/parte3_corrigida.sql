-- PARTE 3: CONFIGURAÇÃO DE POLÍTICAS DE SEGURANÇA E ÍNDICES (VERSÃO CORRIGIDA)
-- Cole esta parte no SQL Editor do Supabase após executar as Partes 1 e 2

-- Criar políticas de segurança para acesso anônimo de leitura
-- Isso permite que usuários anônimos leiam os dados, mas não possam escrever
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE space_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaming_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages_config ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura anônima das informações de contato
CREATE POLICY "Permitir leitura pública das informações de contato" ON contact_info
FOR SELECT USING (true);

-- Política para permitir leitura anônima dos serviços
CREATE POLICY "Permitir leitura pública dos serviços" ON services
FOR SELECT USING (true);

-- Política para permitir leitura anônima das avaliações
CREATE POLICY "Permitir leitura pública das avaliações" ON reviews
FOR SELECT USING (true);

-- Política para permitir leitura anônima das fotos do espaço
CREATE POLICY "Permitir leitura pública das fotos do espaço" ON space_photos
FOR SELECT USING (true);

-- Política para permitir leitura anônima dos vídeos em destaque
CREATE POLICY "Permitir leitura pública dos vídeos em destaque" ON featured_videos
FOR SELECT USING (true);

-- Política para permitir leitura anônima das configurações de streaming
CREATE POLICY "Permitir leitura pública das configurações de streaming" ON streaming_config
FOR SELECT USING (true);

-- Política para permitir leitura anônima das configurações de pacotes
CREATE POLICY "Permitir leitura pública das configurações de pacotes" ON packages_config
FOR SELECT USING (true);

-- Conceder acesso de leitura para usuários autenticados e anônimos
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE services TO anon, authenticated;
GRANT SELECT ON TABLE reviews TO anon, authenticated;
GRANT SELECT ON TABLE space_photos TO anon, authenticated;
GRANT SELECT ON TABLE featured_videos TO anon, authenticated;
GRANT SELECT ON TABLE contact_info TO anon, authenticated;
GRANT SELECT ON TABLE streaming_config TO anon, authenticated;
GRANT SELECT ON TABLE packages_config TO anon, authenticated;

-- Criar função para atualizar o campo updated_at automaticamente (se não existir)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Remover trigger existente se houver e criar novamente
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE
ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_services_name ON services(name);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_space_photos_upload_date ON space_photos(upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_featured_videos_added_date ON featured_videos(added_date DESC);

-- Exibir mensagem de confirmação
SELECT 'Banco de dados configurado com sucesso!' as message;