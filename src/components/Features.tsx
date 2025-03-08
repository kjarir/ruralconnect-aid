
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Cloud, FileText, Stethoscope } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
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
      className="glass p-6 rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300 h-full"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <MessageSquare size={24} />,
      title: "AI Chatbot for Rural Queries",
      description: "Multilingual AI assistant that understands voice and text in 8+ Indian languages, working even with slow internet connections.",
    },
    {
      icon: <Cloud size={24} />,
      title: "Weather & Crop Advisory",
      description: "Real-time weather updates with AI-driven crop recommendations based on local conditions and soil data.",
    },
    {
      icon: <FileText size={24} />,
      title: "Government Scheme Portal",
      description: "Easy access to relevant subsidies, loans, and benefits with eligibility checking and application guidance.",
    },
    {
      icon: <Stethoscope size={24} />,
      title: "Basic Telemedicine",
      description: "AI Symptom Checker with the option to connect with doctors via video call for remote healthcare access.",
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Rural Support</h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines cutting-edge AI with practical solutions for everyday rural challenges.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 * index}
            />
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-blue-100/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Features;
