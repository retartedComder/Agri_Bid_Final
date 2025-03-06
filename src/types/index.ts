
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
  userType: 'farmer' | 'buyer';
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

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
}

export type Currency = '₹';
