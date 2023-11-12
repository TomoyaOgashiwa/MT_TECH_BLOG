export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Blog: {
        Row: {
          contents: string
          createdAt: string
          deletedAt: string
          id: string
          tagId: string
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          contents: string
          createdAt?: string
          deletedAt: string
          id: string
          tagId: string
          title: string
          updatedAt?: string
          userId: string
        }
        Update: {
          contents?: string
          createdAt?: string
          deletedAt?: string
          id?: string
          tagId?: string
          title?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog_tagId_fkey"
            columns: ["tagId"]
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Blog_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Memo: {
        Row: {
          contents: string
          createdAt: string
          id: string
          tagId: string
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          contents: string
          createdAt?: string
          id: string
          tagId: string
          title: string
          updatedAt?: string
          userId: string
        }
        Update: {
          contents?: string
          createdAt?: string
          id?: string
          tagId?: string
          title?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Memo_tagId_fkey"
            columns: ["tagId"]
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Memo_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Tag: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          createdAt: string
          deletedAt: string
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["Role"]
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deletedAt: string
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["Role"]
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          deletedAt?: string
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["Role"]
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Role: "ADMIN" | "USER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

