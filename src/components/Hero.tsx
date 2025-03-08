
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight, Mic, Sparkles, Leaf } from 'lucide-react';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;
      
      parallaxRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background elements */}
      <div className="parallax-bg"></div>
      
      {/* Floating elements */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-green-100/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-100/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                <Sparkles size={16} className="mr-1" />
                AI-Powered Rural Assistant
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empowering Rural Communities with Technology
            </motion.h1>
            
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Access agriculture insights, healthcare guidance, and government schemes through an AI assistant designed for rural India.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="gap-2 px-6 py-6 text-md rounded-xl btn-hover-effect"
              >
                Try Now <ChevronRight size={18} />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 px-6 py-6 text-md rounded-xl"
              >
                <Mic size={18} /> Voice Assistant
              </Button>
            </motion.div>
            
            <motion.div
              className="mt-12 flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Leaf size={16} className="text-primary" />
              <span>Supports 8+ Indian languages and works offline</span>
            </motion.div>
          </div>
          
          {/* Image/Illustration */}
          <motion.div 
            className="lg:block relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-blue-100/30 rounded-2xl transform rotate-1"></div>
              <div className="glass rounded-2xl p-4 border border-white/20 relative z-10">
                <div className="rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="h-10 bg-gray-50 border-b flex items-center px-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">AI</div>
                        <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 text-sm">
                          Hello! How can I help with your farming today?
                        </div>
                      </div>
                      <div className="flex gap-2 items-start flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">You</div>
                        <div className="bg-primary/10 text-primary/90 rounded-xl rounded-tr-none p-3 text-sm">
                          When should I irrigate my rice field? It hasn't rained for a week.
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">AI</div>
                        <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 text-sm">
                          Based on the current soil moisture data for your area, I recommend irrigating your rice field by tomorrow morning. Rice needs consistent moisture, especially during this growth stage. Would you like me to send a reminder?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground">Temperature</div>
                    <div className="font-medium mt-1">32°C</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground">Humidity</div>
                    <div className="font-medium mt-1">65%</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground">Rain Chance</div>
                    <div className="font-medium mt-1">10%</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white animate-float">
              <Leaf size={20} />
            </div>
            <div className="absolute bottom-12 -left-6 glass p-2 rounded-lg animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="text-xs font-medium">Soil Moisture</div>
              <div className="text-lg font-bold">42%</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
