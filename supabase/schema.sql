-- Esquema do banco de dados para o Buffet Sobral

-- Tabela de Serviços
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Informações de Contato
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  whatsapp_number VARCHAR(20),
  email VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Eventos (associação entre serviços e tipos de eventos)
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- birthday, wedding, graduation, corporate
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Pacotes
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Avaliações
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  stars INTEGER CHECK (stars >= 1 AND stars <= 5),
  comment TEXT,
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Fotos
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  image_data TEXT, -- Base64 encoded image or URL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Vídeos
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  video_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Administradores
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- Hashed password
  role VARCHAR(50) DEFAULT 'admin', -- admin, master
  status VARCHAR(50) DEFAULT 'active', -- active, suspended
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_events_service_id ON events(service_id);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_status ON admins(status);

-- Gatilhos para atualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at BEFORE UPDATE
ON services FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE
ON contact_info FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE
ON packages FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados iniciais para serviços
INSERT INTO services (id, name, description, price, category, created_at, updated_at) VALUES
('buffet-completo', 'Buffet Completo', 'Salgados, doces, bebidas e serviço completo', 45.00, 'buffet', NOW(), NOW()),
('bolo-personalizado', 'Bolo Personalizado', 'Bolos temáticos e personalizados para sua festa', 120.00, 'cake', NOW(), NOW()),
('decoracao-tematica', 'Decoração Temática', 'Decoração completa para todos os tipos de festa', 200.00, 'decoration', NOW(), NOW()),
('coffee-break', 'Coffee Break Corporativo', 'Café, salgados, doces e sucos para eventos empresariais', 25.00, 'corporate', NOW(), NOW()),
('jantar-executivo', 'Jantar Executivo', 'Menu sofisticado para jantares corporativos e eventos formais', 85.00, 'dinner', NOW(), NOW()),
('coquetel-confraternizacao', 'Coquetel de Confraternização', 'Finger foods, canapés e bebidas para eventos sociais', 35.00, 'cocktail', NOW(), NOW()),
('lanche-eventos', 'Lanche para Eventos', 'Sanduíches, salgados e refrigerantes para eventos casuais', 18.00, 'snack', NOW(), NOW()),
('churrasco-completo', 'Churrasco Completo', 'Carnes nobres, acompanhamentos e saladas para confraternizações', 55.00, 'barbecue', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Inserir dados iniciais para eventos (associações)
INSERT INTO events (service_id, event_type, created_at) VALUES
-- Buffet Completo
('buffet-completo', 'birthday', NOW()),
('buffet-completo', 'wedding', NOW()),
('buffet-completo', 'graduation', NOW()),
('buffet-completo', 'corporate', NOW()),

-- Bolo Personalizado
('bolo-personalizado', 'birthday', NOW()),
('bolo-personalizado', 'wedding', NOW()),
('bolo-personalizado', 'graduation', NOW()),

-- Decoração Temática
('decoracao-tematica', 'birthday', NOW()),
('decoracao-tematica', 'wedding', NOW()),
('decoracao-tematica', 'graduation', NOW()),
('decoracao-tematica', 'corporate', NOW()),

-- Coffee Break Corporativo
('coffee-break', 'corporate', NOW()),

-- Jantar Executivo
('jantar-executivo', 'wedding', NOW()),
('jantar-executivo', 'corporate', NOW()),

-- Coquetel de Confraternização
('coquetel-confraternizacao', 'corporate', NOW()),
('coquetel-confraternizacao', 'birthday', NOW()),

-- Lanche para Eventos
('lanche-eventos', 'birthday', NOW()),
('lanche-eventos', 'graduation', NOW()),

-- Churrasco Completo
('churrasco-completo', 'birthday', NOW()),
('churrasco-completo', 'wedding', NOW()),
('churrasco-completo', 'graduation', NOW()),
('churrasco-completo', 'corporate', NOW())
ON CONFLICT DO NOTHING;

-- Inserir dados iniciais para pacotes
INSERT INTO packages (id, name, price, description, created_at, updated_at) VALUES
('pacote-basico', 'Pacote Básico', 35.00, '✓ Buffet simples
✓ Refrigerantes
✓ Bolo básico', NOW(), NOW()),
('pacote-completo', 'Pacote Completo', 55.00, '✓ Buffet completo
✓ Bebidas variadas
✓ Bolo personalizado', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Inserir administrador master
INSERT INTO admins (id, name, email, password, role, status, created_at) VALUES
('master-admin', 'José Técnico', 'josetecnico21@gmail.com', 'tenderbr0', 'master', 'active', NOW())
ON CONFLICT (email) DO NOTHING;