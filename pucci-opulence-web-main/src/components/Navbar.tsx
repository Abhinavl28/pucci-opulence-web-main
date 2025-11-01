import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag as ShoppingBagSheet } from './ShoppingBag';
import { SearchDialog } from './SearchDialog';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [bagOpen, setBagOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-[1920px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/tops" className="text-sm font-sans tracking-wider hover:opacity-60 transition-opacity">
              TOPS
            </Link>
            <Link to="/trousers" className="text-sm font-sans tracking-wider hover:opacity-60 transition-opacity">
              TROUSERS
            </Link>
            <Link to="/stores" className="text-sm font-sans tracking-wider hover:opacity-60 transition-opacity">
              STORES
            </Link>
          </div>
          
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-widest">
            PUCCI
          </Link>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSearchOpen(true)}
              className="hover:opacity-60 transition-opacity" 
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <Link 
                to="/account"
                className="text-sm font-sans tracking-wider hover:opacity-60 transition-opacity"
              >
                ACCOUNT
              </Link>
            ) : (
              <Link 
                to="/auth"
                className="text-sm font-sans tracking-wider hover:opacity-60 transition-opacity"
              >
                SIGN IN
              </Link>
            )}
            
            <button 
              onClick={() => setBagOpen(true)}
              className="hover:opacity-60 transition-opacity relative" 
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs w-5 h-5 flex items-center justify-center rounded-full font-sans">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      <ShoppingBagSheet open={bagOpen} onOpenChange={setBagOpen} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
