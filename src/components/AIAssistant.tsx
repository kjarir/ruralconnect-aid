
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Send, StopCircle, Volume2 } from 'lucide-react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();
  
  // AI key (in a real app, this should be stored securely on the backend)
  const aiKey = 'key_f51F8RIxKFyBM8Hi';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startListening = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setInput(prev => prev + ' ' + transcript.trim());
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      recognitionRef.current = null;
    };
    
    recognition.onend = () => {
      // Only set listening to false if we're not supposed to be listening anymore
      if (!isListening) {
        recognitionRef.current = null;
      } else if (recognitionRef.current) {
        // If we're still supposed to be listening, restart
        recognitionRef.current.start();
      }
    };
    
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
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
    
    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Simple AI response simulation (in a real app, this would call OpenAI or another AI service)
      const prompt = `User is asking about rural development and assistance: "${input.trim()}". Provide a helpful response about agriculture, government schemes, healthcare, or marketplace information for rural users.`;
      
      // In a real implementation, you would use the proper OpenAI API with the key
      // This is a simulated response for the demo
      setTimeout(() => {
        const ruralTopics = [
          "For agricultural guidance, I recommend checking the Farm Assist section where you can monitor crop health and get AI-driven advisory.",
          "The Government has several schemes for farmers including PM Kisan Samman Nidhi and Kisan Credit Card. Check the Finance tab for eligibility details.",
          "Our telemedicine service connects you with qualified doctors. You can book a video consultation or use the AI symptom checker.",
          "Current market prices for crops: Rice ₹2,100/q, Wheat ₹2,300/q, Maize ₹1,850/q. You can find more details in the Market tab.",
          "The weather conditions today suggest that it's ideal for rice transplanting. Monitor soil moisture as conditions may lead to rapid soil drying.",
        ];
        
        const aiResponse = { 
          role: 'assistant', 
          content: ruralTopics[Math.floor(Math.random() * ruralTopics.length)]
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
        <CardTitle className="text-xl">AI Assistant</CardTitle>
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
                variant="outline"
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
