
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Send, StopCircle, Volume2, RefreshCw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { processUserQuery, translateResponse } from '@/utils/aiUtils';

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
    
    // Clean up any active speech recognition on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      // Also stop any ongoing speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
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
      // If already listening, stop first to reset
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = false;
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        const cleanTranscript = transcript.trim();
        console.log("Raw transcript:", cleanTranscript);
        setInput(prev => prev ? prev + ' ' + cleanTranscript : cleanTranscript);
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
      
      // Update toast message based on selected language
      let listeningMsg = "I'm listening. Speak clearly...";
      if (language === 'hi-IN') listeningMsg = "मैं सुन रहा हूँ। स्पष्ट रूप से बोलें...";
      else if (language === 'bn-IN') listeningMsg = "আমি শুনছি। স্পষ্টভাবে কথা বলুন...";
      
      toast({
        title: "Voice Input Active",
        description: listeningMsg,
      });
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
      toast({
        title: "Voice Input Stopped",
        description: "Voice recognition has been stopped.",
      });
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
    
    // If there was a recent response, translate it to the new language
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      const lastMessage = messages[messages.length - 1].content;
      translateResponse(lastMessage, value)
        .then(translatedText => {
          if (translatedText !== lastMessage) {
            const updatedMessages = [...messages];
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              content: translatedText
            };
            setMessages(updatedMessages);
          }
        })
        .catch(error => {
          console.error('Translation error:', error);
        });
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
    const languagePrefix = language.split('-')[0];
    const voice = voices.find(v => v.lang.startsWith(languagePrefix));
    
    if (voice) {
      utterance.voice = voice;
      console.log(`Using voice: ${voice.name} (${voice.lang})`);
    } else {
      console.log(`No voice found for ${language}, using default voice`);
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Process the user's query and get an appropriate response
      const responseContent = await processUserQuery(input.trim(), aiKey, language);
      
      // Add a small delay for better UX
      setTimeout(() => {
        const aiResponse: Message = { 
          role: 'assistant', 
          content: responseContent
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
        
        // Speak the response in the selected language
        speakText(aiResponse.content);
      }, 600);
      
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
    <Card className="border shadow-md overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white">
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
                className="rounded-full h-10 w-10 flex items-center justify-center"
              >
                <StopCircle className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant={micPermissionDenied ? "destructive" : "outline"}
                size="icon"
                onClick={startListening}
                className="rounded-full h-10 w-10 flex items-center justify-center"
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="default"
              size="icon"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="rounded-full h-10 w-10 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
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
