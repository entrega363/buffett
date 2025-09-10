-- Inserir dados de exemplo para testes

-- Limpar dados existentes (opcional, apenas para testes)
-- TRUNCATE TABLE services, reviews, space_photos, featured_videos, contact_info, streaming_config, packages_config;

-- Inserir serviços de exemplo
INSERT INTO services (name, description, price) VALUES
('Buffet Completo', 'Salgados, doces, bebidas e serviço completo', 45.00),
('Bolo Personalizado', 'Bolos temáticos e personalizados para sua festa', 120.00),
('Decoração Temática', 'Decoração completa para todos os tipos de festa', 200.00),
('Coffee Break Corporativo', 'Café, salgados, doces e sucos para eventos empresariais', 25.00),
('Jantar Executivo', 'Menu sofisticado para jantares corporativos e eventos formais', 85.00),
('Coquetel de Confraternização', 'Finger foods, canapés e bebidas para eventos sociais', 35.00),
('Lanche para Eventos', 'Sanduíches, salgados e refrigerantes para eventos casuais', 18.00),
('Churrasco Completo', 'Carnes nobres, acompanhamentos e saladas para confraternizações', 55.00);

-- Inserir avaliações de exemplo
INSERT INTO reviews (name, stars, comment) VALUES
('Maria Silva', 5, 'Excelente atendimento e comida deliciosa! Recomendo muito.'),
('João Oliveira', 4, 'Ótimo buffet, equipe atenciosa. Única coisa que poderia melhorar é a variedade de doces.'),
('Ana Costa', 5, 'Festa perfeita para minha filha. Os organizadores superaram as expectativas!'),
('Carlos Souza', 4, 'Muito bom, ambiente agradável e cardápio variado. Voltaremos com certeza.'),
('Fernanda Lima', 5, 'Serviço impecável e delicioso. Todos os convidados elogiaram muito!'),
('Roberto Santos', 4, 'Bom custo-benefício, recomendo para festas infantis.'),
('Patrícia Almeida', 5, 'Atendimento excepcional e comida de alta qualidade. Parabéns!'),
('Marcos Pereira', 3, 'Bom, mas achei o espaço um pouco apertado para grandes eventos.');

-- Inserir vídeos em destaque (exemplos)
INSERT INTO featured_videos (url, video_id, title) VALUES
('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Tour Virtual pelo Buffet Sobral'),
('https://www.youtube.com/watch?v=jNQXAC9IVRw', 'jNQXAC9IVRw', 'Festa de Aniversário Infantil'),
('https://www.youtube.com/watch?v=9bZkp7q19f0', '9bZkp7q19f0', 'Casamento Realizado no Local');

-- Inserir informações de contato (se não existirem)
INSERT INTO contact_info (whatsapp_number, contact_email, contact_phone)
SELECT '(85) 99999-9999', 'contato@buffetsobral.com', '(85) 99999-9999'
WHERE NOT EXISTS (SELECT 1 FROM contact_info LIMIT 1);

-- Inserir configurações de streaming (se não existirem)
INSERT INTO streaming_config (channel_id, status)
SELECT 'UC_your_channel_id', 'disabled'
WHERE NOT EXISTS (SELECT 1 FROM streaming_config LIMIT 1);

-- Inserir configurações de pacotes (se não existirem)
INSERT INTO packages_config (basic_name, basic_price, basic_description, complete_name, complete_price, complete_description)
SELECT 
  'Pacote Básico', 
  35.00, 
  '✓ Buffet simples
✓ Refrigerantes
✓ Bolo básico',
  'Pacote Completo', 
  55.00, 
  '✓ Buffet completo
✓ Bebidas variadas
✓ Bolo personalizado'
WHERE NOT EXISTS (SELECT 1 FROM packages_config LIMIT 1);