
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Menu, X, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  transparent?: boolean;
}

interface UserData {
  name: string;
  mobile: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    const userData = localStorage.getItem('user-data');
    if (userData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(userData));
    }
  }, []);

  const requestLocationAccess = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        toast({
          title: "Location Not Available",
          description: "Your browser doesn't support geolocation.",
          variant: "destructive"
        });
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => {
          toast({
            title: "Location Access Denied",
            description: "Please enable location access for better service.",
            variant: "destructive"
          });
          reject(error);
        },
        { enableHighAccuracy: true }
      );
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mobile = formData.get('mobile') as string;
    const password = formData.get('password') as string;

    // Basic validation
    if (!mobile || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      // Request location access
      const position = await requestLocationAccess();
      
      // In a real app, you would validate credentials against a backend
      // For this demo, we're just simulating a successful login
      
      // Get stored user data for this mobile (in a real app, this would come from backend)
      const allUsers = JSON.parse(localStorage.getItem('all-users') || '[]');
      const user = allUsers.find((u: any) => u.mobile === mobile && u.password === password);
      
      if (!user) {
        toast({
          title: "Login Failed",
          description: "Invalid mobile number or password",
          variant: "destructive"
        });
        return;
      }

      // Update user location
      const userData: UserData = {
        name: user.name,
        mobile: user.mobile,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      };

      // Store in localStorage
      localStorage.setItem('user-data', JSON.stringify(userData));
      setUserData(userData);
      setIsLoggedIn(true);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      // If location was denied, still allow login but without location
      const allUsers = JSON.parse(localStorage.getItem('all-users') || '[]');
      const user = allUsers.find((u: any) => u.mobile === mobile && u.password === password);
      
      if (!user) {
        toast({
          title: "Login Failed",
          description: "Invalid mobile number or password",
          variant: "destructive"
        });
        return;
      }

      const userData: UserData = {
        name: user.name,
        mobile: user.mobile
      };

      localStorage.setItem('user-data', JSON.stringify(userData));
      setUserData(userData);
      setIsLoggedIn(true);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}! (Location access denied)`,
      });

      navigate('/dashboard');
    }
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const mobile = formData.get('mobile') as string;
    const password = formData.get('password') as string;

    // Basic validation
    if (!name || !mobile || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Simple mobile validation (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }

    // Store user in localStorage (in a real app, this would go to a backend)
    const allUsers = JSON.parse(localStorage.getItem('all-users') || '[]');
    
    // Check if mobile already exists
    if (allUsers.some((user: any) => user.mobile === mobile)) {
      toast({
        title: "Registration Failed",
        description: "This mobile number is already registered",
        variant: "destructive"
      });
      return;
    }
    
    // Add user to all-users array
    allUsers.push({ name, mobile, password });
    localStorage.setItem('all-users', JSON.stringify(allUsers));
    
    toast({
      title: "Registration Successful",
      description: "Please log in with your credentials",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user-data');
    setIsLoggedIn(false);
    setUserData(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
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
          
          {isLoggedIn && userData ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User size={16} />
                <span>{userData.name}</span>
                {userData.location && (
                  <div className="flex items-center text-xs text-muted-foreground ml-2">
                    <MapPin size={12} className="mr-1" />
                    <span>Location saved</span>
                  </div>
                )}
              </div>
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
                <DialogTitle>Account Access</DialogTitle>
                <DialogDescription>
                  Join RuralConnect to access all features and resources
                </DialogDescription>
                
                <Tabs defaultValue="login" className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input id="mobile" name="mobile" placeholder="10-digit mobile number" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        By logging in, you'll be asked to share your location for personalized services
                      </div>
                      <Button type="submit" className="w-full">Login</Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input id="signup-name" name="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-mobile">Mobile Number</Label>
                        <Input id="signup-mobile" name="mobile" placeholder="10-digit mobile number" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input id="signup-password" name="password" type="password" required />
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
          
          {isLoggedIn && userData ? (
            <>
              <div className="py-3 px-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800">
                <User size={18} />
                <span>{userData.name}</span>
              </div>
              
              {userData.location && (
                <div className="py-2 px-4 flex items-center gap-2 text-sm text-muted-foreground border-b border-gray-100 dark:border-gray-800">
                  <MapPin size={14} />
                  <span>Location saved</span>
                </div>
              )}
              
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
                <DialogTitle>Account Access</DialogTitle>
                <DialogDescription>
                  Join RuralConnect to access all features and resources
                </DialogDescription>
                
                <Tabs defaultValue="login" className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-mobile">Mobile Number</Label>
                        <Input id="mobile-mobile" name="mobile" placeholder="10-digit mobile number" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-password">Password</Label>
                        <Input id="mobile-password" name="password" type="password" required />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        By logging in, you'll be asked to share your location for personalized services
                      </div>
                      <Button type="submit" className="w-full">Login</Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-signup-name">Full Name</Label>
                        <Input id="mobile-signup-name" name="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-signup-mobile">Mobile Number</Label>
                        <Input id="mobile-signup-mobile" name="mobile" placeholder="10-digit mobile number" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-signup-password">Password</Label>
                        <Input id="mobile-signup-password" name="password" type="password" required />
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
