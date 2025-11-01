import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';

interface OrderItem {
  product: Product;
  size: string;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  shipping: {
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: string;
  createdAt: string;
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

    const allOrders = JSON.parse(localStorage.getItem('pucci_orders') || '[]');
    const userOrders = allOrders.filter((order: Order) => order.userId === user.id);
    setOrders(userOrders.sort((a: Order, b: Order) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
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
                </div>
                <p className="font-sans text-lg font-medium">₹{order.total.toFixed(2)}</p>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
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

              <div className="border-t pt-6 space-y-2">
                <p className="font-sans text-sm font-medium">Shipping Address</p>
                <p className="font-sans text-sm text-muted-foreground">
                  {order.shipping.name}<br />
                  {order.shipping.address1}<br />
                  {order.shipping.address2 && <>{order.shipping.address2}<br /></>}
                  {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}<br />
                  {order.shipping.phone}
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
