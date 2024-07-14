export interface UserData {
  firstName?: string;
  last_name?: string;
  mobile?: string;
  email?: string;
  company?: string;
  address?: string;
  about?: string;
  imageUrl?: string;
  role?: string;
}

export interface CustomerData {
  id: number;
  firstName: string;
  last_name: string;
  email: string;
  mobile: string;
  // other properties if any
}
