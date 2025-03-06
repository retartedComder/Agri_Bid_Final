
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Bid, User, Currency } from '@/types';

// Sample data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Organic Apples",
    description: "Fresh, organic apples from our sustainable farm. These apples are grown without pesticides and are harvested at peak ripeness for the best flavor and nutritional value.",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    currentPrice: 35,
    startingPrice: 25,
    seller: "Green Valley Farms",
    location: "Napa Valley, CA",
    quantity: 100,
    category: "Fruits",
    harvestDate: "2023-10-01",
    expiryDate: "2023-10-15",
    certifications: ["Organic", "Non-GMO"],
    bids: []
  },
  {
    id: "2",
    name: "Freshly Harvested Carrots",
    description: "Bright orange, crunchy carrots picked just hours ago. Perfect for salads, juicing, or cooking. Our carrots are grown in nutrient-rich soil for maximum flavor and nutrition.",
    imageUrl: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    currentPrice: 18,
    startingPrice: 15,
    seller: "Root Vegetable Co.",
    location: "Sacramento, CA",
    quantity: 50,
    category: "Vegetables",
    harvestDate: "2023-10-02",
    bids: []
  },
  {
    id: "3",
    name: "Artisanal Goat Cheese",
    description: "Creamy, tangy goat cheese made in small batches on our family farm. Our goats are pasture-raised and fed a natural diet, resulting in cheese with exceptional flavor and quality.",
    imageUrl: "https://images.unsplash.com/photo-1559561853-08451507cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    currentPrice: 48,
    startingPrice: 40,
    seller: "Happy Goat Dairy",
    location: "Sonoma, CA",
    quantity: 25,
    category: "Dairy",
    expiryDate: "2023-11-01",
    certifications: ["Hormone-Free"],
    bids: []
  },
  {
    id: "4",
    name: "Wild Caught Salmon",
    description: "Premium salmon caught in the pristine waters of the Pacific Northwest. Flash-frozen to preserve freshness, our salmon is rich in omega-3 fatty acids and has a delicate, buttery flavor.",
    imageUrl: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    currentPrice: 72,
    startingPrice: 65,
    seller: "Ocean Fresh Seafood",
    location: "Portland, OR",
    quantity: 20,
    category: "Seafood",
    certifications: ["Sustainable Fishing", "Wild Caught"],
    bids: []
  }
];

// Sample users
const sampleUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    userType: "buyer",
    address: "123 Main St, Delhi, India",
    phone: "555-123-4567"
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    userType: "farmer",
    address: "456 Farm Rd, Mumbai, India",
    phone: "555-987-6543"
  }
];

interface ProductContextType {
  products: Product[];
  currentUser: User | null;
  isAuthenticated: boolean;
  currency: Currency;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addBid: (productId: string, amount: number) => void;
  getHighestBidForProduct: (productId: string) => number;
  getUserBids: (userId: string) => Bid[];
  isHighestBidder: (productId: string, userId: string) => boolean;
  login: (email: string, password: string, userType: 'farmer' | 'buyer') => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: 'farmer' | 'buyer') => Promise<boolean>;
  logout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [users] = useState<User[]>(sampleUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currency] = useState<Currency>('₹');

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const addBid = (productId: string, amount: number) => {
    if (!currentUser) return;

    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      amount,
      timestamp: new Date(),
      status: 'active'
    };

    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? {
              ...product,
              bids: [...(product.bids || []), newBid],
              currentPrice: Math.max(product.currentPrice, amount)
            }
          : product
      )
    );
  };

  const getHighestBidForProduct = (productId: string): number => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.bids || product.bids.length === 0) {
      return product?.startingPrice || 0;
    }
    return Math.max(...product.bids.map(bid => bid.amount));
  };

  const getUserBids = (userId: string): Bid[] => {
    return products.flatMap(product => 
      (product.bids || []).filter(bid => bid.userId === userId)
    );
  };

  const isHighestBidder = (productId: string, userId: string): boolean => {
    if (!userId) return false;
    
    const product = products.find(p => p.id === productId);
    if (!product || !product.bids || product.bids.length === 0) return false;
    
    const highestBid = Math.max(...product.bids.map(bid => bid.amount));
    const userHighestBid = Math.max(
      ...product.bids
        .filter(bid => bid.userId === userId)
        .map(bid => bid.amount),
      0
    );
    
    return highestBid === userHighestBid;
  };

  const login = async (email: string, password: string, userType: 'farmer' | 'buyer'): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.userType === userType);
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string, userType: 'farmer' | 'buyer'): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          resolve(false);
        } else {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            userType
          };
          
          users.push(newUser);
          setCurrentUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          resolve(true);
        }
      }, 800);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`,
      bids: []
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        currentUser,
        isAuthenticated,
        currency,
        selectedProduct,
        setSelectedProduct,
        addBid,
        getHighestBidForProduct,
        getUserBids,
        isHighestBidder,
        login,
        register,
        logout,
        addProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
