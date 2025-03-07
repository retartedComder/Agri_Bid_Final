import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Bid, User, Currency } from '@/types';
import { addDays } from 'date-fns';

// Sample data with Indian context and auction end times
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Organic Basmati Rice",
    description: "Aromatic, long-grain basmati rice from the foothills of the Himalayas. Grown with traditional farming methods that preserve its authentic flavor and aroma.",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentPrice: 150,
    startingPrice: 120,
    seller: "Himalayan Harvest Co.",
    location: "Dehradun, Uttarakhand",
    quantity: 100,
    category: "Grains",
    harvestDate: "2023-10-01",
    expiryDate: "2024-10-01",
    certifications: ["Organic", "Non-GMO"],
    bids: [],
    auctionEndTime: addDays(new Date(), 7)
  },
  {
    id: "2",
    name: "Fresh Alphonso Mangoes",
    description: "Known as the 'King of Mangoes', these Alphonso mangoes from Ratnagiri are sweet, fragrant, and have a rich, creamy texture. Perfect for eating fresh or making desserts.",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    currentPrice: 450,
    startingPrice: 400,
    seller: "Konkan Fruit Farms",
    location: "Ratnagiri, Maharashtra",
    quantity: 50,
    category: "Fruits",
    harvestDate: "2023-05-15",
    bids: [],
    auctionEndTime: addDays(new Date(), 5)
  },
  {
    id: "3",
    name: "Premium Darjeeling Tea",
    description: "First flush Darjeeling tea, known as the 'Champagne of Teas'. This premium loose-leaf tea offers a muscatel flavor with floral undertones, harvested from the misty hills of Darjeeling.",
    imageUrl: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    currentPrice: 800,
    startingPrice: 750,
    seller: "Himalayan Tea Estates",
    location: "Darjeeling, West Bengal",
    quantity: 25,
    category: "Tea",
    harvestDate: "2023-03-10",
    certifications: ["Organic", "Fair Trade"],
    bids: [],
    auctionEndTime: addDays(new Date(), 3)
  },
  {
    id: "4",
    name: "Organic Turmeric Powder",
    description: "High-curcumin organic turmeric from Kerala, grown using traditional farming methods. Perfect for cooking, Ayurvedic remedies, and natural food coloring.",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentPrice: 220,
    startingPrice: 180,
    seller: "Kerala Spice Gardens",
    location: "Wayanad, Kerala",
    quantity: 40,
    category: "Spices",
    certifications: ["Organic", "Chemical-Free"],
    bids: []
  },
  {
    id: "5",
    name: "Pure Kashmir Saffron",
    description: "Premium Kashmiri saffron known for its distinct aroma, flavor and color. Handpicked from the valleys of Kashmir, this 'red gold' adds exquisite flavor to both sweet and savory dishes.",
    imageUrl: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentPrice: 1500,
    startingPrice: 1200,
    seller: "Kashmir Valley Farms",
    location: "Pampore, Jammu & Kashmir",
    quantity: 10,
    category: "Spices",
    certifications: ["GI Tagged", "Premium Grade"],
    bids: []
  },
  {
    id: "6",
    name: "Cold-Pressed Coconut Oil",
    description: "Traditional cold-pressed virgin coconut oil made from organically grown coconuts. Free from chemicals and preservatives, perfect for cooking, hair and skin care.",
    imageUrl: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentPrice: 350,
    startingPrice: 300,
    seller: "Tamil Nadu Coconut Cooperative",
    location: "Pollachi, Tamil Nadu",
    quantity: 30,
    category: "Oils",
    certifications: ["Organic", "Cold-Pressed"],
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

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const addBid = (productId: string, amount: number) => {
    if (!currentUser) return;

    const product = products.find(p => p.id === productId);
    if (product?.auctionEndTime && new Date() > new Date(product.auctionEndTime)) {
      return;
    }

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
    
    const isAuctionEnded = product.auctionEndTime && new Date() > new Date(product.auctionEndTime);
    
    if (isAuctionEnded) {
      const highestBid = Math.max(...product.bids.map(bid => bid.amount));
      const userHighestBid = Math.max(
        ...product.bids
          .filter(bid => bid.userId === userId)
          .map(bid => bid.amount),
        0
      );
      
      return highestBid === userHighestBid;
    }
    
    return false;
  };

  const login = async (email: string, password: string, userType: 'farmer' | 'buyer'): Promise<boolean> => {
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
