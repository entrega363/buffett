-- PARTE 2: INSERIR DADOS NAS TABELAS
-- Cole esta parte após executar a Parte 1

-- Inserir dados na tabela de serviços
INSERT INTO services (name, description, price, image_url, created_at, updated_at) VALUES
('Buffet Completo', 'Salgados variados, doces sortidos, bebidas não alcoólicas e serviço completo de garçons', 45.00, '', NOW(), NOW()),
('Bolo Personalizado', 'Bolos temáticos e personalizados para aniversários, formaturas e casamentos', 120.00, '', NOW(), NOW()),
('Decoração Temática', 'Decoração completa com balões, painéis, mesas e centros de mesa personalizados', 200.00, '', NOW(), NOW()),
('Coffee Break Corporativo', 'Café premium, salgados variados, doces finos e sucos naturais para reuniões empresariais', 25.00, '', NOW(), NOW()),
('Jantar Executivo', 'Menu sofisticado com entradas, prato principal, sobremesa e bebidas para eventos formais', 85.00, '', NOW(), NOW()),
('Coquetel de Confraternização', 'Finger foods gourmet, canapés, bebidas variadas para confraternizações e happy hours', 35.00, '', NOW(), NOW()),
('Lanche para Eventos', 'Sanduíches naturais, salgados tradicionais, refrigerantes e sucos para eventos casuais', 18.00, '', NOW(), NOW()),
('Churrasco Completo', 'Carnes nobres grelhadas, acompanhamentos variados, saladas frescas e pães artesanais', 55.00, '', NOW(), NOW());

-- Inserir dados na tabela de avaliações
INSERT INTO reviews (name, stars, comment, created_at) VALUES
('Maria Silva', 5, 'Excelente atendimento e comida deliciosa! Recomendo muito.', NOW()),
('João Oliveira', 4, 'Ótimo buffet, equipe atenciosa. Única coisa que poderia melhorar é a variedade de doces.', NOW()),
('Ana Costa', 5, 'Festa perfeita para minha filha. Os organizadores superaram as expectativas!', NOW()),
('Carlos Souza', 4, 'Muito bom, ambiente agradável e cardápio variado. Voltaremos com certeza.', NOW());

-- Inserir dados na tabela de fotos do espaço
INSERT INTO space_photos (name, data, upload_date) VALUES
('Salão Principal', '', NOW()),
('Área Externa', '', NOW()),
('Cozinha Industrial', '', NOW()),
('Área Kids', '', NOW()),
('Churrasqueira', '', NOW()),
('Estacionamento', '', NOW());

-- Inserir dados na tabela de informações de contato
INSERT INTO contact_info (whatsapp_number, contact_email, contact_phone, last_updated) VALUES
('(85) 99999-9999', 'contato@buffetsobral.com', '(85) 99999-9999', NOW());

-- Inserir dados na tabela de vídeos em destaque
INSERT INTO featured_videos (url, video_id, title, added_date) VALUES
('https://www.youtube.com/watch?v=example1', 'example1', 'Tour pelo Buffet Sobral', NOW()),
('https://www.youtube.com/watch?v=example2', 'example2', 'Festa de Aniversário Infantil', NOW()),
('https://www.youtube.com/watch?v=example3', 'example3', 'Casamento Realizado no Local', NOW());