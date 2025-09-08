// Gerenciamento de estado da aplicação com Supabase
import supabase from './client.js';
import {
  ServicesService,
  ContactService,
  EventsService,
  PackagesService,
  ReviewsService,
  PhotosService,
  VideosService,
  AdminsService
} from './services.js';

// Estado da aplicação
class AppState {
  constructor() {
    this.services = [];
    this.contactInfo = null;
    this.packages = [];
    this.reviews = [];
    this.photos = [];
    this.videos = [];
    this.admins = [];
    this.currentUser = null;
    this.isLoading = false;
    this.error = null;
  }

  // Carregar todos os dados
  async loadData() {
    this.isLoading = true;
    this.error = null;
    
    try {
      // Carregar serviços
      this.services = await ServicesService.getAll();
      
      // Carregar informações de contato
      this.contactInfo = await ContactService.get();
      
      // Carregar pacotes
      this.packages = await PackagesService.getAll();
      
      // Carregar avaliações
      this.reviews = await ReviewsService.getAll();
      
      // Carregar fotos
      this.photos = await PhotosService.getAll();
      
      // Carregar vídeos
      this.videos = await VideosService.getAll();
      
      // Carregar administradores (somente se usuário estiver logado)
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        this.admins = await AdminsService.getAll();
      }
      
      this.isLoading = false;
    } catch (error) {
      this.error = error.message;
      this.isLoading = false;
      throw error;
    }
  }

  // Atualizar dados em tempo real
  subscribeToRealtimeUpdates() {
    // Escutar atualizações de serviços
    const servicesChannel = supabase
      .channel('services-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'services',
        },
        (payload) => {
          this.services.push(payload.new);
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
          const index = this.services.findIndex(s => s.id === payload.new.id);
          if (index !== -1) {
            this.services[index] = payload.new;
          }
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
          this.services = this.services.filter(s => s.id !== payload.old.id);
        }
      )
      .subscribe();

    // Escutar atualizações de informações de contato
    const contactChannel = supabase
      .channel('contact-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_info',
        },
        (payload) => {
          this.contactInfo = payload.new;
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
          this.contactInfo = payload.new;
        }
      )
      .subscribe();

    return [servicesChannel, contactChannel];
  }

  // Limpar subscrições
  unsubscribeFromRealtimeUpdates(channels) {
    channels.forEach(channel => {
      supabase.removeChannel(channel);
    });
  }
}

// Instância singleton do estado
const appState = new AppState();

export default appState;