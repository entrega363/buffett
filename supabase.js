// Configuração do Supabase para o Buffet Sobral
import { createClient } from '@supabase/supabase-js'

// Credenciais do Supabase (carregadas do ambiente)
const supabaseUrl = process.env.SUPABASE_URL || 'https://vopekxfyorbuyrvzcshy.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4'

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

// Funções para interagir com o banco de dados

// Função para obter todos os serviços
export async function getServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
    return []
  }
}

// Função para obter avaliações
export async function getReviews() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error)
    return []
  }
}

// Função para adicionar uma avaliação
export async function addReview(reviewData) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao adicionar avaliação:', error)
    throw error
  }
}

// Função para obter fotos do espaço
export async function getSpacePhotos() {
  try {
    const { data, error } = await supabase
      .from('space_photos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao buscar fotos do espaço:', error)
    return []
  }
}

// Função para obter vídeos em destaque
export async function getFeaturedVideos() {
  try {
    const { data, error } = await supabase
      .from('featured_videos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao buscar vídeos em destaque:', error)
    return []
  }
}

// Função para obter informações de contato
export async function getContactInfo() {
  try {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1)
    
    if (error) throw error
    return data[0] || null
  } catch (error) {
    console.error('Erro ao buscar informações de contato:', error)
    return null
  }
}

// Função para obter configurações de streaming
export async function getStreamingConfig() {
  try {
    const { data, error } = await supabase
      .from('streaming_config')
      .select('*')
      .limit(1)
    
    if (error) throw error
    return data[0] || null
  } catch (error) {
    console.error('Erro ao buscar configurações de streaming:', error)
    return null
  }
}

// Função para obter configurações de pacotes
export async function getPackagesConfig() {
  try {
    const { data, error } = await supabase
      .from('packages_config')
      .select('*')
      .limit(1)
    
    if (error) throw error
    return data[0] || null
  } catch (error) {
    console.error('Erro ao buscar configurações de pacotes:', error)
    return null
  }
}

// Função para atualizar informações de contato
export async function updateContactInfo(contactInfo) {
  try {
    // Verificar se já existe um registro
    const { data: existingData, error: fetchError } = await supabase
      .from('contact_info')
      .select('id')
      .limit(1)
    
    if (fetchError) throw fetchError
    
    if (existingData && existingData.length > 0) {
      // Atualizar registro existente
      const { data, error } = await supabase
        .from('contact_info')
        .update(contactInfo)
        .eq('id', existingData[0].id)
      
      if (error) throw error
      return data
    } else {
      // Criar novo registro
      const { data, error } = await supabase
        .from('contact_info')
        .insert([contactInfo])
      
      if (error) throw error
      return data
    }
  } catch (error) {
    console.error('Erro ao atualizar informações de contato:', error)
    throw error
  }
}

// Função para atualizar serviços
export async function updateService(serviceId, serviceData) {
  try {
    // Verificar se o serviço já existe
    const { data: existingData, error: fetchError } = await supabase
      .from('services')
      .select('id')
      .eq('id', serviceId)
      .limit(1)
    
    if (fetchError) throw fetchError
    
    if (existingData && existingData.length > 0) {
      // Atualizar serviço existente
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', serviceId)
      
      if (error) throw error
      return data
    } else {
      // Criar novo serviço
      const { data, error } = await supabase
        .from('services')
        .insert([{ id: serviceId, ...serviceData }])
      
      if (error) throw error
      return data
    }
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error)
    throw error
  }
}