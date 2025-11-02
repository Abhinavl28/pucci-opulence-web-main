import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface ShoppingBagProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShoppingBag = ({ open, onOpenChange }: ShoppingBagProps) => {
  const { items, updateQuantity, removeItem, total } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-serif text-3xl tracking-wider">Shopping Bag</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-sans text-muted-foreground">Your bag is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-8 space-y-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                    <div className="w-24 h-32 overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-sans text-sm tracking-wide">{item.product.name}</h3>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="hover:opacity-60 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="font-sans text-sm text-muted-foreground">Size: {item.size}</p>
                      <p className="font-sans text-sm">₹{item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-foreground hover:bg-accent transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-sans text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-foreground hover:bg-accent transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between font-sans text-lg">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                
                <Button asChild className="w-full py-6 text-base tracking-wider">
                  <Link to="/checkout" onClick={() => onOpenChange(false)}>
                    PROCEED TO CHECKOUT
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
