export interface ClinicModel {
  id: number;
  clinic_name: string;
  subtitle: string;
  regno: string;
  description: string;
  address: string;
  location: string;
  email: string;
  mobile: string;
  telephone: string;
  website: string;
  is_active: boolean;
  created_by_username: string;
  logo_url: string | null;
  image_url: string | null;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
}