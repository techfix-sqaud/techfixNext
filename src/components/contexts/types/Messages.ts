export interface Message {
  id: number;
  message: string;
  status: "Received" | "Seen";
  name: string;
  date: Date;
  email: string;
}


export interface Quote {
  id: number;
  fullName: string;
  email: string;
  deviceModel: string
  description: string;
  date: Date;
  phoneNumber: string;
  status: "Received" | "Seen";
}
