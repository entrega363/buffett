// Integração do painel administrativo com Supabase
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
import { login, logout, register, getCurrentUser } from './auth.js';

// Função para carregar dados do painel administrativo do Supabase
export async function loadAdminData() {
  try {
    // Carregar serviços
    const services = await ServicesService.getAll();
    updateServicesOnAdminPanel(services);
    
    // Carregar informações de contato
    const contactInfo = await ContactService.get();
    if (contactInfo) {
      updateContactInfoOnAdminPanel(contactInfo);
    }
    
    // Carregar pacotes
    const packages = await PackagesService.getAll();
    updatePackagesOnAdminPanel(packages);
    
    // Carregar avaliações
    const reviews = await ReviewsService.getAll();
    updateReviewsOnAdminPanel(reviews);
    
    // Carregar fotos
    const photos = await PhotosService.getAll();
    updatePhotosOnAdminPanel(photos);
    
    // Carregar vídeos
    const videos = await VideosService.getAll();
    updateVideosOnAdminPanel(videos);
    
    // Carregar administradores (somente se usuário for master)
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.role === 'master') {
      const admins = await AdminsService.getAll();
      updateAdminsOnAdminPanel(admins);
    }
    
    console.log('Dados do painel administrativo carregados com sucesso do Supabase');
  } catch (error) {
    console.error('Erro ao carregar dados do painel administrativo do Supabase:', error);
  }
}

// Função para atualizar serviços no painel administrativo
function updateServicesOnAdminPanel(services) {
  const servicesList = document.getElementById('servicesList');
  if (!servicesList) return;
  
  // Atualizar lista de serviços
  servicesList.innerHTML = '<div class="services-grid">' +
    services.map(service => {
      return `
        <div class="service-card">
          <h3 class="service-title">${service.name}</h3>
          <p class="service-description">${service.description}</p>
          
          <div class="form-row">
            <div class="form-col">
              <label>Preço (R$/pessoa):</label>
              <input type="number" id="price-${service.id}" value="${service.price}" min="0" step="0.01">
            </div>
          </div>
          
          <div class="form-col">
            <label>Imagem do Serviço:</label>
            <div class="image-preview ${service.image_url ? 'has-image' : ''}" id="preview-${service.id}" 
                 style="${service.image_url ? `background-image: url(${service.image_url})` : ''}">
              ${!service.image_url ? '<div class="image-placeholder">📷<br>Clique para adicionar imagem</div>' : ''}
            </div>
            <input type="file" id="image-${service.id}" accept="image/*" style="display: none;" 
                   onchange="previewImage('${service.id}')">
          </div>
          
          <button class="save-btn" onclick="saveService('${service.id}')">
            💾 Salvar Alterações
          </button>
          ${!service.is_default ? `<button class="remove-btn" onclick="removeService('${service.id}')">🗑️ Remover Serviço</button>` : ''}
        </div>
      `;
    }).join('') +
  '</div>';
  
  // Adicionar event listeners para preview de imagem
  services.forEach(service => {
    const preview = document.getElementById(`preview-${service.id}`);
    if (preview) {
      preview.addEventListener('click', () => {
        document.getElementById(`image-${service.id}`).click();
      });
    }
  });
}

// Função para atualizar informações de contato no painel administrativo
function updateContactInfoOnAdminPanel(contactInfo) {
  if (contactInfo.whatsapp_number) {
    document.getElementById('whatsappNumber').value = contactInfo.whatsapp_number;
  }
  
  if (contactInfo.email) {
    document.getElementById('contactEmail').value = contactInfo.email;
  }
  
  if (contactInfo.phone) {
    document.getElementById('contactPhone').value = contactInfo.phone;
  }
}

// Função para atualizar pacotes no painel administrativo
function updatePackagesOnAdminPanel(packages) {
  packages.forEach(pkg => {
    // Atualizar pacote básico
    if (pkg.name.toLowerCase().includes('básico') || pkg.name.toLowerCase().includes('basico')) {
      document.getElementById('basicPackageName').value = pkg.name;
      document.getElementById('basicPackagePrice').value = pkg.price;
      document.getElementById('basicPackageDescription').value = pkg.description;
    }
    
    // Atualizar pacote completo
    if (pkg.name.toLowerCase().includes('completo')) {
      document.getElementById('completePackageName').value = pkg.name;
      document.getElementById('completePackagePrice').value = pkg.price;
      document.getElementById('completePackageDescription').value = pkg.description;
    }
  });
}

