export interface Classroom {
  id: string | number;
  name: string;
  size: string;
  description: string;
  images: string[];
  equipment: string[];
  price_full?: number;
  price_half?: number;
  is_available_morning?: boolean;
  is_available_afternoon?: boolean;
  is_available_full?: boolean;
}

export type Aula = Classroom; // Alias for admin panel

export interface TrainingCourse {
  id: string | number;
  title: string;
  description: string;
  icon: string;
  is_highlighted: boolean;
  external_url?: string;
  image_url?: string; // Added for Supabase consistency
}

export type Course = TrainingCourse; // Alias for admin panel

export interface Service {
  id: string | number;
  title: string;
  description: string;
  icon: string;
  image_url?: string; // Added for Supabase consistency
}

export interface Reservation {
  id?: string | number;
  classroom_name: string;
  user_name: string;
  user_email: string;
  date: string;
  shift: string;
  total_price: number;
}

