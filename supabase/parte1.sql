-- PARTE 1: CRIAÇÃO DAS TABELAS
-- Cole esta parte no SQL Editor do Supabase primeiro

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