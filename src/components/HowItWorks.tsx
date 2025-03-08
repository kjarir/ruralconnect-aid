
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Headphones, Languages, CloudSun } from 'lucide-react';

const StepCard = ({ 
  number, 
  icon, 
  title, 
  description, 
  delay 
}: { 
  number: number;
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-6"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
          {number}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary">{icon}</span>
          <h3 className="text-xl font-medium">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone size={20} />,
      title: "Access via Any Device",
      description: "Open the app on a smartphone, use SMS on basic phones, or call our toll-free number. No internet required for basic services.",
    },
    {
      icon: <Languages size={20} />,
      title: "Communicate Naturally",
      description: "Speak or type in your preferred language. Our AI understands Hindi, Tamil, Marathi, Bengali, Telugu, and more.",
    },
    {
      icon: <CloudSun size={20} />,
      title: "Get Personalized Insights",
      description: "Receive crop recommendations, weather alerts, healthcare guidance, and government scheme information tailored to your location and needs.",
    },
    {
      icon: <Headphones size={20} />,
      title: "Connect with Experts",
      description: "For complex queries, get connected with agriculture experts, healthcare professionals, or government scheme specialists as needed.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-secondary/50">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How RuralConnect Works</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Designed for simplicity and accessibility, our platform bridges the digital divide for rural communities.
            </p>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <StepCard
                  key={index}
                  number={index + 1}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  delay={0.2 * index}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:pl-6 relative"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-100/20 rounded-3xl transform rotate-2"></div>
              
              <div className="glass overflow-hidden rounded-2xl border border-white/20 shadow-xl relative z-10">
                <div className="relative pb-[190%]">
                  <div className="absolute inset-0 p-4">
                    {/* Phone frame */}
                    <div className="bg-gray-900 h-full w-full rounded-xl overflow-hidden flex flex-col">
                      {/* Status bar */}
                      <div className="bg-gray-800 h-6 w-full flex items-center justify-between px-4">
                        <div className="text-[10px] text-white">9:41</div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-white/70"></div>
                          <div className="w-2 h-2 rounded-full bg-white/70"></div>
                          <div className="w-2 h-2 rounded-full bg-white/70"></div>
                        </div>
                      </div>
                      
                      {/* App content */}
                      <div className="flex-1 bg-white p-3 flex flex-col">
                        <div className="bg-gray-50 rounded-lg p-2 mb-3">
                          <div className="text-xs text-center text-gray-500">Today</div>
                        </div>
                        
                        {/* Chat bubbles */}
                        <div className="flex-1 overflow-y-auto space-y-4">
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">AI</div>
                            <div className="bg-gray-100 rounded-lg rounded-tl-none p-2 text-xs max-w-[80%]">
                              नमस्ते! मैं आपकी किस प्रकार से सहायता कर सकता हूँ?
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2 flex-row-reverse">
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">आप</div>
                            <div className="bg-primary text-white rounded-lg rounded-tr-none p-2 text-xs max-w-[80%]">
                              मेरे क्षेत्र में धान की फसल के लिए उपयुक्त खाद क्या है?
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">AI</div>
                            <div className="bg-gray-100 rounded-lg rounded-tl-none p-2 text-xs max-w-[80%]">
                              आपके क्षेत्र में धान की फसल के लिए, यूरिया, DAP और पोटाश का मिश्रण सबसे उपयुक्त है। क्या आप अपनी मिट्टी की जांच करवा चुके हैं?
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">AI</div>
                            <div className="bg-blue-50 rounded-lg p-2 text-xs max-w-[80%]">
                              <div className="text-blue-500 font-medium mb-1">मौसम अपडेट</div>
                              <div className="flex justify-between items-center">
                                <div className="text-gray-700">33°C</div>
                                <div className="text-gray-500 text-[10px]">धूप</div>
                              </div>
                              <div className="text-gray-500 text-[10px]">आने वाले 3 दिनों में बारिश की संभावना: 65%</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Input area */}
                        <div className="mt-auto pt-2">
                          <div className="flex gap-2 items-center bg-gray-100 rounded-full px-3 py-1.5">
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            <div className="flex-1 h-4 bg-gray-200 rounded-full"></div>
                            <div className="w-4 h-4 rounded-full bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-1/4 -right-8 glass px-3 py-2 rounded-lg text-xs animate-float">
                <div className="font-medium">छत्तीसगढ़ सरकार योजना</div>
                <div className="text-green-500 font-bold mt-1">₹10,000 अनुदान उपलब्ध</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
