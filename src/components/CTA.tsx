
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 z-0"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto glass rounded-3xl border border-white/20 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to transform your rural community?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of villages across India using RuralConnect to bridge the digital divide and access essential services.
              </p>
              
              <ul className="space-y-2 mb-8">
                {[
                  "Free for individual farmers and rural residents",
                  "Works in 8+ Indian languages",
                  "Accessible via basic phones and without internet",
                  "Regular updates with new features and services"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" className="gap-2 rounded-xl">
                Get Started Now <ArrowRight size={16} />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/10 rounded-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" 
                alt="Rural farmer using technology" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
