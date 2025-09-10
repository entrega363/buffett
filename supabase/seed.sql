-- Dados de exemplo para o Buffet Sobral

-- Inserir dados de contato
INSERT INTO contact_info (id, whatsapp_number, email, phone, created_at, updated_at) VALUES
(gen_random_uuid(), '(85) 99999-9999', 'contato@buffetsobral.com', '(85) 3333-3333', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Inserir avaliações
INSERT INTO reviews (id, name, stars, comment, date, created_at) VALUES
(gen_random_uuid(), 'Ana Paula', 5, 'Buffet maravilhoso! A festa do meu filho ficou perfeita. Recomendo demais!', '2024-01-14', NOW()),
(gen_random_uuid(), 'Carlos Eduardo', 5, 'Serviço excelente e profissional. Todos os convidados elogiaram a comida e a organização.', '2024-02-20', NOW()),
(gen_random_uuid(), 'Maria Silva', 4, 'Muito bom! A decoração ficou linda e o buffet estava saboroso. Única ressalva foi o atraso na entrega das bebidas.', '2024-03-05', NOW()),
(gen_random_uuid(), 'João Batista', 5, 'Contratei o pacote completo para o casamento da minha filha e tudo saiu perfeito! Equipe atenciosa e comida deliciosa.', '2024-03-22', NOW()),
(gen_random_uuid(), 'Fernanda Costa', 5, 'Excelente opção para eventos corporativos. O coffee break foi um sucesso entre os participantes da reunião.', '2024-04-10', NOW())
ON CONFLICT DO NOTHING;

-- Inserir fotos do espaço
INSERT INTO photos (id, name, image_data, created_at) VALUES
(gen_random_uuid(), 'Salão Principal', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%239c27b0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white"%3ESalão Principal%3C/text%3E%3C/svg%3E', NOW()),
(gen_random_uid(), 'Área Externa', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%234CAF50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white"%3EÁrea Externa%3C/text%3E%3C/svg%3E', NOW()),
(gen_random_uuid(), 'Cozinha Industrial', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%232196F3"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white"%3ECozinha Industrial%3C/text%3E%3C/svg%3E', NOW()),
(gen_random_uuid(), 'Área Kids', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23FF9800"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white"%3EÁrea Kids%3C/text%3E%3C/svg%3E', NOW()),
(gen_random_uuid(), 'Churrasqueira', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23E91E63"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white"%3EChurrasqueira%3C/text%3E%3C/svg%3E', NOW()),
(gen_random_uuid(), 'Estacionamento', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%239E9E9E"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white"%3EEstacionamento%3C/text%3E%3C/svg%3E', NOW())
ON CONFLICT DO NOTHING;

-- Inserir vídeos em destaque
INSERT INTO videos (id, title, url, video_id, created_at) VALUES
(gen_random_uuid(), 'Tour Virtual do Nosso Espaço', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', NOW()),
(gen_random_uuid(), 'Montagem de Decoração Temática', 'https://www.youtube.com/watch?v=tb6nuqYTUIc', 'tb6nuqYTUIc', NOW()),
(gen_random_uuid(), 'Preparação do Buffet Completo', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 'jNQXAC9IVRw', NOW())
ON CONFLICT DO NOTHING;