export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          image_url: string | null
          events: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description: string
          price: number
          image_url?: string | null
          events?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          image_url?: string | null
          events?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          name: string
          stars: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          stars: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          stars?: number
          comment?: string | null
          created_at?: string
        }
      }
      space_photos: {
        Row: {
          id: string
          name: string
          data: string
          upload_date: string
        }
        Insert: {
          id?: string
          name: string
          data: string
          upload_date?: string
        }
        Update: {
          id?: string
          name?: string
          data?: string
          upload_date?: string
        }
      }
      featured_videos: {
        Row: {
          id: string
          url: string
          video_id: string
          title: string
          added_date: string
        }
        Insert: {
          id?: string
          url: string
          video_id: string
          title: string
          added_date?: string
        }
        Update: {
          id?: string
          url?: string
          video_id?: string
          title?: string
          added_date?: string
        }
      }
      contact_info: {
        Row: {
          id: string
          whatsapp_number: string
          contact_email: string
          contact_phone: string
          last_updated: string
        }
        Insert: {
          id?: string
          whatsapp_number: string
          contact_email: string
          contact_phone: string
          last_updated?: string
        }
        Update: {
          id?: string
          whatsapp_number?: string
          contact_email?: string
          contact_phone?: string
          last_updated?: string
        }
      }
      streaming_config: {
        Row: {
          id: string
          channel_id: string
          status: string
          last_updated: string
        }
        Insert: {
          id?: string
          channel_id: string
          status: string
          last_updated?: string
        }
        Update: {
          id?: string
          channel_id?: string
          status?: string
          last_updated?: string
        }
      }
      packages_config: {
        Row: {
          id: string
          basic_name: string
          basic_price: number
          basic_description: string
          complete_name: string
          complete_price: number
          complete_description: string
          last_updated: string
        }
        Insert: {
          id?: string
          basic_name: string
          basic_price: number
          basic_description: string
          complete_name: string
          complete_price: number
          complete_description: string
          last_updated?: string
        }
        Update: {
          id?: string
          basic_name?: string
          basic_price?: number
          basic_description?: string
          complete_name?: string
          complete_price?: number
          complete_description?: string
          last_updated?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}