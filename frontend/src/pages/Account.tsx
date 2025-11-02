import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    signOut();
    toast({ description: 'Signed out successfully' });
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="font-serif text-5xl tracking-wider mb-12">My Account</h1>
        
        <div className="space-y-12">
          {/* Account Details */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl tracking-wider">Account Details</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-sans text-sm tracking-wide text-muted-foreground">NAME</p>
                <p className="font-sans text-base">{user.name}</p>
              </div>
              
              <div className="space-y-2">
                <p className="font-sans text-sm tracking-wide text-muted-foreground">EMAIL</p>
                <p className="font-sans text-base">{user.email}</p>
              </div>
              
              <div className="space-y-2">
                <p className="font-sans text-sm tracking-wide text-muted-foreground">PHONE</p>
                <p className="font-sans text-base">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl tracking-wider">Quick Links</h2>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-base py-6"
                asChild
              >
                <Link to="/orders">View Order History</Link>
              </Button>
            </div>
          </div>

          {/* Sign Out */}
          <div className="pt-6 border-t">
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="w-full sm:w-auto py-6 px-12 text-base tracking-wider"
            >
              SIGN OUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
