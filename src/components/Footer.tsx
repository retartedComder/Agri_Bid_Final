
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-50 border-t border-green-100 mt-16">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-green-700 mb-4">AgriBid</h3>
            <p className="text-sm text-muted-foreground">
              Connecting farmers directly with buyers through a transparent and fair bidding platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-green-700">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-green-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-green-700">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-green-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-green-700">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-green-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-muted-foreground hover:text-green-700">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: info@agribid.com
              </li>
              <li className="text-muted-foreground">
                Phone: +91 1234567890
              </li>
              <li className="text-muted-foreground">
                Address: 123 Agri Lane, Farmville, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-100 mt-8 pt-8 text-sm text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AgriBid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
