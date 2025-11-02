import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/config/api';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [shippingName, setShippingName] = useState(user?.name || '');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({ variant: 'destructive', description: 'Please sign in to place an order' });
      navigate('/auth');
      return;
    }

    const shippingAddress = `${shippingName}, ${address1}${address2 ? ', ' + address2 : ''}, ${city}, ${state} ${pincode}, ${phone}`;

    const orderItems = items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      size: item.size
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          shippingAddress,
          items: orderItems
        }),
      });

      if (response.ok) {
        await clearCart();
        toast({ description: 'Order placed successfully!' });
        navigate('/orders');
      } else {
        toast({ variant: 'destructive', description: 'Failed to place order. Please try again.' });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast({ variant: 'destructive', description: 'An error occurred. Please try again.' });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl tracking-wider">Your bag is empty</h1>
          <Button asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-[1fr,400px] gap-12">
          {/* Left Column - Forms */}
          <form onSubmit={handlePlaceOrder} className="space-y-12">
            {/* Shipping Address */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl tracking-wider">Shipping Address</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-sans text-sm tracking-wide">NAME</Label>
                  <Input
                    id="name"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-sans text-sm tracking-wide">PHONE NUMBER</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address1" className="font-sans text-sm tracking-wide">ADDRESS LINE 1</Label>
                <Input
                  id="address1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address2" className="font-sans text-sm tracking-wide">ADDRESS LINE 2 (OPTIONAL)</Label>
                <Input
                  id="address2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-sans text-sm tracking-wide">CITY</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state" className="font-sans text-sm tracking-wide">STATE</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pincode" className="font-sans text-sm tracking-wide">PINCODE</Label>
                  <Input
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl tracking-wider">Payment</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="font-sans text-sm tracking-wide cursor-pointer">CARD</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="font-sans text-sm tracking-wide cursor-pointer">UPI</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="font-sans text-sm tracking-wide cursor-pointer">CASH ON DELIVERY</Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'card' && (
                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="font-sans text-sm tracking-wide">CARD NUMBER</Label>
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="font-sans text-sm tracking-wide">EXPIRY DATE</Label>
                      <Input
                        id="expiry"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="font-sans text-sm tracking-wide">CVV</Label>
                      <Input
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-2 pt-4">
                  <Label htmlFor="upiId" className="font-sans text-sm tracking-wide">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    required
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full py-6 text-base tracking-wider">
              PLACE ORDER
            </Button>
          </form>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6 border border-border p-8">
            <h2 className="font-serif text-2xl tracking-wider">Order Summary</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="w-20 h-28 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-sans text-sm">{item.product.name}</p>
                    <p className="font-sans text-sm text-muted-foreground">Size: {item.size}</p>
                    <p className="font-sans text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="font-sans text-sm">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="flex justify-between font-sans text-sm">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-sans text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-sans text-lg font-medium border-t pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
