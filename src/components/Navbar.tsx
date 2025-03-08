
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Menu, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('auth-token', 'demo-token');
    setIsLoggedIn(true);
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate signup
    localStorage.setItem('auth-token', 'demo-token');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out',
        isScrolled || !transparent 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="text-xl font-medium flex items-center gap-2 animate-fade-in"
        >
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            RC
          </span>
          <span>RuralConnect</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="menu-link py-2 text-sm font-medium">Features</a>
          <a href="#how-it-works" className="menu-link py-2 text-sm font-medium">How It Works</a>
          <a href="#testimonials" className="menu-link py-2 text-sm font-medium">Testimonials</a>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/dashboard')} variant="ghost" className="text-sm font-medium">
                Dashboard
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Log Out
              </Button>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="default" 
                  className="px-6 py-5 rounded-xl bg-primary text-white text-sm font-medium btn-hover-effect"
                >
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="email@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full">Login</Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input id="signup-name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input id="signup-email" type="email" placeholder="email@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input id="signup-password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full">Create Account</Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-gray-500 focus:outline-none"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out pt-20",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="px-6 py-4 flex flex-col space-y-4">
          <a 
            href="#features" 
            className="py-3 px-4 text-lg font-medium border-b border-gray-100 dark:border-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="py-3 px-4 text-lg font-medium border-b border-gray-100 dark:border-gray-800"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#testimonials" 
            className="py-3 px-4 text-lg font-medium border-b border-gray-100 dark:border-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Testimonials
          </a>
          
          {isLoggedIn ? (
            <>
              <Button 
                onClick={() => {
                  navigate('/dashboard');
                  setIsOpen(false);
                }} 
                variant="ghost" 
                className="justify-start py-3 px-4 text-lg font-medium"
              >
                Dashboard
              </Button>
              <Button 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                variant="outline" 
                className="mt-4"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="default" 
                  className="mt-4 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                {/* Same login/signup tabs as desktop */}
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-email">Email</Label>
                        <Input id="mobile-email" type="email" placeholder="email@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-password">Password</Label>
                        <Input id="mobile-password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full">Login</Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-signup-name">Full Name</Label>
                        <Input id="mobile-signup-name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-signup-email">Email</Label>
                        <Input id="mobile-signup-email" type="email" placeholder="email@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-signup-password">Password</Label>
                        <Input id="mobile-signup-password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full">Create Account</Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
