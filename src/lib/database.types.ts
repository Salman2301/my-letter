export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      contact: {
        Row: {
          _owner: string | null
          created_at: string
          email: string | null
          fav: boolean | null
          first_name: string | null
          id: string
          image: string | null
          last_name: string | null
          nick_name: string | null
          phone: string | null
          photo: string | null
          title: string | null
        }
        Insert: {
          _owner?: string | null
          created_at?: string
          email?: string | null
          fav?: boolean | null
          first_name?: string | null
          id?: string
          image?: string | null
          last_name?: string | null
          nick_name?: string | null
          phone?: string | null
          photo?: string | null
          title?: string | null
        }
        Update: {
          _owner?: string | null
          created_at?: string
          email?: string | null
          fav?: boolean | null
          first_name?: string | null
          id?: string
          image?: string | null
          last_name?: string | null
          nick_name?: string | null
          phone?: string | null
          photo?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact__owner_fkey"
            columns: ["_owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      letter: {
        Row: {
          _owner: string | null
          audio: string | null
          background: string | null
          body: Json | null
          contact: string | null
          created_at: string
          delete_on_read: boolean | null
          folder: string | null
          id: string
          is_publish: boolean | null
          public_link: string | null
          read: boolean | null
          send_via_email: string | null
          send_via_phone: string | null
          signature: string | null
          sticker_photo: string | null
          sticker_position: string | null
          title: string | null
          to: string | null
          trigger_date: string | null
          trigger_link: string | null
          trigger_method: string | null
        }
        Insert: {
          _owner?: string | null
          audio?: string | null
          background?: string | null
          body?: Json | null
          contact?: string | null
          created_at?: string
          delete_on_read?: boolean | null
          folder?: string | null
          id?: string
          is_publish?: boolean | null
          public_link?: string | null
          read?: boolean | null
          send_via_email?: string | null
          send_via_phone?: string | null
          signature?: string | null
          sticker_photo?: string | null
          sticker_position?: string | null
          title?: string | null
          to?: string | null
          trigger_date?: string | null
          trigger_link?: string | null
          trigger_method?: string | null
        }
        Update: {
          _owner?: string | null
          audio?: string | null
          background?: string | null
          body?: Json | null
          contact?: string | null
          created_at?: string
          delete_on_read?: boolean | null
          folder?: string | null
          id?: string
          is_publish?: boolean | null
          public_link?: string | null
          read?: boolean | null
          send_via_email?: string | null
          send_via_phone?: string | null
          signature?: string | null
          sticker_photo?: string | null
          sticker_position?: string | null
          title?: string | null
          to?: string | null
          trigger_date?: string | null
          trigger_link?: string | null
          trigger_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "letter__owner_fkey"
            columns: ["_owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letter_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["id"]
          }
        ]
      }
      letter_likes: {
        Row: {
          created_at: string
          id: string
          letter_id: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          letter_id?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          letter_id?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "letter_likes_letter_id_fkey"
            columns: ["letter_id"]
            isOneToOne: false
            referencedRelation: "letter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letter_likes_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      letter_rates: {
        Row: {
          created_at: string
          id: string
          letter_id: string | null
          rate: number | null
          types: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          letter_id?: string | null
          rate?: number | null
          types?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          letter_id?: string | null
          rate?: number | null
          types?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "letter_rates_letter_id_fkey"
            columns: ["letter_id"]
            isOneToOne: false
            referencedRelation: "letter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letter_rates_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      letter_views: {
        Row: {
          created_at: string
          id: string
          ip: string | null
          letter_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip?: string | null
          letter_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip?: string | null
          letter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "letter_views_letter_id_fkey"
            columns: ["letter_id"]
            isOneToOne: false
            referencedRelation: "letter"
            referencedColumns: ["id"]
          }
        ]
      }
      template_background: {
        Row: {
          created_at: string
          id: string
          name: string | null
          src: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          src?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          src?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          _owner: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          nick_name: string | null
          phone: string | null
          photo: string | null
        }
        Insert: {
          _owner?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          nick_name?: string | null
          phone?: string | null
          photo?: string | null
        }
        Update: {
          _owner?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          nick_name?: string | null
          phone?: string | null
          photo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users__owner_fkey"
            columns: ["_owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
