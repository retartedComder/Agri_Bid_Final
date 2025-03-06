
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { setSelectedProduct, currency } = useProducts();
  
  const handleClick = () => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`);
  };

  const bidCount = product.bids?.length || 0;
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer neo-morphism"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.certifications && product.certifications.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {product.certifications.map((cert, index) => (
              <Badge key={index} variant="secondary" className="bg-black/70 text-white">
                {cert}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <Badge variant="outline" className="bg-primary/10">
            {product.category}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center text-sm">
          <p className="font-semibold">
            {currency}{product.currentPrice.toFixed(2)}
            <span className="text-xs text-muted-foreground"> /unit</span>
          </p>
          <p className="text-muted-foreground">
            {bidCount} {bidCount === 1 ? 'bid' : 'bids'}
          </p>
        </div>
        
        <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
          <p>{product.seller}</p>
          <p>{product.location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
