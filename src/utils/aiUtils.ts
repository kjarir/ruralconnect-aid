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

// Health topics in multiple Indian languages
const healthTopicsMultilingual = {
  "en-IN": [
    "If you're experiencing fever, rest and stay hydrated. Take paracetamol for high temperature and consult a doctor if symptoms persist for more than two days.",
    "For persistent fever, use the telemedicine service to connect with a qualified doctor for proper diagnosis and treatment.",
    "Common symptoms like fever and headache could indicate seasonal flu. Stay hydrated and consider a telemedicine consultation.",
    "For maternal health services, the Janani Suraksha Yojana provides financial assistance and support for pregnant women.",
    "High fever with body aches may indicate viral infection. Rest, take fluids, and use fever reducers. Consult a doctor if symptoms worsen."
  ],
  "hi-IN": [
    "अगर आपको बुखार है, तो आराम करें और पर्याप्त पानी पियें। अधिक तापमान के लिए पैरासिटामोल लें और यदि लक्षण दो दिनों से अधिक समय तक बने रहते हैं तो डॉक्टर से परामर्श करें।",
    "लगातार बुखार के लिए, टेलीमेडिसिन सेवा का उपयोग करके सही निदान और उपचार के लिए एक योग्य डॉक्टर से जुड़ें।",
    "बुखार और सिरदर्द जैसे सामान्य लक्षण मौसमी फ्लू का संकेत हो सकते हैं। हाइड्रेटेड रहें और टेलीमेडिसिन परामर्श पर विचार करें।",
    "मातृ स्वास्थ्य सेवाओं के लिए, जननी सुरक्षा योजना गर्भवती महिलाओं के लिए वित्तीय सहायता और समर्थन प्रदान करती है।",
    "शरीर में दर्द के साथ तेज बुखार वायरल संक्रमण का संकेत हो सकता है। आराम करें, तरल पदार्थ लें, और बुखार कम करने वाली दवाएं लें। यदि लक्षण बिगड़ते हैं तो डॉक्टर से परामर्श करें।"
  ],
  "bn-IN": [
    "যদি আপনার জ্বর হয়, তাহলে বিশ্রাম নিন এবং হাইড্রেটেড থাকুন। উচ্চ তাপমাত্রার জন্য প্যারাসিটামল নিন এবং যদি উপসর্গগুলি দুই দিনের বেশি স্থায়ী হয় তবে একজন ডাক্তারের সাথে পরামর্শ করুন।",
    "অবিরাম জ্বরের জন্য, সঠিক রোগ নির্ণয় এবং চিকিত্সার জন্য একজন যোগ্য ডাক্তারের সাথে সংযোগ করতে টেলিমেডিসিন পরিষেবা ব্যবহার করুন।",
    "জ্বর এবং মাথাব্যথার মতো সাধারণ উপসর্গগুলি মৌসুমী ফ্লু নির্দেশ করতে পারে। হাইড্রেটেড থাকুন এবং টেলিমেডিসিন পরামর্শের কথা বিবেচনা করুন।",
    "মাতৃ স্বাস্থ্য পরিষেবাগুলির জন্য, জননী সুরক্ষা যোজনা গর্ভবতী মহিলাদের জন্য আর্থিক সহায়তা এবং সমর্থন প্রদান করে।",
    "শরীরের ব্যথার সাথে উচ্চ জ্বর ভাইরাল সংক্রমণের ইঙ্গিত দিতে পারে। বিশ্রাম নিন, তরল গ্রহণ করুন এবং জ্বর কমানোর ওষুধ ব্যবহার করুন। যদি উপসর্গগুলি খারাপ হয় তবে একজন ডাক্তারের সাথে পরামর্শ করুন।"
  ],
  "ta-IN": [
    "உங்களுக்கு காய்ச்சல் இருந்தால், ஓய்வெடுத்து நீரேற்றம் செய்யுங்கள். அதிக வெப்பநிலைக்கு பாராசிட்டமால் எடுத்துக்கொள்ளுங்கள் மற்றும் அறிகுறிகள் இரண்டு நாட்களுக்கு மேல் நீடித்தால் மருத்துவரை அணுகவும்.",
    "தொடர்ச்சியான காய்ச்சலுக்கு, சரியான நோயறிதல் மற்றும் சிகிச்சைக்காக தகுதிவாய்ந்த மருத்துவருடன் இணைய டெலிமெடிசின் சேவையைப் பயன்படுத்தவும்.",
    "காய்ச்சல் மற்றும் தலைவலி போன்ற பொதுவான அறிகுறிகள் பருவகால காய்ச்சலைக் குறிக்கலாம். நீரேற்றம் செய்து டெலிமெடிசின் ஆலோசனையை பரிசீலிக்கவும்.",
    "தாய் ஆரோக்கிய சேவைகளுக்கு, ஜனனி சுரக்ஷா யோஜனா கர்ப்பிணிப் பெண்களுக்கு நிதி உதவி மற்றும் ஆதரவு வழங்குகிறது.",
    "உடல் வலியுடன் கூடிய அதிக காய்ச்சல் வைரல் தொற்றைக் குறிக்கலாம். ஓய்வெடுத்து, திரவங்களை எடுத்து, காய்ச்சல் குறைப்பான்களைப் பயன்படுத்தவும். அறிகுறிகள் மோசமடைந்தால் மருத்துவரை அணுகவும்."
  ],
  "te-IN": [
    "మీకు జ్వరం వస్తే, విశ్రాంతి తీసుకొని హైడ్రేటెడ్‌గా ఉండండి. అధిక ఉష్ణోగ్రత కోసం పారాసిటమాల్ తీసుకోండి మరియు లక్షణాలు రెండు రోజులకు మించి కొనసాగితే వైద్యుడిని సంప్రదించండి.",
    "నిరంతర జ్వరం కోసం, సరైన నిర్ధారణ మరియు చికిత్స కోసం అర్హత గల వైద్యుడితో కనెక్ట్ చేయడానికి టెలిమెడిసిన్ సేవను ఉపయోగించండి.",
    "జ్వరం మరియు తలనొప్పి వంటి సాధారణ లక్షణాలు సీజనల్ ఫ్లూను సూచించవచ్చు. హైడ్రేటెడ్‌గా ఉండి టెలిమెడిసిన్ కన్సల్టేషన్‌ను పరిగణించండి.",
    "మాతృ ఆరోగ్య సేవల కోసం, గర్భిణీ స్త్రీలకు జననీ సురక్ష యోజన ఆర్థిక సహాయం మరియు మద్దతును అందిస్తుంది.",
    "శరీర నొప్పులతో కూడిన అధిక జ్వరం వైరల్ ఇన్ఫెక్షన్‌ను సూచించవచ్చు. విశ్రాంతి తీసుకోండి, ద్రవాలు తీసుకోండి మరియు జ్వర నివారణలను ఉపయోగించండి. లక్షణాలు మరింత దిగజారితే వైద్యుడిని సంప్రదించండి."
  ],
  "mr-IN": [
    "जर तुम्हाला ताप येत असेल, तर आराम करा आणि हायड्रेटेड रहा. जास्त तापमानासाठी पॅरासिटामॉल घ्या आणि लक्षणे दोन दिवसांपेक्षा जास्त काळ टिकल्यास डॉक्टरांचा सल्ला घ्या.",
    "सतत तापासाठी, योग्य निदान आणि उपचारासाठी योग्य डॉक्टरशी जोडण्यासाठी टेलीमेडिसिन सेवा वापरा.",
    "ताप आणि डोकेदुखी सारखी सामान्य लक्षणे हंगामी फ्लू दर्शवू शकतात. हायड्रेटेड रहा आणि टेलीमेडिसिन सल्ल्याचा विचार करा.",
    "मातृ आरोग्य सेवांसाठी, जननी सुरक्षा योजना गर्भवती महिलांना आर्थिक सहाय्य आणि समर्थन प्रदान करते.",
    "शरीराच्या वेदनांसह उच्च ताप व्हायरल संसर्ग दर्शवू शकतो. आराम करा, द्रव घ्या आणि ताप कमी करणारे औषध वापरा. लक्षणे खराब झाल्यास डॉक्टरांचा सल्ला घ्या."
  ],
  "gu-IN": [
    "જો તમને તાવ આવતો હોય, તો આરામ કરો અને હાઇડ્રેટેડ રહો. ઉચ્ચ તાપમાન માટે પેરાસિટામોલ લો અને જો લક્ષણો બે દિવસથી વધુ રહે તો ડૉક્ટરની સલાહ લો.",
    "સતત તાવ માટે, યોગ્ય નિદાન અને સારવાર માટે લાયક ડૉક્ટર સાથે જોડાવા માટે ટેલિમેડિસિન સેવાનો ઉપયોગ કરો.",
    "તાવ અને માથાનો દુખાવો જેવા સામાન્ય લક્ષણો સીઝનલ ફ્લૂનું સૂચન કરી શકે છે. હાઇડ્રેટેડ રહો અને ટેલિમેડિસિન કન્સલ્ટેશન પર વિચાર કરો.",
    "માતૃ આરોગ્ય સેવાઓ માટે, જનની સુરક્ષા યોજના સગર્ભા મહિલાઓને નાણાકીય સહાય અને સમર્થન પૂરું પાડે છે.",
    "શરીરના દુખાવા સાથે ઉચ્ચ તાવ વાયરલ ચેપનું સૂચન કરી શકે છે. આરામ કરો, પ્રવાહી લો અને તાવ ઘટાડનારનો ઉપયોગ કરો. જો લક્ષણો વધુ ખરાબ થાય તો ડૉક્ટરની સલાહ લો."
  ],
  "kn-IN": [
    "ನಿಮಗೆ ಜ್ವರ ಇದ್ದರೆ, ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ಹೈಡ್ರೇಟೆಡ್ ಆಗಿರಿ. ಹೆಚ್ಚಿನ ತಾಪಮಾನಕ್ಕೆ ಪ್ಯಾರಾಸಿಟಮಾಲ್ ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ರೋಗಲಕ್ಷಣಗಳು ಎರಡು ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಸಮಯ ಉಳಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    "ನಿರಂತರ ಜ್ವರಕ್ಕಾಗಿ, ಸರಿಯಾದ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ಅರ್ಹ ವೈದ್ಯರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಲು ಟೆಲಿಮೆಡಿಸಿನ್ ಸೇವೆಯನ್ನು ಬಳಸಿ.",
    "ಜ್ವರ ಮತ್ತು ತಲೆನೋವಿನಂತಹ ಸಾಮಾನ್ಯ ರೋಗಲಕ್ಷಣಗಳು ಋತುಮಾನದ ಫ್ಲೂವನ್ನು ಸೂಚಿಸಬಹುದು. ಹೈಡ್ರೇಟೆಡ್ ಆಗಿರಿ ಮತ್ತು ಟೆಲಿಮೆಡಿಸಿನ್ ಸಮಾಲೋಚನೆಯನ್ನು ಪರಿಗಣಿಸಿ.",
    "ಮಾತೃ ಆರೋಗ್ಯ ಸೇವೆಗಳಿಗೆ, ಜನನಿ ಸುರಕ್ಷಾ ಯೋಜನೆಯು ಗರ್ಭಿಣಿ ಮಹಿಳೆಯರಿಗೆ ಹಣಕಾಸು ನೆರವು ಮತ್ತು ಬೆಂಬಲವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    "ದೇಹದ ನೋವಿನೊಂದಿಗೆ ಹೆಚ್ಚಿನ ಜ್ವರವು ವೈರಲ್ ಸೋಂಕನ್ನು ಸೂಚಿಸಬಹುದು. ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ದ್ರವಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ಜ್ವರ ಕಡಿಮೆ ಮಾಡುವವರನ್ನು ಬಳಸಿ. ರೋಗಲಕ್ಷಣಗಳು ಕೆಟ್ಟದಾದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ."
  ],
  "ml-IN": [
    "നിങ്ങൾക്ക് പനി ഉണ്ടെങ്കിൽ, വിശ്രമിക്കുകയും ഹൈഡ്രേറ്റഡ് ആയിരിക്കുകയും ചെയ്യുക. ഉയർന്ന താപനിലയ്ക്ക് പാരസെറ്റമോൾ കഴിക്കുക, രണ്ട് ദിവസത്തിലധികം രോഗലക്ഷണങ്ങൾ നിലനിൽക്കുകയാണെങ്കിൽ ഒരു ഡോക്ടറെ സമീപിക്കുക.",
    "തുടർച്ചയായുള്ള പനിക്ക്, ശരിയായ രോഗനിർണ്ണയത്തിനും ചികിത്സയ്ക്കുമായി യോഗ്യതയുള്ള ഡോക്ടറുമായി ബന്ധപ്പെടാൻ ടെലിമെഡിസിൻ സേവനം ഉപയോഗിക്കുക.",
    "പനി, തലവേദന തുടങ്ങിയ സാധാരണ ലക്ഷണങ്ങൾ സീസണൽ ഫ്ലൂവിനെ സൂചിപ്പിക്കാം. ഹൈഡ്രേറ്റഡ് ആയിരിക്കുകയും ടെലിമെഡിസിൻ കൺസൾട്ടേഷൻ പരിഗണിക്കുകയും ചെയ്യുക.",
    "മാതൃ ആരോഗ്യ സേവനങ്ങൾക്കായി, ജനനി സുരക്ഷ യോജന ഗർഭിണികൾക്ക് സാമ്പത്തിക സഹായവും പിന്തുണയും നൽകുന്നു.",
    "ശരീരവേദനയോടുകൂടിയ ഉയർന്ന പനി വൈറൽ അണുബാധയെ സൂചിപ്പിക്കാം. വിശ്രമിക്കുക, ദ്രാവകങ്ങൾ കഴിക്കുക, പനി കുറയ്ക്കുന്നവ ഉപയോഗിക്കുക. രോഗലക്ഷണങ്ങൾ വഷളായാൽ ഡോക്ടറെ സമീപിക്കുക."
  ],
  "pa-IN": [
    "ਜੇ ਤੁਹਾਨੂੰ ਬੁਖਾਰ ਹੈ, ਤਾਂ ਆਰਾਮ ਕਰੋ ਅਤੇ ਹਾਈਡਰੇਟਿਡ ਰਹੋ। ਉੱਚ ਤਾਪਮਾਨ ਲਈ ਪੈਰਾਸੀਟਾਮੋਲ ਲਓ ਅਤੇ ਜੇ ਲੱਛਣ ਦੋ ਦਿਨਾਂ ਤੋਂ ਵੱਧ ਰਹਿੰਦੇ ਹਨ ਤਾਂ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ-ਮਸ਼ਵਰਾ ਕਰੋ।",
    "ਲਗਾਤਾਰ ਬੁਖਾਰ ਲਈ, ਸਹੀ ਨਿਦਾਨ ਅਤੇ ਇਲਾਜ ਲਈ ਯੋਗ ਡਾਕਟਰ ਨਾਲ ਜੁੜਨ ਲਈ ਟੈਲੀਮੈਡੀਸਨ ਸੇਵਾ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    "ਬੁਖਾਰ ਅਤੇ ਸਿਰ ਦਰਦ ਵਰਗੇ ਆਮ ਲੱਛਣ ਮੌਸਮੀ ਫਲੂ ਦਾ ਸੰਕੇਤ ਦੇ ਸਕਦੇ ਹਨ। ਹਾਈਡਰੇਟਿਡ ਰਹੋ ਅਤੇ ਟੈਲੀਮੈਡੀਸਨ ਸਲਾਹ-ਮਸ਼ਵਰੇ 'ਤੇ ਵਿਚਾਰ ਕਰੋ।",
    "ਮਾਂ ਦੇ ਸਿਹਤ ਸੇਵਾਵਾਂ ਲਈ, ਜਨਨੀ ਸੁਰੱਖਿਆ ਯੋਜਨਾ ਗਰਭਵਤੀ ਔਰਤਾਂ ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ ਅਤੇ ਸਮਰਥਨ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।",
    "ਸਰੀਰ ਦੇ ਦਰਦ ਦੇ ਨਾਲ ਉੱਚ ਬੁਖਾਰ ਵਾਇਰਲ ਇਨਫੈਕਸ਼ਨ ਦਾ ਸੰਕੇਤ ਦੇ ਸਕਦਾ ਹੈ। ਆਰਾਮ ਕਰੋ, ਤਰਲ ਪਦਾਰਥ ਲਓ, ਅਤੇ ਬੁਖਾਰ ਘਟਾਉਣ ਵਾਲੀਆਂ ਦਵਾਈਆਂ ਦੀ ਵਰਤੋਂ ਕਰੋ। ਜੇ ਲੱਛਣ ਵਿਗੜਦੇ ਹਨ ਤਾਂ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ-ਮਸ਼ਵਰਾ ਕਰੋ।"
  ],
  "or-IN": [
    "ଯଦି ଆପଣଙ୍କୁ ଜ୍ୱର ହେଉଛି, ତେବେ ବିଶ୍ରାମ ନିଅନ୍ତୁ ଏବଂ ହାଇଡ୍ରେଟେଡ୍ ରୁହନ୍ତୁ। ଅଧିକ ତାପମାତ୍ରା ପାଇଁ ପାରାସିଟାମଲ୍ ନିଅନ୍ତୁ ଏବଂ ଯଦି ଲକ୍ଷଣଗୁଡ଼ିକ ଦୁଇ ଦିନରୁ ଅଧିକ ସମୟ ପାଇଁ ଅବ୍ୟାହତ ରହେ ତେବେ ଡାକ୍ତରଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।",
    "ଲଗାତାର ଜ୍ୱର ପାଇଁ, ଉପଯୁକ୍ତ ନିଦାନ ଏବଂ ଚିକିତ୍ସା ପାଇଁ ଯୋଗ୍ୟ ଡାକ୍ତରଙ୍କ ସହିତ ସଂଯୋଗ କରିବାକୁ ଟେଲିମେଡିସିନ୍ ସେବା ବ୍ୟବହାର କରନ୍ତୁ।",
    "ଜ୍ୱର ଏବଂ ମୁଣ୍ଡବିନ୍ଧା ପରି ସାଧାରଣ ଲକ୍ଷଣଗୁଡ଼ିକ ଋତୁଗତ ଫ୍ଲୁ ସୂଚିତ କରିପାରେ। ହାଇଡ୍ରେଟେଡ୍ ରୁହନ୍ତୁ ଏବଂ ଟେଲିମେଡିସିନ୍ ପରାମର୍ଶ ବିଷୟରେ ବିଚାର କରନ୍ତୁ।",
    "ମାତୃ ସ୍ୱାସ୍ଥ୍ୟ ସେବା ପାଇଁ, ଜନନୀ ସୁରକ୍ଷା ଯୋଜନା ଗର୍ଭବତୀ ମହିଳାମାନଙ୍କୁ ଆର୍ଥିକ ସହାୟତା ଏବଂ ସମର୍ଥନ ପ୍ରଦାନ କରେ।",
    "ଶରୀର ଯନ୍ତ୍ରଣା ସହିତ ଅଧିକ ଜ୍ୱର ଭାଇରାଲ୍ ସଂକ୍ରମଣକୁ ସୂଚିତ କରିପାରେ। ବିଶ୍ରାମ ନିଅନ୍ତୁ, ତରଳ ପଦାର୍ଥ ନିଅନ୍ତୁ, ଏବଂ ଜ୍ୱର କମାଇବା ପାଇଁ ଔଷଧ ବ୍ୟବହାର କରନ୍ତୁ। ଯଦି ଲକ୍ଷଣଗୁଡ଼ିକ ଖରାପ ହୁଏ ତେବେ ଡାକ୍ତରଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।"
  ]
};

