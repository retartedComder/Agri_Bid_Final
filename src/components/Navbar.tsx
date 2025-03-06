
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useProducts();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-50 border-b border-green-100 shadow-sm py-3 px-4 md:px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-green-700">
          AgriBid
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-green-700 hover:bg-green-100" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-green-700 hover:text-green-800 hover:underline">
            Home
          </Link>
          {isAuthenticated && currentUser?.userType === 'farmer' && (
            <Link to="/add-product" className="text-green-700 hover:text-green-800 hover:underline">
              Add Product
            </Link>
          )}
          {isAuthenticated && currentUser?.userType === 'buyer' && (
            <Link to="/my-bids" className="text-green-700 hover:text-green-800 hover:underline">
              My Bids
            </Link>
          )}
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center text-green-700 hover:bg-green-100">
                  <User size={18} className="mr-2" />
                  <span>{currentUser?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {currentUser?.name}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {currentUser?.userType.charAt(0).toUpperCase() + currentUser?.userType.slice(1)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                {currentUser?.userType === 'farmer' && (
                  <DropdownMenuItem onClick={() => navigate("/my-products")}>
                    My Products
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="text-green-700 border-green-600 hover:bg-green-100"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <Link to="/" className="text-2xl font-display font-bold text-green-700">
                AgriBid
              </Link>
              <button 
                className="p-2 rounded-md text-green-700 hover:bg-green-100" 
                onClick={toggleMenu}
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-green-700 py-2 border-b border-gray-100" 
                onClick={toggleMenu}
              >
                Home
              </Link>
              {isAuthenticated && currentUser?.userType === 'farmer' && (
                <Link 
                  to="/add-product" 
                  className="text-green-700 py-2 border-b border-gray-100" 
                  onClick={toggleMenu}
                >
                  Add Product
                </Link>
              )}
              {isAuthenticated && currentUser?.userType === 'buyer' && (
                <Link 
                  to="/my-bids" 
                  className="text-green-700 py-2 border-b border-gray-100" 
                  onClick={toggleMenu}
                >
                  My Bids
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-green-700 py-2 border-b border-gray-100" 
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  {currentUser?.userType === 'farmer' && (
                    <Link 
                      to="/my-products" 
                      className="text-green-700 py-2 border-b border-gray-100" 
                      onClick={toggleMenu}
                    >
                      My Products
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }} 
                    className="text-destructive py-2 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/login');
                      toggleMenu();
                    }}
                    className="text-green-700 border-green-600 hover:bg-green-100"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/register');
                      toggleMenu();
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
