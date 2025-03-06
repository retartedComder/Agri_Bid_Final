
import React from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Search, Wheat } from 'lucide-react';

const Index: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-2">
              Direct from farms to your table
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              The Marketplace for <span className="text-gradient">Agricultural Products</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover and bid on the freshest produce directly from farmers. 
              Support sustainable agriculture and get quality products at fair prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="button-hover-effect px-6">
                Browse Products
              </Button>
              <Button variant="outline" className="px-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="py-8 px-4 container mx-auto max-w-6xl">
        <div className="bg-card neo-morphism p-6 rounded-lg -mt-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, categories, or farms..."
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Button className="w-full">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-12 px-4 container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-bold">Featured Categories</h2>
          <Button variant="link">View All</Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Fruits', 'Vegetables', 'Dairy', 'Seafood'].map((category, index) => (
            <div key={index} className="bg-secondary/50 hover:bg-secondary transition-colors rounded-lg p-6 text-center cursor-pointer">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wheat className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">{category}</h3>
              <p className="text-sm text-muted-foreground mt-2">Fresh products</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Products */}
      <section className="py-12 px-4 container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-bold">Current Auctions</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Newest
            </Button>
            <Button variant="outline" size="sm">
              Ending Soon
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-display font-bold mb-12">Why Choose AgriBid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Direct from Farmers</h3>
              <p className="text-muted-foreground">
                Buy directly from farmers without middlemen, ensuring freshness and fair prices.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                All products are verified for quality and authenticity before listing.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Sustainable Practices</h3>
              <p className="text-muted-foreground">
                Supporting farmers who follow sustainable and ethical farming practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
