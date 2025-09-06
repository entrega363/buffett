// Serviços para interagir com o Supabase
import supabase from './client.js';
import {
  ServiceModel,
  ContactModel,
  EventModel,
  PackageModel,
  ReviewModel,
  PhotoModel,
  VideoModel,
  AdminModel
} from './models.js';

// Serviço de Serviços
export const ServicesService = {
  // Obter todos os serviços
  async getAll() {
    const { data, error } = await supabase
      .from(ServiceModel.table)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Obter serviço por ID
  async getById(id) {
    const { data, error } = await supabase
      .from(ServiceModel.table)
      .select('*')
      .eq(ServiceModel.fields.id, id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Criar novo serviço
  async create(serviceData) {
    const { data, error } = await supabase
      .from(ServiceModel.table)
      .insert([serviceData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar serviço
  async update(id, serviceData) {
    const { data, error } = await supabase
      .from(ServiceModel.table)
      .update(serviceData)
      .eq(ServiceModel.fields.id, id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar serviço
  async delete(id) {
    const { error } = await supabase
      .from(ServiceModel.table)
      .delete()
      .eq(ServiceModel.fields.id, id);
    
    if (error) throw error;
    return true;
  }
};

// Serviço de Contato
export const ContactService = {
  // Obter informações de contato
  async get() {
    const { data, error } = await supabase
      .from(ContactModel.table)
      .select('*')
      .limit(1)
      .single();
    
    if (error) {
      // Se não houver dados, retorna null
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  // Criar/atualizar informações de contato
  async upsert(contactData) {
    // Primeiro tenta obter os dados existentes
    const existing = await this.get();
    
    if (existing) {
      // Se existir, atualiza
      const { data, error } = await supabase
        .from(ContactModel.table)
        .update({
          ...contactData,
          updated_at: new Date().toISOString()
        })
        .eq(ContactModel.fields.id, existing.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      // Se não existir, cria novo
      const { data, error } = await supabase
        .from(ContactModel.table)
        .insert([{
          ...contactData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};

// Serviço de Eventos
export const EventsService = {
  // Obter eventos por serviço
  async getByService(serviceId) {
    const { data, error } = await supabase
      .from(EventModel.table)
      .select('*')
      .eq(EventModel.fields.service_id, serviceId);
    
    if (error) throw error;
    return data;
  },

  // Associar evento a serviço
  async associate(serviceId, eventType) {
    const { data, error } = await supabase
      .from(EventModel.table)
      .insert([{
        service_id: serviceId,
        event_type: eventType,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Desassociar evento de serviço
  async disassociate(serviceId, eventType) {
    const { error } = await supabase
      .from(EventModel.table)
      .delete()
      .match({
        service_id: serviceId,
        event_type: eventType
      });
    
    if (error) throw error;
    return true;
  }
};

// Serviço de Pacotes
export const PackagesService = {
  // Obter todos os pacotes
  async getAll() {
    const { data, error } = await supabase
      .from(PackageModel.table)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Obter pacote por ID
  async getById(id) {
    const { data, error } = await supabase
      .from(PackageModel.table)
      .select('*')
      .eq(PackageModel.fields.id, id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Criar novo pacote
  async create(packageData) {
    const { data, error } = await supabase
      .from(PackageModel.table)
      .insert([packageData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar pacote
  async update(id, packageData) {
    const { data, error } = await supabase
      .from(PackageModel.table)
      .update(packageData)
      .eq(PackageModel.fields.id, id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar pacote
  async delete(id) {
    const { error } = await supabase
      .from(PackageModel.table)
      .delete()
      .eq(PackageModel.fields.id, id);
    
    if (error) throw error;
    return true;
  }
};

// Serviço de Avaliações
export const ReviewsService = {
  // Obter todas as avaliações
  async getAll() {
    const { data, error } = await supabase
      .from(ReviewModel.table)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Criar nova avaliação
  async create(reviewData) {
    const { data, error } = await supabase
      .from(ReviewModel.table)
      .insert([reviewData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Serviço de Fotos
export const PhotosService = {
  // Obter todas as fotos
  async getAll() {
    const { data, error } = await supabase
      .from(PhotoModel.table)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Criar nova foto
  async create(photoData) {
    const { data, error } = await supabase
      .from(PhotoModel.table)
      .insert([photoData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar foto
  async delete(id) {
    const { error } = await supabase
      .from(PhotoModel.table)
      .delete()
      .eq(PhotoModel.fields.id, id);
    
    if (error) throw error;
    return true;
  }
};

// Serviço de Vídeos
export const VideosService = {
  // Obter todos os vídeos
  async getAll() {
    const { data, error } = await supabase
      .from(VideoModel.table)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Criar novo vídeo
  async create(videoData) {
    const { data, error } = await supabase
      .from(VideoModel.table)
      .insert([videoData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar vídeo
  async delete(id) {
    const { error } = await supabase
      .from(VideoModel.table)
      .delete()
      .eq(VideoModel.fields.id, id);
    
    if (error) throw error;
    return true;
  }
};

// Serviço de Administradores
export const AdminsService = {
  // Obter todos os administradores
  async getAll() {
    const { data, error } = await supabase
      .from(AdminModel.table)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Obter administrador por email
  async getByEmail(email) {
    const { data, error } = await supabase
      .from(AdminModel.table)
      .select('*')
      .eq(AdminModel.fields.email, email)
      .single();
    
    if (error) {
      // Se não encontrar, retorna null
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  // Criar novo administrador
  async create(adminData) {
    const { data, error } = await supabase
      .from(AdminModel.table)
      .insert([adminData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar administrador
  async update(id, adminData) {
    const { data, error } = await supabase
      .from(AdminModel.table)
      .update(adminData)
      .eq(AdminModel.fields.id, id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar administrador
  async delete(id) {
    const { error } = await supabase
      .from(AdminModel.table)
      .delete()
      .eq(AdminModel.fields.id, id);
    
    if (error) throw error;
    return true;
  }
};

export default {
  ServicesService,
  ContactService,
  EventsService,
  PackagesService,
  ReviewsService,
  PhotosService,
  VideosService,
  AdminsService
};