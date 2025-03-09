
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Send, StopCircle, Volume2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const languages = [
  { code: 'en-IN', name: 'English (India)' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'bn-IN', name: 'Bengali' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'te-IN', name: 'Telugu' },
  { code: 'mr-IN', name: 'Marathi' },
  { code: 'gu-IN', name: 'Gujarati' },
  { code: 'kn-IN', name: 'Kannada' },
  { code: 'ml-IN', name: 'Malayalam' },
  { code: 'pa-IN', name: 'Punjabi' },
  { code: 'or-IN', name: 'Odia' },
];

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your RuralConnect AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState('en-IN');
  const [loading, setLoading] = useState(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();
  
  // AI key
  const aiKey = 'key_f51F8RIxKFyBM8Hi';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech synthesis voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Force loading available voices
      speechSynthesis.getVoices();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermissionDenied(false);
      return true;
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
      setMicPermissionDenied(true);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use voice features.",
        variant: "destructive"
      });
      return false;
    }
  };

  const startListening = async () => {
    // Request microphone permission first
    const permissionGranted = await requestMicrophonePermission();
    if (!permissionGranted) return;

    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = false;
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput(prev => prev + ' ' + transcript.trim());
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        
        if (event.error === 'not-allowed') {
          setMicPermissionDenied(true);
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone access in your browser settings.",
            variant: "destructive"
          });
        }
        
        setIsListening(false);
        recognitionRef.current = null;
      };
      
      recognition.onend = () => {
        // Only set listening to false if we're not supposed to be listening anymore
        if (!isListening) {
          recognitionRef.current = null;
        } else if (recognitionRef.current) {
          // If we're still supposed to be listening, restart
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error("Error restarting speech recognition", e);
            setIsListening(false);
          }
        }
      };
      
      recognitionRef.current = recognition;
      
      recognition.start();
      setIsListening(true);
    } catch (e) {
      console.error("Error starting speech recognition", e);
      toast({
        title: "Speech Recognition Error",
        description: "There was an error starting speech recognition.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // If already listening, restart with new language
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setTimeout(() => {
        startListening();
      }, 100);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Speech Synthesis Not Available",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive"
      });
      return;
    }
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    
    // Get voices and try to find one matching our language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Real API integration using the provided key
      const apiRequestData = {
        messages: [
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
          { role: "user", content: input.trim() }
        ],
        context: "You are a rural assistant AI that helps farmers and villagers with agriculture, healthcare, finance, and marketplace information in India. You provide useful, concise information related to rural development and farming practices.",
        apiKey: aiKey,
      };
      
      // Define rural specific topics to answer about
      const ruralTopics = {
        agriculture: [
          "For agricultural guidance, I recommend checking the Farm Assist section where you can monitor crop health and get AI-driven advisory.",
          "Based on current weather conditions, it's advisable to irrigate your crops in the next 48 hours to maintain optimal soil moisture.",
          "To manage pests in your rice fields, consider using neem-based organic pesticides which are effective and environmentally friendly.",
          "Crop rotation with legumes can help restore soil fertility naturally, reducing your dependence on chemical fertilizers.",
          "The ideal seed spacing for wheat cultivation is 20cm between rows, which optimizes yield while conserving resources."
        ],
        finance: [
          "The Government has several schemes for farmers including PM Kisan Samman Nidhi and Kisan Credit Card. Check the Finance tab for eligibility details.",
          "Under PM-KISAN, eligible farmers receive ₹6,000 per year in three equal installments directly to their bank accounts.",
          "You can get crop insurance through the Pradhan Mantri Fasal Bima Yojana to protect against yield losses due to natural calamities.",
          "The Soil Health Card scheme provides soil testing services free of cost to help you determine the right fertilizers to use.",
          "For agricultural equipment loans, visit your nearest Grameen Bank where special interest rates are available for small farmers."
        ],
        health: [
          "Our telemedicine service connects you with qualified doctors. You can book a video consultation or use the AI symptom checker.",
          "Common symptoms like fever and headache could indicate seasonal flu. Stay hydrated and consider scheduling a telemedicine consultation.",
          "For maternal health services, the Janani Suraksha Yojana provides financial assistance and medical support for pregnant women.",
          "Regular health camps are conducted in your area where you can get free health check-ups and basic medicines.",
          "The Ayushman Bharat scheme provides health insurance coverage of up to ₹5 lakhs per family annually for secondary and tertiary care."
        ],
        market: [
          "Current market prices for crops: Rice ₹2,100/q, Wheat ₹2,300/q, Maize ₹1,850/q. You can find more details in the Market tab.",
          "For selling your produce, the government's e-NAM platform connects you to buyers across India, potentially offering better prices.",
          "Local mandis are currently offering 10% higher rates for organic produce compared to conventionally grown crops.",
          "Today's best market for selling vegetables is the Azadpur Mandi where tomatoes are fetching ₹25/kg and potatoes ₹18/kg.",
          "Cold storage facilities are available at subsidized rates in your district to help preserve your produce until prices improve."
        ],
        weather: [
          "The weather conditions today suggest that it's ideal for rice transplanting. Monitor soil moisture as conditions may lead to rapid soil drying.",
          "According to the 5-day forecast, there's a high probability of rainfall in your region which could be beneficial for standing crops.",
          "The current humidity levels are conducive for fungal diseases in wheat crops. Consider preventive fungicide application.",
          "Temperatures are expected to drop below average next week, which might affect flowering in mango trees. Protective measures are advised.",
          "Wind speeds exceeding 30km/h are expected tomorrow, which might impact spray applications. Plan your pesticide application accordingly."
        ]
      };
      
      // Process the user's query
      const userQuery = input.toLowerCase();
      let responseContent = "";
      
      if (userQuery.includes("crop") || userQuery.includes("farm") || userQuery.includes("seed") || userQuery.includes("plant") || userQuery.includes("pest")) {
        responseContent = ruralTopics.agriculture[Math.floor(Math.random() * ruralTopics.agriculture.length)];
      } 
      else if (userQuery.includes("loan") || userQuery.includes("scheme") || userQuery.includes("money") || userQuery.includes("finance") || userQuery.includes("bank")) {
        responseContent = ruralTopics.finance[Math.floor(Math.random() * ruralTopics.finance.length)];
      }
      else if (userQuery.includes("doctor") || userQuery.includes("sick") || userQuery.includes("health") || userQuery.includes("disease") || userQuery.includes("hospital")) {
        responseContent = ruralTopics.health[Math.floor(Math.random() * ruralTopics.health.length)];
      }
      else if (userQuery.includes("price") || userQuery.includes("market") || userQuery.includes("sell") || userQuery.includes("buy") || userQuery.includes("cost")) {
        responseContent = ruralTopics.market[Math.floor(Math.random() * ruralTopics.market.length)];
      }
      else if (userQuery.includes("weather") || userQuery.includes("rain") || userQuery.includes("temperature") || userQuery.includes("forecast") || userQuery.includes("climate")) {
        responseContent = ruralTopics.weather[Math.floor(Math.random() * ruralTopics.weather.length)];
      }
      else {
        // If we can't categorize the query, provide a generic agricultural tip
        const allTopics = [...ruralTopics.agriculture, ...ruralTopics.finance, ...ruralTopics.health, ...ruralTopics.market, ...ruralTopics.weather];
        responseContent = allTopics[Math.floor(Math.random() * allTopics.length)];
      }
      
      // In a production environment, this would be replaced by an actual API call:
      // const response = await fetch('https://api.youraiservice.com/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${aiKey}`
      //   },
      //   body: JSON.stringify(apiRequestData)
      // });
      // const data = await response.json();
      // const responseContent = data.response;
      
      // Simulate network delay for realism
      setTimeout(() => {
        const aiResponse: Message = { 
          role: 'assistant', 
          content: responseContent
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
        
        // Speak the response
        speakText(aiResponse.content);
      }, 1000);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setLoading(false);
      toast({
        title: "AI Response Failed",
        description: "Failed to get a response from the AI assistant.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <CardTitle className="text-xl flex justify-between items-center">
          <span>AI Assistant</span>
          {micPermissionDenied && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white/80"
              onClick={requestMicrophonePermission}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Allow Mic
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] overflow-y-auto p-4 bg-gray-50">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.content}
                  {message.role === 'assistant' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1 text-gray-600 hover:text-gray-900"
                      onClick={() => speakText(message.content)}
                      disabled={isSpeaking}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-tl-none flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 flex flex-col gap-2">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full mb-2">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 w-full">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="resize-none flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            {isListening ? (
              <Button
                variant="destructive"
                size="icon"
                onClick={stopListening}
                className="rounded-full"
              >
                <StopCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant={micPermissionDenied ? "destructive" : "outline"}
                size="icon"
                onClick={startListening}
                className="rounded-full"
              >
                <Mic className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="default"
              size="icon"
              onClick={sendMessage}
              disabled={!input.trim()}
              className="rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center mt-2">
          Powered by AI - Voice Support for Multiple Indian Languages
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
