// Integração do site principal com o Supabase
import supabase from './client.js';
import {
  ServicesService,
  ContactService,
  EventsService,
  PackagesService,
  ReviewsService,
  PhotosService,
  VideosService
} from './services.js';

// Função para carregar dados do site do Supabase
export async function loadSiteData() {
  try {
    // Carregar serviços
    const services = await ServicesService.getAll();
    updateServicesOnPage(services);
    
    // Carregar informações de contato
    const contactInfo = await ContactService.get();
    if (contactInfo) {
      updateContactInfoOnPage(contactInfo);
    }
    
    // Carregar pacotes
    const packages = await PackagesService.getAll();
    updatePackagesOnPage(packages);
    
    // Carregar avaliações
    const reviews = await ReviewsService.getAll();
    updateReviewsOnPage(reviews);
    
    // Carregar fotos
    const photos = await PhotosService.getAll();
    updatePhotosOnPage(photos);
    
    // Carregar vídeos
    const videos = await VideosService.getAll();
    updateVideosOnPage(videos);
    
    console.log('Dados do site carregados com sucesso do Supabase');
  } catch (error) {
    console.error('Erro ao carregar dados do site do Supabase:', error);
  }
}

// Função para atualizar serviços na página
function updateServicesOnPage(services) {
  // Atualizar serviços no simulador
  services.forEach(service => {
    const serviceElement = document.querySelector(`[data-service="${service.id}"]`);
    if (serviceElement) {
      // Atualizar preço se foi modificado
      const priceElement = serviceElement.closest('.service-card')?.querySelector('.service-price');
      if (priceElement && service.price) {
        priceElement.textContent = `R$ ${service.price}/pessoa`;
      }
      
      // Atualizar imagem se foi carregada
      if (service.image_url) {
        const imagePlaceholder = serviceElement.querySelector('.service-image-placeholder');
        if (imagePlaceholder) {
          imagePlaceholder.style.backgroundImage = `url(${service.image_url})`;
          imagePlaceholder.innerHTML = '';
        }
      }
    }
  });
}

// Função para atualizar informações de contato na página
function updateContactInfoOnPage(contactInfo) {
  // Atualizar número do WhatsApp nos botões de orçamento
  const whatsappButtons = document.querySelectorAll('[onclick*="shareWhatsApp"]');
  whatsappButtons.forEach(button => {
    const onclick = button.getAttribute('onclick');
    if (onclick && contactInfo.whatsapp_number) {
      // Extrair o número atual do onclick
      const match = onclick.match(/https:\/\/wa\.me\/(\d+)/);
      if (match) {
        // Remover todos os caracteres não numéricos e adicionar o código do país (55)
        const formattedNumber = contactInfo.whatsapp_number.replace(/\D/g, '');
        if (formattedNumber.length >= 10) {
          const fullNumber = '55' + formattedNumber;
          const newOnclick = onclick.replace(/https:\/\/wa\.me\/\d+/, `https://wa.me/${fullNumber}`);
          button.setAttribute('onclick', newOnclick);
        }
      }
    }
  });
  
  // Atualizar email de contato se existir
  if (contactInfo.email) {
    const emailElements = document.querySelectorAll('[href^="mailto:"]');
    emailElements.forEach(element => {
      element.href = `mailto:${contactInfo.email}`;
      element.textContent = contactInfo.email;
    });
  }
  
  // Atualizar telefone de contato se existir
  if (contactInfo.phone) {
    const phoneElements = document.querySelectorAll('[href^="tel:"]');
    phoneElements.forEach(element => {
      const formattedPhone = contactInfo.phone.replace(/\D/g, '');
      element.href = `tel:+55${formattedPhone}`;
      element.textContent = contactInfo.phone;
    });
  }
}

// Função para atualizar pacotes na página
function updatePackagesOnPage(packages) {
  const packagesContainer = document.getElementById('packagesContainer');
  if (!packagesContainer || packages.length === 0) return;
  
  // Limpar container
  packagesContainer.innerHTML = '';
  
  // Adicionar pacotes
  packages.forEach(pkg => {
    const packageElement = document.createElement('div');
    packageElement.className = 'package-card';
    packageElement.innerHTML = `
      <div class="package-header">
        <div class="package-name">${pkg.name}</div>
        <div class="package-price">R$ ${pkg.price}/pessoa</div>
      </div>
      <div>${pkg.description.replace(/\n/g, '<br>')}</div>
      <button class="whatsapp-btn" onclick="sharePackageWhatsApp('${pkg.name}', ${pkg.price})" style="margin-top: 15px; width: 100%;">
        📱 Fechar Orçamento no WhatsApp
      </button>
    `;
    packagesContainer.appendChild(packageElement);
  });
}

