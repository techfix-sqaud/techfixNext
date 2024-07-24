export interface UserData {
  firstName?: string;
  middleName?: string;
  last_name?: string;
  mobile?: string;
  email?: string;
  company?: string;
  address?: string;
  signature?: boolean;
  about?: string;
  imageUrl?: string;
  role?: string;
  profile?: string;
  last_login?: string | Date;
  registered_at?: string | Date;
}

export interface CustomerData {
  id: number;
  firstName: string;
  last_name: string;
  email: string;
  mobile: string;
  // other properties if any
}
