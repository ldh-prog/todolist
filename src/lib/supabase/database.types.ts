// src/lib/supabase/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          is_completed: boolean;
          due_at: string | null;
          remind_at: string | null;
          reminder_fired_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          is_completed?: boolean;
          due_at?: string | null;
          remind_at?: string | null;
          reminder_fired_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          is_completed?: boolean;
          due_at?: string | null;
          remind_at?: string | null;
          reminder_fired_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      shopping_items: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          quantity: number;
          category: string;
          is_purchased: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          quantity?: number;
          category?: string;
          is_purchased?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          quantity?: number;
          category?: string;
          is_purchased?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type TodoRow = Database["public"]["Tables"]["todos"]["Row"];
export type ShoppingItemRow =
  Database["public"]["Tables"]["shopping_items"]["Row"];
