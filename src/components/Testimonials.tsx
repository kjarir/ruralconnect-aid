
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ 
  name, 
  role, 
  content, 
  rating,
  delay 
}: { 
  name: string; 
  role: string; 
  content: string; 
  rating: number;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass p-6 rounded-2xl border border-white/20 h-full flex flex-col"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
      <p className="text-muted-foreground flex-1 mb-4">{content}</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ramesh Patel",
      role: "Farmer, Gujarat",
      content: "The weather forecasts and crop suggestions have saved my paddy fields twice. The government scheme information helped me get a subsidy I didn't know I qualified for.",
      rating: 5
    },
    {
      name: "Lakshmi Devi",
      role: "Village Sarpanch, Andhra Pradesh",
      content: "Our entire village now uses RuralConnect to stay informed about government schemes. The voice feature is especially helpful for our elderly community members.",
      rating: 5
    },
    {
      name: "Suresh Kumar",
      role: "Small Business Owner, Rajasthan",
      content: "The business loan guidance helped me expand my dairy business. Being able to speak to the app in Hindi makes it accessible for everyone in my family.",
      rating: 4
    },
    {
      name: "Anita Singh",
      role: "Mother, Uttar Pradesh",
      content: "The telemedicine feature has been invaluable for my family. We could consult a doctor without traveling 30km to the nearest clinic when my son had a fever.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Rural Lives</h2>
          <p className="text-lg text-muted-foreground">
            Hear from people whose lives have been improved by having technological solutions adapted to rural needs.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              delay={0.2 * index}
            />
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-blue-100/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Testimonials;
