-- Criar tabelas para o Buffet Sobral

-- Tabela de serviços
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de fotos do espaço
CREATE TABLE IF NOT EXISTS space_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  data TEXT NOT NULL, -- Base64 encoded image data
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de vídeos em destaque
CREATE TABLE IF NOT EXISTS featured_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  video_id TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  added_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de informações de contato
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  whatsapp_number VARCHAR(50),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações de streaming
CREATE TABLE IF NOT EXISTS streaming_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'disabled',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações de pacotes
CREATE TABLE IF NOT EXISTS packages_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  basic_name VARCHAR(255) DEFAULT 'Pacote Básico',
  basic_price DECIMAL(10,2) DEFAULT 35.00,
  basic_description TEXT DEFAULT '✓ Buffet simples
✓ Refrigerantes
✓ Bolo básico',
  complete_name VARCHAR(255) DEFAULT 'Pacote Completo',
  complete_price DECIMAL(10,2) DEFAULT 55.00,
  complete_description TEXT DEFAULT '✓ Buffet completo
✓ Bebidas variadas
✓ Bolo personalizado',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados iniciais

-- Inserir alguns serviços padrão
INSERT INTO services (name, description, price, image_url) VALUES
('Buffet Completo', 'Salgados, doces, bebidas e serviço completo', 45.00, ''),
('Bolo Personalizado', 'Bolos temáticos e personalizados para sua festa', 120.00, ''),
('Decoração Temática', 'Decoração completa para todos os tipos de festa', 200.00, ''),
('Coffee Break Corporativo', 'Café, salgados, doces e sucos para eventos empresariais', 25.00, ''),
('Jantar Executivo', 'Menu sofisticado para jantares corporativos e eventos formais', 85.00, ''),
('Coquetel de Confraternização', 'Finger foods, canapés e bebidas para eventos sociais', 35.00, ''),
('Lanche para Eventos', 'Sanduíches, salgados e refrigerantes para eventos casuais', 18.00, ''),
('Churrasco Completo', 'Carnes nobres, acompanhamentos e saladas para confraternizações', 55.00, '');

-- Inserir algumas avaliações de exemplo
INSERT INTO reviews (name, stars, comment) VALUES
('Maria Silva', 5, 'Excelente atendimento e comida deliciosa! Recomendo muito.'),
('João Oliveira', 4, 'Ótimo buffet, equipe atenciosa. Única coisa que poderia melhorar é a variedade de doces.'),
('Ana Costa', 5, 'Festa perfeita para minha filha. Os organizadores superaram as expectativas!'),
('Carlos Souza', 4, 'Muito bom, ambiente agradável e cardápio variado. Voltaremos com certeza.');

-- Inserir algumas fotos do espaço (dados fictícios)
INSERT INTO space_photos (name, data) VALUES
('Salão Principal', ''),
('Área Externa', ''),
('Cozinha Industrial', ''),
('Área Kids', ''),
('Churrasqueira', ''),
('Estacionamento', '');

-- Inserir vídeos em destaque (exemplos)
INSERT INTO featured_videos (url, video_id, title) VALUES
('https://www.youtube.com/watch?v=example1', 'example1', 'Tour pelo Buffet Sobral'),
('https://www.youtube.com/watch?v=example2', 'example2', 'Festa de Aniversário Infantil'),
('https://www.youtube.com/watch?v=example3', 'example3', 'Casamento Realizado no Local');

-- Inserir informações de contato iniciais
INSERT INTO contact_info (whatsapp_number, contact_email, contact_phone) VALUES
('(85) 99999-9999', 'contato@buffetsobral.com', '(85) 99999-9999');

-- Inserir configurações de streaming iniciais
INSERT INTO streaming_config (channel_id, status) VALUES
('UC_your_channel_id', 'disabled');

-- Inserir configurações de pacotes iniciais
INSERT INTO packages_config (basic_name, basic_price, basic_description, complete_name, complete_price, complete_description) VALUES
('Pacote Básico', 35.00, '✓ Buffet simples
✓ Refrigerantes
✓ Bolo básico', 'Pacote Completo', 55.00, '✓ Buffet completo
✓ Bebidas variadas
✓ Bolo personalizado');

-- Criar políticas de segurança para acesso anônimo de leitura (opcional, ajuste conforme necessário)
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

-- Criar função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Adicionar trigger para atualizar o campo updated_at na tabela services
CREATE TRIGGER update_services_updated_at BEFORE UPDATE
ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_services_name ON services(name);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_space_photos_upload_date ON space_photos(upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_featured_videos_added_date ON featured_videos(added_date DESC);

-- Exibir mensagem de confirmação
SELECT 'Banco de dados configurado com sucesso!' as message;