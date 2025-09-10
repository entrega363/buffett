// Script de migração de dados do localStorage para Supabase
import supabase from './client.js';
import {
  ServicesService,
  ContactService,
  PackagesService,
  ReviewsService,
  PhotosService,
  VideosService,
  AdminsService
} from './services.js';

// Função para migrar serviços do localStorage para Supabase
export async function migrateServices() {
  try {
    const servicesData = localStorage.getItem('servicesData');
    if (!servicesData) {
      console.log('Nenhum dado de serviços encontrado no localStorage');
      return;
    }

    const services = JSON.parse(servicesData);
    console.log('Migrando serviços:', services);

    // Migrar cada serviço
    for (const [serviceId, serviceData] of Object.entries(services)) {
      const serviceInfo = getServiceInfoById(serviceId);
      if (serviceInfo) {
        const newService = {
          id: serviceId,
          name: serviceInfo.name,
          description: serviceInfo.description,
          price: serviceData.price || serviceInfo.defaultPrice,
          image_url: serviceData.image || null,
          category: 'buffet', // Categoria padrão
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        try {
          await ServicesService.create(newService);
          console.log(`Serviço ${serviceId} migrado com sucesso`);
        } catch (error) {
          console.error(`Erro ao migrar serviço ${serviceId}:`, error);
        }
      }
    }

    console.log('Migração de serviços concluída');
  } catch (error) {
    console.error('Erro durante a migração de serviços:', error);
  }
}

// Função para migrar informações de contato
export async function migrateContactInfo() {
  try {
    const contactData = localStorage.getItem('contactInfo');
    if (!contactData) {
      console.log('Nenhum dado de contato encontrado no localStorage');
      return;
    }

    const contactInfo = JSON.parse(contactData);
    console.log('Migrando informações de contato:', contactInfo);

    const newContactInfo = {
      whatsapp_number: contactInfo.whatsappNumber || null,
      email: contactInfo.contactEmail || null,
      phone: contactInfo.contactPhone || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      await ContactService.upsert(newContactInfo);
      console.log('Informações de contato migradas com sucesso');
    } catch (error) {
      console.error('Erro ao migrar informações de contato:', error);
    }

    console.log('Migração de informações de contato concluída');
  } catch (error) {
    console.error('Erro durante a migração de informações de contato:', error);
  }
}

// Função para migrar pacotes
export async function migratePackages() {
  try {
    const packagesConfig = localStorage.getItem('packagesConfig');
    if (!packagesConfig) {
      console.log('Nenhum dado de pacotes encontrado no localStorage');
      return;
    }

    const packages = JSON.parse(packagesConfig);
    console.log('Migrando pacotes:', packages);

    // Migrar pacote básico
    if (packages.basic) {
      const basicPackage = {
        name: packages.basic.name || 'Pacote Básico',
        price: packages.basic.price || 35,
        description: packages.basic.description || 'Buffet simples
Refrigerantes
Bolo básico',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      try {
        await PackagesService.create(basicPackage);
        console.log('Pacote básico migrado com sucesso');
      } catch (error) {
        console.error('Erro ao migrar pacote básico:', error);
      }
    }

    // Migrar pacote completo
    if (packages.complete) {
      const completePackage = {
        name: packages.complete.name || 'Pacote Completo',
        price: packages.complete.price || 55,
        description: packages.complete.description || 'Buffet completo
Bebidas variadas
Bolo personalizado',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      try {
        await PackagesService.create(completePackage);
        console.log('Pacote completo migrado com sucesso');
      } catch (error) {
        console.error('Erro ao migrar pacote completo:', error);
      }
    }

    console.log('Migração de pacotes concluída');
  } catch (error) {
    console.error('Erro durante a migração de pacotes:', error);
  }
}

// Função para migrar avaliações
export async function migrateReviews() {
  try {
    const reviewsData = localStorage.getItem('reviews');
    if (!reviewsData) {
      console.log('Nenhum dado de avaliações encontrado no localStorage');
      return;
    }

    const reviews = JSON.parse(reviewsData);
    console.log('Migrando avaliações:', reviews);

    // Migrar cada avaliação
    for (const review of reviews) {
      const newReview = {
        name: review.name || 'Cliente',
        stars: review.stars || 5,
        comment: review.comment || '',
        date: review.date ? new Date(review.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString()
      };

      try {
        await ReviewsService.create(newReview);
        console.log(`Avaliação de ${review.name} migrada com sucesso`);
      } catch (error) {
        console.error(`Erro ao migrar avaliação de ${review.name}:`, error);
      }
    }

    console.log('Migração de avaliações concluída');
  } catch (error) {
    console.error('Erro durante a migração de avaliações:', error);
  }
}

// Função para migrar fotos
export async function migratePhotos() {
  try {
    const spacePhotosData = localStorage.getItem('spacePhotos');
    if (!spacePhotosData) {
      console.log('Nenhum dado de fotos encontrado no localStorage');
      return;
    }

    const spacePhotos = JSON.parse(spacePhotosData);
    console.log('Migrando fotos:', spacePhotos);

    // Migrar cada foto
    for (const photo of spacePhotos) {
      const newPhoto = {
        name: photo.name || 'Foto do Espaço',
        image_data: photo.data || null,
        created_at: photo.uploadDate ? new Date(photo.uploadDate).toISOString() : new Date().toISOString()
      };

      try {
        await PhotosService.create(newPhoto);
        console.log(`Foto ${photo.name} migrada com sucesso`);
      } catch (error) {
        console.error(`Erro ao migrar foto ${photo.name}:`, error);
      }
    }

    console.log('Migração de fotos concluída');
  } catch (error) {
    console.error('Erro durante a migração de fotos:', error);
  }
}

// Função para migrar vídeos
export async function migrateVideos() {
  try {
    const featuredVideosData = localStorage.getItem('featuredVideos');
    if (!featuredVideosData) {
      console.log('Nenhum dado de vídeos encontrado no localStorage');
      return;
    }

    const featuredVideos = JSON.parse(featuredVideosData);
    console.log('Migrando vídeos:', featuredVideos);

    // Migrar cada vídeo
    for (const video of featuredVideos) {
      const newVideo = {
        title: video.title || 'Vídeo em Destaque',
        url: video.url || `https://www.youtube.com/watch?v=${video.videoId}`,
        video_id: video.videoId || '',
        created_at: video.addedDate ? new Date(video.addedDate).toISOString() : new Date().toISOString()
      };

      try {
        await VideosService.create(newVideo);
        console.log(`Vídeo ${video.title} migrado com sucesso`);
      } catch (error) {
        console.error(`Erro ao migrar vídeo ${video.title}:`, error);
      }
    }

    console.log('Migração de vídeos concluída');
  } catch (error) {
    console.error('Erro durante a migração de vídeos:', error);
  }
}

// Função para migrar administradores
export async function migrateAdmins() {
  try {
    const adminsData = localStorage.getItem('admins');
    if (!adminsData) {
      console.log('Nenhum dado de administradores encontrado no localStorage');
      return;
    }

    const admins = JSON.parse(adminsData);
    console.log('Migrando administradores:', admins);

    // Migrar cada administrador
    for (const admin of admins) {
      const newAdmin = {
        name: admin.name || 'Administrador',
        email: admin.email || '',
        password: admin.password || '', // Note: Em produção, isso deve ser hasheado
        role: admin.role || 'admin',
        status: admin.status || 'active',
        created_at: admin.createdAt ? new Date(admin.createdAt).toISOString() : new Date().toISOString()
      };

      try {
        await AdminsService.create(newAdmin);
        console.log(`Administrador ${admin.name} migrado com sucesso`);
      } catch (error) {
        console.error(`Erro ao migrar administrador ${admin.name}:`, error);
      }
    }

    console.log('Migração de administradores concluída');
  } catch (error) {
    console.error('Erro durante a migração de administradores:', error);
  }
}

// Função auxiliar para obter informações do serviço pelo ID
function getServiceInfoById(serviceId) {
  const serviceMap = {
    'buffet-completo': {
      name: 'Buffet Completo',
      description: 'Salgados, doces, bebidas e serviço completo',
      defaultPrice: 45
    },
    'bolo-personalizado': {
      name: 'Bolo Personalizado',
      description: 'Bolos temáticos e personalizados para sua festa',
      defaultPrice: 120
    },
    'decoracao-tematica': {
      name: 'Decoração Temática',
      description: 'Decoração completa para todos os tipos de festa',
      defaultPrice: 200
    },
    'coffee-break': {
      name: 'Coffee Break Corporativo',
      description: 'Café, salgados, doces e sucos para eventos empresariais',
      defaultPrice: 25
    },
    'jantar-executivo': {
      name: 'Jantar Executivo',
      description: 'Menu sofisticado para jantares corporativos e eventos formais',
      defaultPrice: 85
    },
    'coquetel-confraternizacao': {
      name: 'Coquetel de Confraternização',
      description: 'Finger foods, canapés e bebidas para eventos sociais',
      defaultPrice: 35
    },
    'lanche-eventos': {
      name: 'Lanche para Eventos',
      description: 'Sanduíches, salgados e refrigerantes para eventos casuais',
      defaultPrice: 18
    },
    'churrasco-completo': {
      name: 'Churrasco Completo',
      description: 'Carnes nobres, acompanhamentos e saladas para confraternizações',
      defaultPrice: 55
    }
  };

  return serviceMap[serviceId] || null;
}

// Função para executar todas as migrações
export async function runAllMigrations() {
  console.log('Iniciando migração de todos os dados...');
  
  await migrateServices();
  await migrateContactInfo();
  await migratePackages();
  await migrateReviews();
  await migratePhotos();
  await migrateVideos();
  await migrateAdmins();
  
  console.log('Todas as migrações concluídas!');
}

export default {
  migrateServices,
  migrateContactInfo,
  migratePackages,
  migrateReviews,
  migratePhotos,
  migrateVideos,
  migrateAdmins,
  runAllMigrations
};