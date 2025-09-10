-- PARTE 1: CRIAR POLÍTICAS RLS PARA LEITURA PÚBLICA
-- Cole esta parte primeiro no SQL Editor do Supabase

-- Habilitar RLS (Row Level Security) para todas as tabelas
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE space_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_videos ENABLE ROW LEVEL SECURITY;

-- Criar políticas de leitura pública para todas as tabelas
CREATE POLICY "Permitir leitura pública"
ON services FOR SELECT
USING (true);

CREATE POLICY "Permitir leitura pública"
ON reviews FOR SELECT
USING (true);

CREATE POLICY "Permitir leitura pública"
ON space_photos FOR SELECT
USING (true);

CREATE POLICY "Permitir leitura pública"
ON contact_info FOR SELECT
USING (true);

CREATE POLICY "Permitir leitura pública"
ON featured_videos FOR SELECT
USING (true);

-- Conceder permissões de leitura para usuários anônimos
GRANT SELECT ON services TO anon;
GRANT SELECT ON reviews TO anon;
GRANT SELECT ON space_photos TO anon;
GRANT SELECT ON contact_info TO anon;
GRANT SELECT ON featured_videos TO anon;

-- Verificar se as políticas foram criadas
SELECT tablename, policyname, roles, action 
FROM pg_policies 
WHERE tablename IN ('services', 'reviews', 'space_photos', 'contact_info', 'featured_videos');