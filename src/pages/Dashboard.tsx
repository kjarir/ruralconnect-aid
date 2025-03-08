
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Cloud, 
  MessageSquare, 
  FileText, 
  Stethoscope, 
  ChevronLeft, 
  User, 
  Activity, 
  Mic, 
  Send,
  Bell,
  Calendar,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Droplets,
  Sun,
  Wind,
  Leaf,
  Clock,
  FileCheck,
  UserCheck,
  MapPin
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages([...messages, { id: Date.now(), text: inputValue, sender: 'user' }]);
    setInputValue('');
    
    // Simulate AI response after delay
    setTimeout(() => {
      const responses = [
        "I can help you with information about government schemes for small farmers.",
        "Based on current weather patterns, today would be good for irrigation.",
        "To apply for the PM Kisan program, you'll need your Aadhaar card and land documents.",
        "Rice crops typically need 4-5 inches of water per week during growing season."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { id: Date.now(), text: randomResponse, sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="w-full md:w-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2 text-slate-600 dark:text-slate-300" 
                onClick={() => navigate('/')}
              >
                <ChevronLeft size={16} className="mr-1" /> Back to Home
              </Button>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text">Welcome to RuralConnect</h1>
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                  <Leaf size={14} className="mr-1" /> Farmer
                </Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Access all rural support services in one place</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="gap-2 border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 dark:text-amber-400">
                <Bell size={14} /> Notifications <Badge className="ml-1 bg-amber-500 text-white">3</Badge>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 dark:text-purple-400">
                <User size={14} /> Profile
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400">
                <MapPin size={14} /> Rajasthan
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white">
                <Mic size={14} /> Voice Assistant
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Today's Weather</p>
                  <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300">28°C</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Partly Cloudy</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <Sun size={24} className="text-blue-500 dark:text-blue-300" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">Soil Moisture</p>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">68%</h3>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                    <ArrowUp size={12} className="mr-1" /> 5% from yesterday
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                  <Droplets size={24} className="text-green-500 dark:text-green-300" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Schemes Available</p>
                  <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300">12</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400">4 new this month</p>
                </div>
                <div className="h-12 w-12 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center">
                  <FileCheck size={24} className="text-amber-500 dark:text-amber-300" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Health Checkup</p>
                  <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300">9 Aug</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400">Next village camp</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                  <Calendar size={24} className="text-purple-500 dark:text-purple-300" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="chatbot" className="space-y-6">
            <TabsList className="grid grid-cols-4 gap-2 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
              <TabsTrigger value="chatbot" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-lg gap-2 transition-all duration-200">
                <MessageSquare size={16} className="text-blue-500" />
                <span className="hidden md:inline">AI Assistant</span>
              </TabsTrigger>
              <TabsTrigger value="weather" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-lg gap-2 transition-all duration-200">
                <Cloud size={16} className="text-sky-500" />
                <span className="hidden md:inline">Weather & Crops</span>
              </TabsTrigger>
              <TabsTrigger value="schemes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-lg gap-2 transition-all duration-200">
                <FileText size={16} className="text-amber-500" />
                <span className="hidden md:inline">Govt. Schemes</span>
              </TabsTrigger>
              <TabsTrigger value="telemedicine" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-lg gap-2 transition-all duration-200">
                <Stethoscope size={16} className="text-red-500" />
                <span className="hidden md:inline">Telemedicine</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chatbot" className="space-y-4 animate-fade-in">
              <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-b border-blue-100 dark:border-blue-800">
                  <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center">
                    <MessageSquare size={20} className="mr-2 text-blue-500" /> AI Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask any questions about farming, weather, healthcare, or government schemes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 h-80 overflow-y-auto flex flex-col space-y-3">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`${
                          message.sender === 'user' 
                            ? 'ml-auto bg-blue-500 text-white' 
                            : 'mr-auto bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                        } rounded-2xl py-2 px-4 max-w-[80%] animate-fade-in shadow-sm`}
                      >
                        {message.text}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-blue-100 dark:border-blue-800 p-3 bg-white dark:bg-slate-800">
                  <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                    <Input 
                      placeholder="Type your message or question..." 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="flex-1 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                    <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Send size={18} />
                    </Button>
                    <Button type="button" size="icon" variant="outline" className="border-blue-200 dark:border-blue-800">
                      <Mic size={18} className="text-blue-500" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="weather" className="space-y-4 animate-fade-in">
              <Card className="border-sky-200 dark:border-sky-800">
                <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-b border-sky-100 dark:border-sky-800">
                  <CardTitle className="text-sky-800 dark:text-sky-300 flex items-center">
                    <Cloud size={20} className="mr-2 text-sky-500" /> Weather & Crop Advisory
                  </CardTitle>
                  <CardDescription>
                    Get real-time weather updates and crop recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-4 border border-sky-100 dark:border-sky-800">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-xl font-semibold text-sky-800 dark:text-sky-300">Jaipur, Rajasthan</h3>
                            <p className="text-sky-600 dark:text-sky-400 text-sm">Today, July 30</p>
                          </div>
                          <Sun size={32} className="text-amber-500" />
                        </div>
                        <div className="flex items-end mt-4">
                          <span className="text-4xl font-bold text-sky-800 dark:text-sky-300">28°C</span>
                          <span className="text-sky-600 dark:text-sky-400 ml-2 pb-1">Partly Cloudy</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                            <Wind size={18} className="mx-auto text-sky-500" />
                            <p className="text-xs mt-1 text-sky-700 dark:text-sky-300">12 km/h</p>
                            <p className="text-xs text-sky-600 dark:text-sky-400">Wind</p>
                          </div>
                          <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                            <Droplets size={18} className="mx-auto text-sky-500" />
                            <p className="text-xs mt-1 text-sky-700 dark:text-sky-300">45%</p>
                            <p className="text-xs text-sky-600 dark:text-sky-400">Humidity</p>
                          </div>
                          <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                            <Clock size={18} className="mx-auto text-sky-500" />
                            <p className="text-xs mt-1 text-sky-700 dark:text-sky-300">6:45 PM</p>
                            <p className="text-xs text-sky-600 dark:text-sky-400">Sunset</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Crop Recommendations</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center text-green-700 dark:text-green-400 text-sm">
                            <Leaf size={16} className="mr-2 text-green-500" />
                            Ideal conditions for wheat irrigation today
                          </li>
                          <li className="flex items-center text-green-700 dark:text-green-400 text-sm">
                            <Leaf size={16} className="mr-2 text-green-500" />
                            Consider harvesting mature crops before weekend rain
                          </li>
                          <li className="flex items-center text-green-700 dark:text-green-400 text-sm">
                            <Leaf size={16} className="mr-2 text-green-500" />
                            Apply fertilizer in the morning for best results
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800">
                        <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">Pest Alert</h3>
                        <p className="text-amber-700 dark:text-amber-400 text-sm">
                          Increased risk of aphids due to humid conditions. Consider organic neem oil spray.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schemes" className="space-y-4 animate-fade-in">
              <Card className="border-amber-200 dark:border-amber-800">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-b border-amber-100 dark:border-amber-800">
                  <CardTitle className="text-amber-800 dark:text-amber-300 flex items-center">
                    <FileText size={20} className="mr-2 text-amber-500" /> Government Schemes
                  </CardTitle>
                  <CardDescription>
                    Explore and apply for relevant subsidies, loans, and benefits.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-amber-100 dark:border-amber-900 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="bg-amber-50 dark:bg-amber-900/40 pb-2">
                        <Badge className="mb-1 w-fit bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-700">
                          High Priority
                        </Badge>
                        <CardTitle className="text-base text-amber-800 dark:text-amber-300">PM-KISAN</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          ₹6,000 yearly financial benefit to all farmer families
                        </p>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center">
                          <Calendar size={12} className="mr-1" /> Deadline: Aug 15, 2023
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full mt-2 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/30">
                          Check Eligibility
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-amber-100 dark:border-amber-900 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="bg-amber-50 dark:bg-amber-900/40 pb-2">
                        <Badge className="mb-1 w-fit bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-700">
                          New
                        </Badge>
                        <CardTitle className="text-base text-amber-800 dark:text-amber-300">Crop Insurance</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Pradhan Mantri Fasal Bima Yojana for crop loss protection
                        </p>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center">
                          <Calendar size={12} className="mr-1" /> Deadline: Sep 30, 2023
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full mt-2 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/30">
                          Apply Now
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-amber-100 dark:border-amber-900 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="bg-amber-50 dark:bg-amber-900/40 pb-2">
                        <Badge className="mb-1 w-fit bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                          Popular
                        </Badge>
                        <CardTitle className="text-base text-amber-800 dark:text-amber-300">Kisan Credit Card</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Low-interest loans for farmers to purchase equipment
                        </p>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center">
                          <Calendar size={12} className="mr-1" /> Ongoing Scheme
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full mt-2 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/30">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                      View All Government Schemes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="telemedicine" className="space-y-4 animate-fade-in">
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-b border-red-100 dark:border-red-800">
                  <CardTitle className="text-red-800 dark:text-red-300 flex items-center">
                    <Stethoscope size={20} className="mr-2 text-red-500" /> Telemedicine Services
                  </CardTitle>
                  <CardDescription>
                    Check symptoms and connect with healthcare providers remotely.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-red-100 dark:border-red-900 shadow-sm">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4">Symptom Checker</h3>
                        
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="symptom" className="text-slate-600 dark:text-slate-300">Describe your symptoms</Label>
                            <Input 
                              id="symptom" 
                              placeholder="e.g. Fever, headache, cough..."
                              className="mt-1 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="duration" className="text-slate-600 dark:text-slate-300">Duration</Label>
                            <div className="grid grid-cols-3 gap-2 mt-1">
                              <Button variant="outline" size="sm" className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30">
                                1-2 days
                              </Button>
                              <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700">
                                3-7 days
                              </Button>
                              <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700">
                                >1 week
                              </Button>
                            </div>
                          </div>
                          
                          <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white mt-2">
                            Check Symptoms
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-red-100 dark:border-red-900 shadow-sm">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Upcoming Health Camps</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mr-3">
                              <Calendar size={16} className="text-red-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">General Health Checkup</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Aug 9, 2023 • Jaipur Community Center</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mr-3">
                              <Calendar size={16} className="text-red-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Eye Care Camp</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Aug 15, 2023 • Mobile Clinic</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mr-3">
                              <Calendar size={16} className="text-red-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Diabetes Screening</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Aug 22, 2023 • District Hospital</p>
                            </div>
                          </li>
                        </ul>
                        <Button variant="outline" className="w-full mt-3 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
                          View All Health Camps
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer className="border-t bg-slate-50 dark:bg-slate-900" />
    </div>
  );
};

export default Dashboard;
