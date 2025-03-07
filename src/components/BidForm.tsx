
import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';

interface BidFormProps {
  product: Product;
  onBidSubmit?: () => void;
}

const BidForm: React.FC<BidFormProps> = ({ product, onBidSubmit }) => {
  const { addBid, getHighestBidForProduct, currentUser, isAuthenticated, currency } = useProducts();
  const highestBid = getHighestBidForProduct(product.id);
  const minimumBid = Math.max(product.startingPrice, highestBid + 1);
  
  const [bidAmount, setBidAmount] = useState<number>(minimumBid);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if auction has ended
  const isAuctionEnded = product.auctionEndTime && new Date() > new Date(product.auctionEndTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login as a buyer to place a bid");
      return;
    }

    if (!currentUser || currentUser.userType !== 'buyer') {
      toast.error("Only buyers can place bids");
      return;
    }
    
    if (isAuctionEnded) {
      toast.error("This auction has ended");
      return;
    }
    
    if (bidAmount < minimumBid) {
      toast.error(`Bid must be at least ${currency}${minimumBid}`);
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

  // Render auction status
  const renderAuctionStatus = () => {
    if (!product.auctionEndTime) return null;
    
    const endTime = new Date(product.auctionEndTime);
    
    if (isAuctionEnded) {
      return (
        <div className="flex items-center gap-2 p-2 mt-2 bg-red-100 text-red-700 rounded-md">
          <Clock size={16} />
          <span className="text-sm font-medium">Auction has ended</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 p-2 mt-2 bg-amber-100 text-amber-700 rounded-md">
        <Clock size={16} />
        <span className="text-sm font-medium">
          Ends {formatDistanceToNow(endTime, { addSuffix: true })}
        </span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-green-50 p-6 rounded-lg backdrop-blur-sm animate-fade-in">
      {renderAuctionStatus()}
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Current highest bid</p>
          <p className="font-medium">{currency}{highestBid.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Your minimum bid</p>
          <p className="font-medium">{currency}{minimumBid.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="bidAmount" className="text-sm font-medium">
          Your bid
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{currency}</span>
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
        className="w-full button-hover-effect bg-green-600 hover:bg-green-700 text-white"
        disabled={isSubmitting || !isAuthenticated || (currentUser?.userType !== 'buyer') || isAuctionEnded}
      >
        {!isAuthenticated ? 'Login to Bid' : 
         (currentUser?.userType !== 'buyer') ? 'Only Buyers Can Bid' :
         isAuctionEnded ? 'Auction Ended' :
         (isSubmitting ? "Placing Bid..." : "Place Bid")}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        By placing a bid, you agree to our Terms and Conditions
      </p>
    </form>
  );
};

export default BidForm;
