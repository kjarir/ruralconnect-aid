
interface TopicResponse {
  [key: string]: string[];
}

// Define rural specific topics to answer about
const ruralTopics: TopicResponse = {
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
    "If you're experiencing fever, it's important to rest and stay hydrated. Consider taking paracetamol if your temperature is high, and consult with a doctor if symptoms persist for more than two days.",
    "For persistent fever, use the telemedicine service in the Healthcare tab to connect with a qualified doctor for proper diagnosis and treatment.",
    "Common symptoms like fever and headache could indicate seasonal flu. Stay hydrated and consider scheduling a telemedicine consultation.",
    "For maternal health services, the Janani Suraksha Yojana provides financial assistance and medical support for pregnant women.",
    "High fever with body aches may indicate viral infection. Rest, take fluids, and use antipyretics as needed. Consult a doctor if symptoms worsen."
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

/**
 * Process user query and return an appropriate response
 */
export const processUserQuery = async (query: string, apiKey: string): Promise<string> => {
  // In production, you would make an actual API call to an AI service
  // For now, we'll use a simple keyword-based approach
  
  const lowerQuery = query.toLowerCase();
  
  // Health-related keywords
  if (lowerQuery.includes("fever") || lowerQuery.includes("sick") || lowerQuery.includes("ill") || 
      lowerQuery.includes("pain") || lowerQuery.includes("headache") || lowerQuery.includes("cough")) {
    return ruralTopics.health[0]; // Always return the fever-specific response
  }
  
  // Agriculture-related keywords
  if (lowerQuery.includes("crop") || lowerQuery.includes("farm") || lowerQuery.includes("seed") || 
      lowerQuery.includes("plant") || lowerQuery.includes("pest") || lowerQuery.includes("soil")) {
    return ruralTopics.agriculture[Math.floor(Math.random() * ruralTopics.agriculture.length)];
  }
  
  // Finance-related keywords
  if (lowerQuery.includes("loan") || lowerQuery.includes("scheme") || lowerQuery.includes("money") || 
      lowerQuery.includes("finance") || lowerQuery.includes("bank") || lowerQuery.includes("fund")) {
    return ruralTopics.finance[Math.floor(Math.random() * ruralTopics.finance.length)];
  }
  
  // Market-related keywords
  if (lowerQuery.includes("price") || lowerQuery.includes("market") || lowerQuery.includes("sell") || 
      lowerQuery.includes("buy") || lowerQuery.includes("cost") || lowerQuery.includes("trade")) {
    return ruralTopics.market[Math.floor(Math.random() * ruralTopics.market.length)];
  }
  
  // Weather-related keywords
  if (lowerQuery.includes("weather") || lowerQuery.includes("rain") || lowerQuery.includes("temperature") || 
      lowerQuery.includes("forecast") || lowerQuery.includes("climate") || lowerQuery.includes("humid")) {
    return ruralTopics.weather[Math.floor(Math.random() * ruralTopics.weather.length)];
  }
  
  // Default responses for general queries
  const generalResponses = [
    "I can help you with information about agriculture, health, finance, weather, and market prices. What would you like to know more about?",
    "How can I assist you today? I can provide guidance on farming, healthcare, financial schemes, or local market information.",
    "I'm your RuralConnect AI assistant. You can ask me about crop management, health concerns, government schemes, or market prices.",
    "To better assist you, could you provide more details about what kind of information you're looking for? I can help with various rural topics."
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};
