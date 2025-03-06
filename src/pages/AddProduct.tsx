
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';

const AddProduct: React.FC = () => {
  const { addProduct, currentUser, isAuthenticated, currency } = useProducts();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [startingPrice, setStartingPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if not logged in as a farmer
  React.useEffect(() => {
    if (!isAuthenticated || currentUser?.userType !== 'farmer') {
      toast.error('Only farmers can add products');
      navigate('/');
    }
  }, [isAuthenticated, currentUser, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !imageUrl || !startingPrice || !quantity || !category || !location) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      addProduct({
        name,
        description,
        imageUrl,
        startingPrice,
        currentPrice: startingPrice,
        quantity,
        category,
        location,
        seller: currentUser?.name || 'Unknown Seller',
      });
      
      toast.success('Product added successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Error adding product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">Add New Product</CardTitle>
          <CardDescription>
            List your agricultural products for buyers to bid on
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name*</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="imageUrl">Image URL*</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Provide a direct link to an image of your product
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startingPrice">Starting Price ({currency})*</Label>
                  <Input
                    id="startingPrice"
                    type="number"
                    min={1}
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity*</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category*</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Fruits, Vegetables, Dairy"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location*</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Mumbai, Delhi"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
