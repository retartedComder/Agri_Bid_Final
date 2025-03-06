
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import CheckoutForm from '@/components/CheckoutForm';
import OrderConfirmation from '@/components/OrderConfirmation';

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, selectedProduct, setSelectedProduct, isHighestBidder, currentUser } = useProducts();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  
  useEffect(() => {
    if (!selectedProduct && id) {
      const product = products.find(p => p.id === id);
      if (product) {
        setSelectedProduct(product);
      } else {
        navigate('/');
      }
    }
    
    // Redirect if not the highest bidder
    if (selectedProduct && !isHighestBidder(selectedProduct.id, currentUser.id)) {
      navigate(`/product/${id}`);
    }
  }, [id, products, selectedProduct, setSelectedProduct, navigate, isHighestBidder, currentUser.id]);
  
  if (!selectedProduct) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p>Loading checkout...</p>
      </div>
    );
  }
  
  const handleOrderComplete = () => {
    setIsOrderComplete(true);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {!isOrderComplete ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase for {selectedProduct.name}</p>
          </div>
          <CheckoutForm 
            product={selectedProduct} 
            onComplete={handleOrderComplete} 
          />
        </>
      ) : (
        <OrderConfirmation />
      )}
    </div>
  );
};

export default Checkout;
