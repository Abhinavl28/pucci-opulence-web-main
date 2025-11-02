import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/config/api';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  sizes: string;
  description: string;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  size: string;
  price: number;
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  createdAt: string;
  orderItems: OrderItem[];
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl tracking-wider">No Orders Yet</h1>
          <Button asChild>
            <a href="/">Start Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="font-serif text-5xl tracking-wider mb-12">Order History</h1>
        
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border border-border p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-sans text-sm text-muted-foreground">
                    Order #{order.id}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    Status: <span className="uppercase font-medium">{order.status}</span>
                  </p>
                </div>
                <p className="font-sans text-lg font-medium">₹{order.totalAmount.toFixed(2)}</p>
              </div>

              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
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
                      <p className="font-sans text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 space-y-2">
                <p className="font-sans text-sm font-medium">Shipping Address</p>
                <p className="font-sans text-sm text-muted-foreground whitespace-pre-line">
                  {order.shippingAddress}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
