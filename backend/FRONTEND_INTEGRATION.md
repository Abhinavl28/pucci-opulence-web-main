# Frontend Integration Guide

This guide explains how to integrate the React frontend with the backend API.

## Step 1: Update API Configuration

Create a new file `src/config/api.ts`:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
```

## Step 2: Update AuthContext

Replace localStorage-based auth with API calls:

```typescript
// src/contexts/AuthContext.tsx
import { API_BASE_URL, getAuthHeaders } from "@/config/api";

const signIn = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return true;
  } catch {
    return false;
  }
};

const signUp = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return true;
  } catch {
    return false;
  }
};

// On mount, verify token and fetch user profile
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("token");
      });
  }
}, []);
```

## Step 3: Update CartContext

Replace localStorage cart with API calls:

```typescript
// src/contexts/CartContext.tsx
import { API_BASE_URL, getAuthHeaders } from "@/config/api";

// Fetch cart from API
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetch(`${API_BASE_URL}/cart`, {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items.map((item: any) => ({
          product: item.product,
          size: item.size,
          quantity: item.quantity,
        })));
      })
      .catch(console.error);
  }
}, []);

const addItem = async (product: Product, size: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect to auth or use local storage as fallback
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        product_id: product.id,
        size,
        quantity: 1,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Update local state
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

const removeItem = async (productId: number, size: string) => {
  // Find cart item ID first, then delete
  const cartItem = items.find(
    (item) => item.product.id === productId && item.size === size
  );
  
  if (!cartItem) return;

  try {
    await fetch(`${API_BASE_URL}/cart/${cartItem.id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    // Update local state
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};
```

## Step 4: Update Product Data Source

Replace static products data with API call:

```typescript
// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";

const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  fetch(`${API_BASE_URL}/products`)
    .then((res) => res.json())
    .then((data) => setProducts(data.products))
    .catch(console.error);
}, []);
```

## Step 5: Update Checkout Page

Replace localStorage order creation with API call:

```typescript
// src/pages/Checkout.tsx
const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!user) {
    toast({ variant: 'destructive', description: 'Please sign in to place an order' });
    navigate('/auth');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        shipping_name,
        shipping_address1,
        shipping_address2,
        shipping_city,
        shipping_state,
        shipping_pincode,
        shipping_phone,
        payment_method,
      }),
    });

    if (response.ok) {
      clearCart();
      toast({ description: 'Order placed successfully!' });
      navigate('/orders');
    } else {
      toast({ variant: 'destructive', description: 'Failed to place order' });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    toast({ variant: 'destructive', description: 'Error placing order' });
  }
};
```

## Step 6: Update Orders Page

Replace localStorage orders with API call:

```typescript
// src/pages/Orders.tsx
useEffect(() => {
  if (!user) {
    navigate('/auth');
    return;
  }

  fetch(`${API_BASE_URL}/orders`, {
    headers: getAuthHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      // Transform API response to match your Order interface
      const transformedOrders = data.orders.map((order: any) => ({
        id: order.id,
        userId: order.user_id,
        items: order.items.map((item: any) => ({
          product: item.product,
          size: item.size,
          quantity: item.quantity,
        })),
        total: parseFloat(order.total_price),
        shipping: {
          name: order.shipping_name,
          address1: order.shipping_address1,
          address2: order.shipping_address2 || "",
          city: order.shipping_city,
          state: order.shipping_state,
          pincode: order.shipping_pincode,
          phone: order.shipping_phone,
        },
        paymentMethod: order.payment_method,
        createdAt: order.createdAt,
      }));
      setOrders(transformedOrders);
    })
    .catch(console.error);
}, [user, navigate]);
```

## Step 7: Update Search Functionality

```typescript
// src/components/SearchDialog.tsx
const searchProducts = async (query: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    setResults(data.products);
  } catch (error) {
    console.error("Search error:", error);
  }
};
```

## Step 8: Environment Variables

Add to your frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 9: CORS Configuration

Ensure the backend CORS_ORIGIN matches your frontend URL. If running on a different port, update `backend/.env`:

```env
CORS_ORIGIN=http://localhost:5173
```

## Testing Checklist

- [ ] Sign up creates user in database
- [ ] Login returns JWT token
- [ ] Products load from API
- [ ] Cart syncs with backend
- [ ] Orders are saved to database
- [ ] Order history displays correctly
- [ ] Search functionality works
- [ ] Authentication persists across page reloads

## Error Handling

Add global error handling for API calls:

```typescript
const handleApiError = async (response: Response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    // Redirect to login
  }
  const error = await response.json();
  throw new Error(error.message || "API Error");
};
```

## Notes

- Store JWT token in localStorage (consider httpOnly cookies for production)
- Handle token expiration (currently 7 days)
- Add loading states for async operations
- Implement proper error boundaries
- Consider using React Query for better data fetching and caching