/**
 * Detects the language of the input text
 * This is a simple implementation - in a real app, you would use a language detection service
 */
const detectLanguage = (text: string): string => {
  // Basic language detection based on script patterns
  if (/[\u0900-\u097F]/.test(text)) return 'hi-IN'; // Hindi
  if (/[\u0980-\u09FF]/.test(text)) return 'bn-IN'; // Bengali
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN'; // Tamil
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN'; // Telugu
  if (/[\u0900-\u097F][\u0901-\u0903]/.test(text)) return 'mr-IN'; // Marathi
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN'; // Gujarati
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn-IN'; // Kannada
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN'; // Malayalam
  if (/[\u0A00-\u0A7F]/.test(text)) return 'pa-IN'; // Punjabi
  if (/[\u0B00-\u0B7F]/.test(text)) return 'or-IN'; // Odia
  
  return 'en-IN'; // Default to English
};

/**
 * Process user query and return an appropriate response
 */
export const processUserQuery = async (query: string, apiKey: string, language = 'en-IN'): Promise<string> => {
  // Detect language if not explicitly provided
  const detectedLanguage = detectLanguage(query);
  const responseLanguage = language !== 'en-IN' ? language : detectedLanguage;
  
  // Convert query to lowercase for keyword matching
  const lowerQuery = query.toLowerCase();
  
  // Health-related keywords in various languages 
  const healthKeywords = [
    // English
    'fever', 'sick', 'ill', 'pain', 'headache', 'cough', 'health', 'disease', 'doctor',
    // Hindi
    'बुखार', 'बीमार', 'दर्द', 'सिरदर्द', 'खांसी', 'स्वास्थ्य', 'रोग', 'डॉक्टर',
    // Bengali
    'জ্বর', 'অসুস্থ', 'ব্যথা', 'মাথাব্যথা', 'কাশি', 'স্বাস্থ্য', 'রোগ', 'ডাক্তার',
    // Tamil
    'காய்ச்சல்', 'உடல்நலம்', 'வலி', 'தலைவலி', 'இருமல்', 'மருத்துவர்',
    // Telugu
    'జ్వరం', 'అనారోగ్యం', 'నొప్పి', 'తలనొప్పి', 'దగ్గు', 'ఆరోగ్యం', 'వ్యాధి', 'వైద్యుడు',
    // Other languages...
  ];
  
  // Check if query contains health keywords
  if (healthKeywords.some(keyword => lowerQuery.includes(keyword))) {
    // Return health response in the detected language
    const healthResponses = healthTopicsMultilingual[responseLanguage as keyof typeof healthTopicsMultilingual] || 
                            healthTopicsMultilingual['en-IN'];
    return healthResponses[Math.floor(Math.random() * healthResponses.length)];
  }

  // For other topics, try to match with the original topics
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

// Function to translate responses (not implemented)
// In a real app, this would use a proper translation API
export const translateResponse = async (text: string, targetLanguage: string): Promise<string> => {
  // This is a stub function - in a real app, you would call a translation API
  // For now, if we have the language in our healthTopicsMultilingual, use that
  if (targetLanguage !== 'en-IN' && text.includes('fever') || text.includes('health')) {
    const healthResponses = healthTopicsMultilingual[targetLanguage as keyof typeof healthTopicsMultilingual];
    if (healthResponses) {
      return healthResponses[Math.floor(Math.random() * healthResponses.length)];
    }
  }
  
  // Return original text if translation is not available
  return text;
};
