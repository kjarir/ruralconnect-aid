
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Cloud, MessageSquare, FileText, Stethoscope, ChevronLeft, User, Activity, Mic } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2" 
                onClick={() => navigate('/')}
              >
                <ChevronLeft size={16} className="mr-1" /> Back to Home
              </Button>
              <h1 className="text-3xl font-bold">Welcome to RuralConnect</h1>
              <p className="text-muted-foreground">Access all rural support services in one place</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <User size={14} /> Profile
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Activity size={14} /> Activity
                </Button>
              </div>
              <Button size="sm" className="gap-2">
                <Mic size={14} /> Voice Assistant
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="chatbot" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="chatbot" className="gap-2">
                <MessageSquare size={16} />
                <span className="hidden md:inline">AI Assistant</span>
              </TabsTrigger>
              <TabsTrigger value="weather" className="gap-2">
                <Cloud size={16} />
                <span className="hidden md:inline">Weather & Crops</span>
              </TabsTrigger>
              <TabsTrigger value="schemes" className="gap-2">
                <FileText size={16} />
                <span className="hidden md:inline">Govt. Schemes</span>
              </TabsTrigger>
              <TabsTrigger value="telemedicine" className="gap-2">
                <Stethoscope size={16} />
                <span className="hidden md:inline">Telemedicine</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chatbot" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>
                    Ask any questions about farming, weather, healthcare, or government schemes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-80 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      AI Assistant interface will appear here.<br />
                      Speak or type your questions in multiple languages.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weather" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weather & Crop Advisory</CardTitle>
                  <CardDescription>
                    Get real-time weather updates and crop recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-80 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Weather and crop advisory interface will appear here.<br />
                      View forecasts and get personalized recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schemes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Government Schemes</CardTitle>
                  <CardDescription>
                    Explore and apply for relevant subsidies, loans, and benefits.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-80 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Government scheme portal will appear here.<br />
                      Check eligibility and get guidance on applications.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="telemedicine" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Telemedicine Services</CardTitle>
                  <CardDescription>
                    Check symptoms and connect with healthcare providers remotely.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-80 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Telemedicine interface will appear here.<br />
                      Use AI symptom checker or connect with doctors.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer className="border-t bg-gray-50 dark:bg-gray-900" />
    </div>
  );
};

export default Dashboard;
