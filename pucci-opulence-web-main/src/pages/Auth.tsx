import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignIn) {
      const success = await signIn(email, password);
      if (success) {
        toast({ description: 'Signed in successfully' });
        navigate('/');
      } else {
        toast({ variant: 'destructive', description: 'Invalid email or password' });
      }
    } else {
      if (!name || !phone) {
        toast({ variant: 'destructive', description: 'Please fill in all fields' });
        return;
      }
      const success = await signUp(name, email, phone, password);
      if (success) {
        toast({ description: 'Account created successfully' });
        navigate('/');
      } else {
        toast({ variant: 'destructive', description: 'Email already exists' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="w-full max-w-md space-y-8">
        <h1 className="font-serif text-5xl text-center tracking-wider">
          {isSignIn ? 'Sign In' : 'Create Account'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isSignIn && (
            <div className="space-y-2">
              <Label htmlFor="name" className="font-sans text-sm tracking-wide">NAME</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-sans"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-sans text-sm tracking-wide">EMAIL</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-sans"
              required
            />
          </div>

          {!isSignIn && (
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-sans text-sm tracking-wide">PHONE NUMBER</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="font-sans"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="password" className="font-sans text-sm tracking-wide">PASSWORD</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-sans"
              required
            />
          </div>
          
          <Button type="submit" className="w-full py-6 text-base tracking-wider">
            {isSignIn ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </Button>
        </form>
        
        <p className="text-center font-sans text-sm">
          {isSignIn ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="underline hover:opacity-60 transition-opacity"
          >
            {isSignIn ? 'Create one' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
