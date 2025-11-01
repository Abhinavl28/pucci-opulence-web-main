import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 mt-32">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-sans text-sm tracking-wider mb-6">CUSTOMER SERVICE</h3>
          <ul className="space-y-3">
            <li><Link to="#" className="text-sm hover:opacity-60 transition-opacity">Contact Us</Link></li>
            <li><Link to="#" className="text-sm hover:opacity-60 transition-opacity">FAQ</Link></li>
            <li><Link to="#" className="text-sm hover:opacity-60 transition-opacity">Shipping</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-sans text-sm tracking-wider mb-6">THE COMPANY</h3>
          <ul className="space-y-3">
            <li><Link to="#" className="text-sm hover:opacity-60 transition-opacity">About PUCCI</Link></li>
            <li><Link to="#" className="text-sm hover:opacity-60 transition-opacity">Careers</Link></li>
            <li><Link to="/stores" className="text-sm hover:opacity-60 transition-opacity">Store Locator</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-sans text-sm tracking-wider mb-6">SOCIALS</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
