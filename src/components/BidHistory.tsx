
import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { Product, Bid } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface BidHistoryProps {
  product: Product;
}

const BidHistory: React.FC<BidHistoryProps> = ({ product }) => {
  const { currentUser } = useProducts();
  
  const sortedBids = [...(product.bids || [])].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (!sortedBids.length) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <p className="text-muted-foreground">No bids yet</p>
        <p className="text-sm">Be the first to place a bid!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[250px] w-full animate-fade-in">
      <div className="space-y-4">
        {sortedBids.map((bid, index) => (
          <BidItem 
            key={bid.id} 
            bid={bid} 
            isCurrentUser={bid.userId === currentUser.id}
            isHighest={index === 0}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

interface BidItemProps {
  bid: Bid;
  isCurrentUser: boolean;
  isHighest: boolean;
}

const BidItem: React.FC<BidItemProps> = ({ bid, isCurrentUser, isHighest }) => {
  const timeAgo = formatDistanceToNow(new Date(bid.timestamp), { addSuffix: true });
  
  return (
    <div 
      className={`
        p-3 rounded-lg transition-all duration-300
        ${isHighest ? 'bg-accent/80 border border-primary/10' : 'bg-card/60'}
        ${isCurrentUser ? 'border-l-4 border-l-primary' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-sm flex items-center gap-2">
            {isCurrentUser ? 'You' : bid.userName}
            {isHighest && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                Highest
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
        <p className="font-bold">${bid.amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BidHistory;
