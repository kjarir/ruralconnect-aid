
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { MapPin, Cloud, CloudRain, CloudSun, Sun, Droplets, Wind, Thermometer, AlertTriangle, ChevronsUp, Tractor, Leaf, ShoppingBag, Phone, VideoIcon, FileText, HelpCircle, User, PiggyBank, HeartPulse, Calendar as CalendarIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CalendarEvent from '@/components/CalendarEvent';

interface UserData {
  name: string;
  mobile: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [weather, setWeather] = useState({
    temp: 27,
    condition: 'Sunny',
    humidity: 65,
    wind: 12,
    icon: <Sun className="h-10 w-10 text-yellow-500" />
  });
  const [cropHealth, setCropHealth] = useState(78);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUserData = localStorage.getItem('user-data');
    if (!storedUserData) {
      navigate('/');
      return;
    }
    
    setUserData(JSON.parse(storedUserData));
    
    // Simulate fetching weather based on location
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      if (user.location) {
        // In a real app, you would fetch actual weather data using the coordinates
        console.log(`Would fetch weather for: ${user.location.latitude}, ${user.location.longitude}`);
        // Simulate random weather
        const conditions = [
          { temp: 27, condition: 'Sunny', humidity: 65, wind: 12, icon: <Sun className="h-10 w-10 text-yellow-500" /> },
          { temp: 24, condition: 'Partly Cloudy', humidity: 72, wind: 8, icon: <CloudSun className="h-10 w-10 text-blue-400" /> },
          { temp: 21, condition: 'Cloudy', humidity: 80, wind: 15, icon: <Cloud className="h-10 w-10 text-gray-400" /> },
          { temp: 19, condition: 'Rainy', humidity: 90, wind: 20, icon: <CloudRain className="h-10 w-10 text-blue-500" /> }
        ];
        
        setWeather(conditions[Math.floor(Math.random() * conditions.length)]);
      }
    }

    // Simulate loading state for animation purposes
    setTimeout(() => setLoading(false), 800);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-primary font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null; // Will redirect in useEffect
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Sidebar */}
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-md bg-gradient-to-br from-primary/10 to-background">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <User className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-xl">{userData.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3" />
                      {userData.mobile}
                    </CardDescription>
                    {userData.location && (
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Location saved</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Separator />
                  <div className="py-2">
                    <div className="text-sm font-medium mb-1">Quick Access</div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" size="sm" className="h-auto py-2 justify-start hover:bg-primary/10 transition-colors">
                        <Tractor className="h-4 w-4 mr-2" />
                        <span className="text-xs">Farming</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto py-2 justify-start hover:bg-primary/10 transition-colors">
                        <HeartPulse className="h-4 w-4 mr-2" />
                        <span className="text-xs">Health</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto py-2 justify-start hover:bg-primary/10 transition-colors">
                        <PiggyBank className="h-4 w-4 mr-2" />
                        <span className="text-xs">Finance</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto py-2 justify-start hover:bg-primary/10 transition-colors">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        <span className="text-xs">Help</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Main Content */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid gap-6">
              
              {/* Weather Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white text-xl">Today's Weather</CardTitle>
                          <CardDescription className="text-blue-100">
                            {userData.location ? 
                              `Based on your location (${userData.location.latitude.toFixed(4)}, ${userData.location.longitude.toFixed(4)})` : 
                              "Location services disabled"}
                          </CardDescription>
                        </div>
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: [0, 5, 0, -5, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {weather.icon}
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="text-4xl font-bold">{weather.temp}°C</div>
                          <div className="text-blue-100">{weather.condition}</div>
                        </div>
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-5 w-5 text-blue-200" />
                            <div>
                              <div className="text-sm text-blue-100">Humidity</div>
                              <div className="font-medium">{weather.humidity}%</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wind className="h-5 w-5 text-blue-200" />
                            <div>
                              <div className="text-sm text-blue-100">Wind</div>
                              <div className="font-medium">{weather.wind} km/h</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-5 w-5 text-blue-200" />
                            <div>
                              <div className="text-sm text-blue-100">Feels like</div>
                              <div className="font-medium">{weather.temp - 1}°C</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                  <CardFooter className="bg-white p-4">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Weather-based Recommendations</div>
                      </div>
                      <div className="space-y-3">
                        <motion.div 
                          className="flex items-start gap-2"
                          initial="hidden"
                          animate="visible"
                          custom={0}
                          variants={fadeInUp}
                        >
                          <div className="rounded-full bg-green-100 p-1">
                            <Leaf className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="text-sm">
                            <div className="font-medium">Ideal conditions for rice transplanting</div>
                            <div className="text-muted-foreground">The current weather is suitable for rice transplanting activities.</div>
                          </div>
                        </motion.div>
                        <motion.div 
                          className="flex items-start gap-2"
                          initial="hidden"
                          animate="visible"
                          custom={1}
                          variants={fadeInUp}
                        >
                          <div className="rounded-full bg-yellow-100 p-1">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div className="text-sm">
                            <div className="font-medium">Monitor soil moisture</div>
                            <div className="text-muted-foreground">Current conditions may lead to rapid soil drying. Check irrigation needs.</div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Calendar Events Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-none shadow-md">
                  <CardContent className="pt-6">
                    <CalendarEvent selectedDate={date} onDateChange={setDate} />
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Dashboard Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Tabs defaultValue="farm" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="farm">Farm Assist</TabsTrigger>
                    <TabsTrigger value="finance">Finance</TabsTrigger>
                    <TabsTrigger value="health">Healthcare</TabsTrigger>
                    <TabsTrigger value="market">Market</TabsTrigger>
                  </TabsList>
                  
                  {/* Farm Tab */}
                  <TabsContent value="farm" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        variants={fadeInUp}
                      >
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Tractor className="h-5 w-5 text-green-600" />
                              Crop Health Monitor
                            </CardTitle>
                            <CardDescription>Current status of your registered crops</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1 text-sm">
                                  <span>Overall Crop Health</span>
                                  <span className="text-green-600 font-medium">{cropHealth}%</span>
                                </div>
                                <Progress value={cropHealth} className="h-2" />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3 mt-4">
                                <motion.div 
                                  className="border rounded-lg p-3"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                  <div className="text-sm font-medium">Rice (5 acres)</div>
                                  <div className="flex items-center mt-1">
                                    <Badge className="bg-green-100 hover:bg-green-100 text-green-800 text-xs">Healthy</Badge>
                                  </div>
                                </motion.div>
                                <motion.div 
                                  className="border rounded-lg p-3"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                  <div className="text-sm font-medium">Wheat (3 acres)</div>
                                  <div className="flex items-center mt-1">
                                    <Badge className="bg-yellow-100 hover:bg-yellow-100 text-yellow-800 text-xs">Needs Attention</Badge>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm" className="gap-1">
                              <ChevronsUp className="h-4 w-4" />
                              View Detailed Report
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                      
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={fadeInUp}
                      >
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              AI Advisory
                            </CardTitle>
                            <CardDescription>Personalized recommendations</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <motion.div 
                                className="bg-blue-50 p-3 rounded-lg"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                <div className="font-medium text-sm">Irrigation Recommendation</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  Based on soil moisture data and weather forecast, your rice field needs irrigation in the next 48 hours.
                                </div>
                              </motion.div>
                              <motion.div 
                                className="bg-green-50 p-3 rounded-lg"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                <div className="font-medium text-sm">Pest Alert: Low Risk</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  Current conditions show low risk for pest infestations. Continue routine monitoring.
                                </div>
                              </motion.div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm">Ask AI Assistant</Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </div>
                  </TabsContent>
                  
                  {/* Finance Tab */}
                  <TabsContent value="finance" className="space-y-4 mt-4">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      custom={0}
                      variants={fadeInUp}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <PiggyBank className="h-5 w-5 text-primary" />
                            Government Schemes
                          </CardTitle>
                          <CardDescription>Available financial schemes for farmers</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <motion.div 
                              className="border rounded-lg p-4"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="font-medium">PM Kisan Samman Nidhi</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Income support of ₹6,000 per year in three equal installments.
                              </div>
                              <Button className="mt-3" size="sm">Check Eligibility</Button>
                            </motion.div>
                            <motion.div 
                              className="border rounded-lg p-4"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="font-medium">Kisan Credit Card</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Low interest loans for agriculture expenses and farm enhancement.
                              </div>
                              <Button className="mt-3" size="sm">Apply Now</Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                  
                  {/* Health Tab */}
                  <TabsContent value="health" className="space-y-4 mt-4">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      custom={0}
                      variants={fadeInUp}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <HeartPulse className="h-5 w-5 text-red-500" />
                            Telemedicine Services
                          </CardTitle>
                          <CardDescription>Connect with healthcare professionals</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div 
                              className="border rounded-lg p-4"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="font-medium">Video Consultation</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Schedule a video call with a qualified doctor.
                              </div>
                              <Button className="mt-3 w-full" size="sm">
                                <VideoIcon className="mr-2 h-4 w-4" />
                                Book Appointment
                              </Button>
                            </motion.div>
                            <motion.div 
                              className="border rounded-lg p-4"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="font-medium">AI Symptom Checker</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Get preliminary health insights based on your symptoms.
                              </div>
                              <Button className="mt-3 w-full" size="sm" variant="outline">
                                Start Health Check
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                  
                  {/* Market Tab */}
                  <TabsContent value="market" className="space-y-4 mt-4">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      custom={0}
                      variants={fadeInUp}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-orange-500" />
                            Agricultural Marketplace
                          </CardTitle>
                          <CardDescription>Buy inputs and sell your produce</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <motion.div 
                              className="border rounded-lg p-4"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="font-medium">Current Market Prices</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                  <div>
                                    <div className="text-xs font-medium">Rice</div>
                                    <div className="text-sm">₹2,100/q</div>
                                  </div>
                                  <div>
                                    <div className="text-xs font-medium">Wheat</div>
                                    <div className="text-sm">₹2,300/q</div>
                                  </div>
                                  <div>
                                    <div className="text-xs font-medium">Maize</div>
                                    <div className="text-sm">₹1,850/q</div>
                                  </div>
                                </div>
                              </div>
                              <Button className="mt-3" size="sm" variant="outline">View All Prices</Button>
                            </motion.div>
                            <motion.div 
                              className="border rounded-lg p-4"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="font-medium">Sell Your Produce</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                List your harvest and connect with buyers directly.
                              </div>
                              <Button className="mt-3" size="sm">Create Listing</Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