// Função para atualizar avaliações na página
function updateReviewsOnPage(reviews) {
  const reviewsContainer = document.getElementById('reviewsContainer');
  if (!reviewsContainer || reviews.length === 0) return;
  
  // Calcular média de estrelas
  const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
  const averageStars = (totalStars / reviews.length).toFixed(1);
  
  // Ordenar avaliações por data (mais recente primeiro)
  reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  reviewsContainer.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
      <div style="font-size: 1.5rem; color: #ffc107;">${'⭐'.repeat(Math.floor(averageStars))}${'☆'.repeat(5 - Math.floor(averageStars))}</div>
      <div>${averageStars}/5 (${reviews.length} avaliações)</div>
    </div>
    
    ${reviews.map(review => {
      // Converter número de estrelas em ícones
      const stars = '⭐'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
      
      return `
        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong>${review.name || 'Cliente'}</strong>
            <span style="color: #999;">${review.date || new Date(review.created_at).toLocaleDateString('pt-BR')}</span>
          </div>
          <div style="color: #ffc107; margin-bottom: 10px;">
            ${stars}
          </div>
          ${review.comment ? `<p>${review.comment}</p>` : ''}
        </div>
      `;
    }).join('')}
  `;
}

// Função para atualizar fotos na página
function updatePhotosOnPage(photos) {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid || photos.length === 0) return;
  
  // Limpar grid
  galleryGrid.innerHTML = '';
  
  // Adicionar fotos
  photos.forEach(photo => {
    const photoElement = document.createElement('div');
    photoElement.className = 'gallery-item';
    photoElement.innerHTML = `
      <img src="${photo.image_data}" alt="${photo.name}" onclick="showImage('${photo.id}')">
    `;
    galleryGrid.appendChild(photoElement);
  });
}

// Função para atualizar vídeos na página
function updateVideosOnPage(videos) {
  const videosContainer = document.getElementById('featuredVideosContainer');
  if (!videosContainer || videos.length === 0) {
    videosContainer.innerHTML = `
      <p style="text-align: center; color: #666; padding: 40px 20px;">
        Nenhum vídeo adicionado ainda. Volte mais tarde!
      </p>
    `;
    return;
  }
  
  videosContainer.innerHTML = `
    <div class="services-grid">
      ${videos.map(video => `
        <div class="service-card">
          <div style="position: relative; padding-top: 56.25%; border-radius: 12px 12px 0 0; overflow: hidden;">
            <iframe 
              src="https://www.youtube.com/embed/${video.video_id}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            </iframe>
          </div>
          <div class="service-content">
            <h3 class="service-title">${video.title}</h3>
            <button class="btn-add" onclick="showVideoModal('${video.video_id}', '${video.title}')">
              Assistir em tela cheia
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Função para configurar atualizações em tempo real
export function setupRealtimeUpdates() {
  // Escutar atualizações de serviços
  const servicesSubscription = supabase
    .channel('services-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'services',
      },
      (payload) => {
        updateServicesOnPage([payload.new]);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'services',
      },
      (payload) => {
        updateServicesOnPage([payload.new]);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'services',
      },
      (payload) => {
        // Remover serviço da página
        const serviceElement = document.querySelector(`[data-service="${payload.old.id}"]`);
        if (serviceElement) {
          serviceElement.closest('.service-card').remove();
        }
      }
    )
    .subscribe();

  // Escutar atualizações de informações de contato
  const contactSubscription = supabase
    .channel('contact-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'contact_info',
      },
      (payload) => {
        updateContactInfoOnPage(payload.new);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'contact_info',
      },
      (payload) => {
        updateContactInfoOnPage(payload.new);
      }
    )
    .subscribe();

  return [servicesSubscription, contactSubscription];
}

// Função para limpar subscrições em tempo real
export function cleanupRealtimeUpdates(subscriptions) {
  subscriptions.forEach(subscription => {
    supabase.removeChannel(subscription);
  });
}

export default {
  loadSiteData,
  setupRealtimeUpdates,
  cleanupRealtimeUpdates
};