// Modelos de dados para o Supabase

// Modelo de Serviço
export const ServiceModel = {
  table: 'services',
  fields: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    image_url: 'image_url',
    category: 'category',
    created_at: 'created_at',
    updated_at: 'updated_at'
  }
};

// Modelo de Contato
export const ContactModel = {
  table: 'contact_info',
  fields: {
    id: 'id',
    whatsapp_number: 'whatsapp_number',
    email: 'email',
    phone: 'phone',
    created_at: 'created_at',
    updated_at: 'updated_at'
  }
};

// Modelo de Evento
export const EventModel = {
  table: 'events',
  fields: {
    id: 'id',
    service_id: 'service_id',
    event_type: 'event_type',
    created_at: 'created_at'
  }
};

// Modelo de Pacote
export const PackageModel = {
  table: 'packages',
  fields: {
    id: 'id',
    name: 'name',
    price: 'price',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  }
};

// Modelo de Avaliação
export const ReviewModel = {
  table: 'reviews',
  fields: {
    id: 'id',
    name: 'name',
    stars: 'stars',
    comment: 'comment',
    date: 'date',
    created_at: 'created_at'
  }
};

// Modelo de Foto
export const PhotoModel = {
  table: 'photos',
  fields: {
    id: 'id',
    name: 'name',
    image_data: 'image_data',
    created_at: 'created_at'
  }
};

// Modelo de Vídeo
export const VideoModel = {
  table: 'videos',
  fields: {
    id: 'id',
    title: 'title',
    url: 'url',
    video_id: 'video_id',
    created_at: 'created_at'
  }
};

// Modelo de Administrador
export const AdminModel = {
  table: 'admins',
  fields: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    status: 'status',
    created_at: 'created_at'
  }
};

export default {
  ServiceModel,
  ContactModel,
  EventModel,
  PackageModel,
  ReviewModel,
  PhotoModel,
  VideoModel,
  AdminModel
};