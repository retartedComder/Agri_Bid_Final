
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import BidForm from '@/components/BidForm';
import BidHistory from '@/components/BidHistory';
import { Calendar, MapPin, Tag, Truck, Clock, Award, Star } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, selectedProduct, setSelectedProduct, currentUser, isHighestBidder, isAuthenticated } = useProducts();
  
  const [activeTab, setActiveTab] = useState('details');
  
  // If we navigate directly to this page, or refresh
  React.useEffect(() => {
    if (!selectedProduct && id) {
      const product = products.find(p => p.id === id);
      if (product) {
        setSelectedProduct(product);
      } else {
        navigate('/');
      }
    }
  }, [id, products, selectedProduct, setSelectedProduct, navigate]);
  
  if (!selectedProduct) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p>Loading product...</p>
      </div>
    );
  }
  
  const handleProceedToCheckout = () => {
    navigate(`/checkout/${selectedProduct.id}`);
  };
  
  // Check if the user is the highest bidder, safely handling null currentUser
  const isHighest = currentUser ? isHighestBidder(selectedProduct.id, currentUser.id) : false;
  const hasBids = selectedProduct.bids && selectedProduct.bids.length > 0;
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl animate-fade-in">
      <button 
        onClick={() => navigate('/')}
        className="text-sm flex items-center mb-6 hover:text-primary transition-colors"
      >
        ← Back to products
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary/50">
            <img 
              src={selectedProduct.imageUrl} 
              alt={selectedProduct.name} 
              className="w-full h-full object-cover transition-all hover:scale-105 duration-700"
            />
          </div>
          
          {selectedProduct.certifications && selectedProduct.certifications.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {selectedProduct.certifications.map((cert, index) => (
                <Badge key={index} className="bg-primary text-white">
                  {cert}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10 font-medium">
                {selectedProduct.category}
              </Badge>
              <p className="text-sm text-muted-foreground">{selectedProduct.seller}</p>
            </div>
            
            <h1 className="text-3xl font-display font-bold mb-3">{selectedProduct.name}</h1>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{selectedProduct.location}</span>
              </div>
              {selectedProduct.harvestDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Harvested: {selectedProduct.harvestDate}</span>
                </div>
              )}
            </div>
            
            <p className="text-lg font-medium mb-1">
              Current bid: ₹{selectedProduct.currentPrice.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Started at ₹{selectedProduct.startingPrice.toFixed(2)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated && isHighest ? (
                <Button 
                  onClick={handleProceedToCheckout}
                  className="button-hover-effect"
                >
                  Proceed to Checkout
                </Button>
              ) : (
                isAuthenticated && hasBids && (
                  <Button 
                    variant="outline" 
                    disabled
                    className="flex gap-2 items-center"
                  >
                    <Star className="h-4 w-4 text-yellow-500" /> You've been outbid
                  </Button>
                )
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="bidding">Place a Bid</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Description</h3>
                  <p className="text-muted-foreground">{selectedProduct.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Tag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quantity Available</p>
                      <p className="text-sm text-muted-foreground">{selectedProduct.quantity} units</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Shipping From</p>
                      <p className="text-sm text-muted-foreground">{selectedProduct.location}</p>
                    </div>
                  </div>
                  
                  {selectedProduct.harvestDate && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Harvest Date</p>
                        <p className="text-sm text-muted-foreground">{selectedProduct.harvestDate}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedProduct.expiryDate && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Best Before</p>
                        <p className="text-sm text-muted-foreground">{selectedProduct.expiryDate}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedProduct.certifications && selectedProduct.certifications.length > 0 && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Certifications</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedProduct.certifications.join(', ')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="bidding" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Place Your Bid</h3>
                    <BidForm product={selectedProduct} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Bid History</h3>
                    <BidHistory product={selectedProduct} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
