
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const orderNumber = `AGB-${Math.floor(Math.random() * 1000000)}`;
  
  return (
    <div className="max-w-lg mx-auto text-center py-12 animate-scale-in">
      <div className="mb-6 flex justify-center">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <h1 className="text-3xl font-display font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-muted-foreground mb-6">
        Your order has been received and is being processed. 
        A confirmation email has been sent to your email address.
      </p>
      
      <div className="bg-secondary/60 rounded-lg p-6 mb-8">
        <p className="text-sm text-muted-foreground mb-2">Order Number</p>
        <p className="text-xl font-medium">{orderNumber}</p>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={() => navigate('/')} 
          className="w-full button-hover-effect"
        >
          Continue Shopping
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/')} 
          className="w-full"
        >
          View My Orders
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