// Função para atualizar avaliações no painel administrativo
function updateReviewsOnAdminPanel(reviews) {
  const reviewsList = document.getElementById('reviewsList');
  if (!reviewsList) return;
  
  if (reviews.length === 0) {
    reviewsList.innerHTML = '<p id="noReviewsMessage" style="text-align: center; color: #666; padding: 20px;">Nenhuma avaliação recebida ainda.</p>';
    return;
  }
  
  document.getElementById('noReviewsMessage')?.remove();
  
  // Ordenar avaliações por data (mais recente primeiro)
  reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  reviewsList.innerHTML = reviews.map(review => {
    // Converter número de estrelas em ícones
    const stars = '⭐'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
    
    return `
      <div class="service-card" style="margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <strong>${review.name || 'Cliente'}</strong>
          <span style="color: #999;">${new Date(review.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
        <div style="color: #ffc107; margin-bottom: 10px; font-size: 1.2rem;">
          ${stars}
        </div>
        ${review.comment ? `<p style="margin: 0 0 15px 0; color: #333;">${review.comment}</p>` : ''}
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="remove-btn" onclick="removeReview('${review.id}')" style="margin: 0; padding: 6px 12px; font-size: 0.8rem;">
            Remover
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Função para atualizar fotos no painel administrativo
function updatePhotosOnAdminPanel(photos) {
  const galleryGrid = document.getElementById('photoGallery');
  if (!galleryGrid) return;
  
  if (photos.length === 0) {
    galleryGrid.innerHTML = '<p id="noPhotosMessage" style="text-align: center; color: #666; grid-column: 1 / -1; padding: 20px;">Nenhuma foto cadastrada. Envie fotos usando o formulário acima.</p>';
    return;
  }
  
  document.getElementById('noPhotosMessage')?.remove();
  
  galleryGrid.innerHTML = photos.map(photo => `
    <div class="photo-item">
      <img src="${photo.image_data}" alt="${photo.name}">
      <div class="photo-actions">
        <button class="photo-action-btn delete-photo-btn" onclick="deletePhoto('${photo.id}')" title="Excluir foto">🗑️</button>
      </div>
    </div>
  `).join('');
}

// Função para atualizar vídeos no painel administrativo
function updateVideosOnAdminPanel(videos) {
  const videosList = document.getElementById('featuredVideosList');
  if (!videosList) return;
  
  if (videos.length === 0) {
    videosList.innerHTML = '<p id="noFeaturedVideosMessage" style="text-align: center; color: #666; padding: 20px;">Nenhum vídeo adicionado. Insira o link de um vídeo do YouTube acima.</p>';
    return;
  }
  
  document.getElementById('noFeaturedVideosMessage')?.remove();
  
  videosList.innerHTML = videos.map(video => `
    <div class="service-card" style="margin-bottom: 15px;">
      <div style="display: flex; gap: 15px; align-items: center;">
        <div style="flex: 0 0 120px; height: 90px; background: #f5f5f5; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          <img src="https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg" alt="${video.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <h4 style="margin: 0 0 8px 0; color: #333;">${video.title}</h4>
          <p style="margin: 0; color: #666; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
            ${video.url}
          </p>
          <button class="remove-btn" onclick="removeFeaturedVideo('${video.id}')" style="margin-top: 10px; padding: 6px 12px; font-size: 0.8rem;">
            Remover Vídeo
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Função para atualizar administradores no painel administrativo
function updateAdminsOnAdminPanel(admins) {
  const adminsList = document.getElementById('adminsList');
  if (!adminsList) return;
  
  if (admins.length === 0) {
    adminsList.innerHTML = '<div class="admins-grid"><p style="text-align: center; color: #666; padding: 20px;">Nenhum administrador cadastrado.</p></div>';
    return;
  }
  
  adminsList.innerHTML = '<div class="admins-grid">' +
    admins.map(admin => {
      const isMaster = admin.role === 'master';
      const statusClass = admin.status === 'active' ? 'active' : 'suspended';
      
      return `
        <div class="admin-card ${isMaster ? 'master' : statusClass}">
          <div class="admin-info">
            <div class="admin-details">
              <h4>${admin.name}</h4>
              <p>📧 ${admin.email}</p>
              ${admin.phone ? `<p>📱 ${admin.phone}</p>` : ''}
              <p>📅 Criado em: ${new Date(admin.created_at).toLocaleDateString('pt-BR')}</p>
            </div>
            <span class="admin-status ${isMaster ? 'master' : statusClass}">
              ${isMaster ? 'MASTER' : (admin.status === 'active' ? 'ATIVO' : 'SUSPENSO')}
            </span>
          </div>
          ${!isMaster ? `
            <div class="admin-actions">
              ${admin.status === 'active' ? 
                `<button class="admin-action-btn suspend-btn" onclick="suspendAdmin('${admin.id}')">Suspender</button>` :
                `<button class="admin-action-btn activate-btn" onclick="activateAdmin('${admin.id}')">Ativar</button>`
              }
              <button class="admin-action-btn delete-admin-btn" onclick="deleteAdmin('${admin.id}')">Excluir</button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('') +
  '</div>';
}

// Função para configurar atualizações em tempo real no painel administrativo
export function setupAdminRealtimeUpdates() {
  // Escutar atualizações de serviços
  const servicesSubscription = supabase
    .channel('admin-services-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'services',
      },
      (payload) => {
        loadAdminData();
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
        loadAdminData();
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
        loadAdminData();
      }
    )
    .subscribe();

  // Escutar atualizações de informações de contato
  const contactSubscription = supabase
    .channel('admin-contact-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'contact_info',
      },
      (payload) => {
        loadAdminData();
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
        loadAdminData();
      }
    )
    .subscribe();

  return [servicesSubscription, contactSubscription];
}

// Função para limpar subscrições em tempo real
export function cleanupAdminRealtimeUpdates(subscriptions) {
  subscriptions.forEach(subscription => {
    supabase.removeChannel(subscription);
  });
}

export default {
  loadAdminData,
  setupAdminRealtimeUpdates,
  cleanupAdminRealtimeUpdates
};