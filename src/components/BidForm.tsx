
import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types';

interface BidFormProps {
  product: Product;
  onBidSubmit?: () => void;
}

const BidForm: React.FC<BidFormProps> = ({ product, onBidSubmit }) => {
  const { addBid, getHighestBidForProduct, currentUser } = useProducts();
  const highestBid = getHighestBidForProduct(product.id);
  const minimumBid = Math.max(product.startingPrice, highestBid + 1);
  
  const [bidAmount, setBidAmount] = useState<number>(minimumBid);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bidAmount < minimumBid) {
      toast.error(`Bid must be at least $${minimumBid}`);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      addBid(product.id, bidAmount);
      toast.success("Your bid has been placed successfully!");
      
      // Reset form
      setBidAmount(bidAmount + 1);
      setIsSubmitting(false);
      
      if (onBidSubmit) {
        onBidSubmit();
      }
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-secondary/50 p-6 rounded-lg backdrop-blur-sm animate-fade-in">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Current highest bid</p>
          <p className="font-medium">${highestBid.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Your minimum bid</p>
          <p className="font-medium">${minimumBid.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="bidAmount" className="text-sm font-medium">
          Your bid (USD)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            id="bidAmount"
            type="number"
            min={minimumBid}
            step="1"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="pl-7"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full button-hover-effect bg-primary hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Placing Bid..." : "Place Bid"}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        By placing a bid, you agree to our Terms and Conditions
      </p>
    </form>
  );
};

export default BidForm;
