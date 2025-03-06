
export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  currentPrice: number;
  startingPrice: number;
  seller: string;
  location: string;
  quantity: number;
  category: string;
  harvestDate?: string;
  expiryDate?: string;
  certifications?: string[];
  bids?: Bid[];
}

export interface Bid {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: Date;
  status: 'active' | 'won' | 'lost';
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
}
