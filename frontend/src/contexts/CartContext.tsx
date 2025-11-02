import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';
import { API_BASE_URL } from '@/config/api';
import { useAuth } from '@/contexts/AuthContext';

interface CartItem {
  id?: number;
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  const refreshCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart/user/${user.id}`);
      if (response.ok) {
        const cartData = await response.json();
        setItems(cartData);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addItem = async (product: Product, size: string) => {
    if (!user) {
      console.error('User must be logged in to add to cart');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
          quantity: 1,
          size: size,
        }),
      });

      if (response.ok) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeItem = async (productId: number, size: string) => {
    const cartItem = items.find(item => item.product.id === productId && item.size === size);
    if (!cartItem?.id) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart/${cartItem.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(productId, size);
      return;
    }

    const cartItem = items.find(item => item.product.id === productId && item.size === size);
    if (!cartItem?.id) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart/${cartItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart/user/${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
