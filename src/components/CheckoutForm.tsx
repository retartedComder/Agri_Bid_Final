
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { PaymentDetails, Product } from '@/types';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Lock, Truck } from 'lucide-react';

interface CheckoutFormProps {
  product: Product;
  onComplete: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ product, onComplete }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    email: '',
    phone: ''
  });
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };
  
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };
  
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your order has been placed successfully!");
      setIsLoading(false);
      onComplete();
    }, 1500);
  };
  
  const getStepIcon = (currentStep: 'shipping' | 'payment' | 'review', stepName: 'shipping' | 'payment' | 'review') => {
    if (stepName === currentStep) {
      return <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
        {stepName === 'shipping' ? '1' : stepName === 'payment' ? '2' : '3'}
      </div>;
    }
    
    const isCompleted = 
      (stepName === 'shipping' && (currentStep === 'payment' || currentStep === 'review')) ||
      (stepName === 'payment' && currentStep === 'review');
      
    if (isCompleted) {
      return <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center">
        <CheckCircle className="h-5 w-5" />
      </div>;
    }
    
    return <div className="h-8 w-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center">
      {stepName === 'shipping' ? '1' : stepName === 'payment' ? '2' : '3'}
    </div>;
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto animate-scale-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          {getStepIcon(step, 'shipping')}
          <span className={step === 'shipping' ? 'font-medium' : 'text-muted-foreground'}>Shipping</span>
        </div>
        <Separator className="flex-1 mx-4" />
        <div className="flex items-center gap-2">
          {getStepIcon(step, 'payment')}
          <span className={step === 'payment' ? 'font-medium' : 'text-muted-foreground'}>Payment</span>
        </div>
        <Separator className="flex-1 mx-4" />
        <div className="flex items-center gap-2">
          {getStepIcon(step, 'review')}
          <span className={step === 'review' ? 'font-medium' : 'text-muted-foreground'}>Review</span>
        </div>
      </div>
      
      {step === 'shipping' && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" /> Shipping Information
            </CardTitle>
            <CardDescription>Enter your shipping details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitShipping} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={shippingDetails.fullName} 
                    onChange={handleShippingChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={shippingDetails.email} 
                    onChange={handleShippingChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input 
                    id="addressLine1" 
                    name="addressLine1" 
                    value={shippingDetails.addressLine1} 
                    onChange={handleShippingChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                  <Input 
                    id="addressLine2" 
                    name="addressLine2" 
                    value={shippingDetails.addressLine2} 
                    onChange={handleShippingChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={shippingDetails.city} 
                    onChange={handleShippingChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    value={shippingDetails.state} 
                    onChange={handleShippingChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input 
                    id="zipCode" 
                    name="zipCode" 
                    value={shippingDetails.zipCode} 
                    onChange={handleShippingChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={shippingDetails.phone} 
                    onChange={handleShippingChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full md:w-auto button-hover-effect">
                  Continue to Payment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      {step === 'payment' && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Payment Information
            </CardTitle>
            <CardDescription>Enter your payment details securely</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  name="cardNumber" 
                  placeholder="1234 5678 9012 3456" 
                  value={paymentDetails.cardNumber} 
                  onChange={handlePaymentChange} 
                  maxLength={19}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardHolder">Card Holder Name</Label>
                <Input 
                  id="cardHolder" 
                  name="cardHolder" 
                  placeholder="John Doe" 
                  value={paymentDetails.cardHolder} 
                  onChange={handlePaymentChange} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input 
                    id="expiryDate" 
                    name="expiryDate" 
                    placeholder="MM/YY" 
                    value={paymentDetails.expiryDate} 
                    onChange={handlePaymentChange} 
                    maxLength={5}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    name="cvv" 
                    placeholder="123" 
                    value={paymentDetails.cvv} 
                    onChange={handlePaymentChange} 
                    maxLength={4}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Input 
                  id="billingAddress" 
                  name="billingAddress" 
                  placeholder="Same as shipping address" 
                  value={paymentDetails.billingAddress} 
                  onChange={handlePaymentChange} 
                  required 
                />
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <Lock className="h-4 w-4" />
                <p>Your payment information is encrypted and secure</p>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep('shipping')}
                >
                  Back
                </Button>
                <Button type="submit" className="button-hover-effect">
                  Review Order
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      {step === 'review' && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Order Review</CardTitle>
            <CardDescription>Please review your order before confirming</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium">Product Details</h3>
              <div className="bg-secondary/50 p-4 rounded-lg flex items-center gap-4">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="h-20 w-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.seller}</p>
                  <p className="text-sm">Quantity: 1</p>
                  <p className="font-medium mt-1">${product.currentPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium">Shipping Information</h3>
                <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                  <p className="font-medium">{shippingDetails.fullName}</p>
                  <p className="text-sm">{shippingDetails.addressLine1}</p>
                  {shippingDetails.addressLine2 && <p className="text-sm">{shippingDetails.addressLine2}</p>}
                  <p className="text-sm">
                    {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}
                  </p>
                  <p className="text-sm">{shippingDetails.country}</p>
                  <p className="text-sm mt-2">Email: {shippingDetails.email}</p>
                  <p className="text-sm">Phone: {shippingDetails.phone}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">Payment Information</h3>
                <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                  <p className="font-medium">
                    Card ending in {paymentDetails.cardNumber.slice(-4)}
                  </p>
                  <p className="text-sm">{paymentDetails.cardHolder}</p>
                  <p className="text-sm">Expires: {paymentDetails.expiryDate}</p>
                  <p className="text-sm mt-2">Billing Address:</p>
                  <p className="text-sm">{paymentDetails.billingAddress}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Order Summary</h3>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${product.currentPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>$10.00</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>${(product.currentPrice * 0.085).toFixed(2)}</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>${(product.currentPrice + 10 + product.currentPrice * 0.085).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setStep('payment')}
            >
              Back
            </Button>
            <Button 
              onClick={handleSubmitOrder} 
              className="button-hover-effect"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm Order"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CheckoutForm;
