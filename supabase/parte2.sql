-- PARTE 2: INSERÇÃO DE DADOS INICIAIS
-- Cole esta parte no SQL Editor do Supabase após executar a Parte 1

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