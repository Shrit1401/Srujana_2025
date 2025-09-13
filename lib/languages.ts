export const languages = {
  en: {
    name: "English",
    code: "en",
  },
  hi: {
    name: "Hindi",
    code: "hi",
  },
  mr: {
    name: "Marathi",
    code: "mr",
  },
  ta: {
    name: "Tamil",
    code: "ta",
  },
  te: {
    name: "Telugu",
    code: "te",
  },
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    brand: "Vidyapak.",
    forEducators: "For Educators",
    mainHeading: "Help Your Students Engage 3x More Efficiently",
    tryNow: "Try out now",
    madeFor: "Made for Srujana Hackathon",
    language: "Language",
    loading: "Loading...",
    welcome: "Welcome",
    welcomeTo: "Welcome to",
    heresWhat: "Here's what you can do today:",
    signInToAccess: "Sign in to access your dashboard:",
    signInWithGoogle: "Sign in with Google",
    signIn: "Sign In",
    signOut: "Sign Out",
    classSparks: "Class Sparks",
    sparksCuriosity: "sparks curiosity in class",
    photoToLesson: "Photo to Lesson Kit",
    transformPhotos: "Transform photos into lesson plans",
    weeklyPlanner: "Weekly Planner",
    generateSchedules: "Generate weekly schedules",
    aiEasySlides: "AI Easy Slides",
    createPresentations: "Create presentations with ease using AI",
    makeClassMoreClasssy: "Make Your Class More Classsy",
    initialGreeting:
      "Hello! I'm your AI teaching assistant. How can I help spark curiosity in your classroom today?",
    personalizedGreeting:
      "Hello {name}! I'm your AI teaching assistant. How can I help spark curiosity in your classroom today?",
    askMeAnything:
      "Ask me anything about teaching, lesson plans, or classroom activities...",
    yourMessageTooLong:
      "Your message is too long. Please keep it under 2000 characters for better processing.",
    pleaseWait: "Please wait a moment before sending another message.",
    sorryTrouble:
      "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
    networkIssue:
      "Network connection issue. Please check your internet connection and try again.",
    requestTimeout:
      "Request timed out. Please try again with a shorter message.",
    serverNotResponding:
      "Server is not responding. Please try again in a moment.",
    clickPhotoTextbook: "Click a photo of a textbook page to get started.",
    clickUploadPhoto: "Click to upload a photo or drag and drop",
    supportsFormats: "Supports JPG, PNG, and other image formats",
    changePhoto: "Change Photo",
    takePhoto: "Take a Photo",
    configureLessonKit: "Configure your lesson kit",
    selectActivities: "Select the types of activities you want to generate.",
    worksheet: "Worksheet",
    drawingActivity: "Drawing Activity",
    notes: "Notes",
    generateLessonKit: "Generate Lesson Kit",
    autoPlanWeek: "Auto-Plan My Week",
    generateWeeklyPlan:
      "Generate a weekly teaching plan from your syllabus or key topics.",
    textbookSyllabus: "Textbook Syllabus or Key Topics",
    enterSyllabusContent:
      "Enter the syllabus content or a list of topics for the week.",
    syllabusPlaceholder:
      "e.g., Chapter 1: The Solar System, Chapter 2: Living Organisms, ...",
    numberOfTeachingDays: "Number of Teaching Days",
    howManyDays: "How many days will you be teaching this week?",
    teachingDaysPlaceholder: "e.g., 5",
    holidays: "Holidays (Optional)",
    specifyHolidays: "Specify any holidays this week.",
    holidaysPlaceholder: "e.g., Wednesday",
    generatePlan: "Generate Plan",
  },
  hi: {
    brand: "विद्यापाक।",
    forEducators: "शिक्षकों के लिए",
    mainHeading: "अपने छात्रों को 3 गुना अधिक कुशलता से जोड़ने में मदद करें",
    tryNow: "अभी आज़माएं",
    madeFor: "श्रुजना हैकाथॉन के लिए बनाया गया",
    language: "भाषा",
    loading: "लोड हो रहा है...",
    welcome: "स्वागत है",
    welcomeTo: "में आपका स्वागत है",
    heresWhat: "आज आप यह कर सकते हैं:",
    signInToAccess: "अपने डैशबोर्ड तक पहुंचने के लिए साइन इन करें:",
    signInWithGoogle: "Google के साथ साइन इन करें",
    signIn: "साइन इन करें",
    signOut: "साइन आउट करें",
    classSparks: "कक्षा स्पार्क्स",
    sparksCuriosity: "कक्षा में जिज्ञासा जगाता है",
    photoToLesson: "फोटो-टू-लेसन किट",
    transformPhotos: "फोटो को पाठ योजनाओं में बदलें",
    weeklyPlanner: "साप्ताहिक योजनाकार",
    generateSchedules: "साप्ताहिक कार्यक्रम बनाएं",
    aiEasySlides: "AI आसान स्लाइड्स",
    createPresentations: "AI का उपयोग करके आसानी से प्रस्तुतियां बनाएं",
    makeClassMoreClasssy: "अपनी कक्षा को और भी बेहतर बनाएं",
    initialGreeting:
      "नमस्ते! मैं आपका AI शिक्षण सहायक हूं। आज मैं आपकी कक्षा में जिज्ञासा जगाने में कैसे मदद कर सकता हूं?",
    personalizedGreeting:
      "नमस्ते {name}! मैं आपका AI शिक्षण सहायक हूं। आज मैं आपकी कक्षा में जिज्ञासा जगाने में कैसे मदद कर सकता हूं?",
    askMeAnything:
      "शिक्षण, पाठ योजनाओं या कक्षा गतिविधियों के बारे में कुछ भी पूछें...",
    yourMessageTooLong:
      "आपका संदेश बहुत लंबा है। बेहतर प्रसंस्करण के लिए कृपया इसे 2000 वर्णों से कम रखें।",
    pleaseWait: "कृपया दूसरा संदेश भेजने से पहले एक क्षण प्रतीक्षा करें।",
    sorryTrouble:
      "मुझे खेद है, मुझे आपके अनुरोध को संसाधित करने में अभी परेशानी हो रही है। कृपया एक क्षण बाद फिर से कोशिश करें।",
    networkIssue:
      "नेटवर्क कनेक्शन समस्या। कृपया अपना इंटरनेट कनेक्शन जांचें और फिर से कोशिश करें।",
    requestTimeout:
      "अनुरोध समय सीमा समाप्त। कृपया छोटे संदेश के साथ फिर से कोशिश करें।",
    serverNotResponding:
      "सर्वर जवाब नहीं दे रहा। कृपया एक क्षण बाद फिर से कोशिश करें।",
    clickPhotoTextbook: "शुरू करने के लिए पाठ्यपुस्तक पृष्ठ की फोटो लें।",
    clickUploadPhoto: "फोटो अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें",
    supportsFormats: "JPG, PNG और अन्य छवि प्रारूपों का समर्थन करता है",
    changePhoto: "फोटो बदलें",
    takePhoto: "फोटो लें",
    configureLessonKit: "अपनी पाठ किट कॉन्फ़िगर करें",
    selectActivities:
      "उन गतिविधियों के प्रकारों का चयन करें जिन्हें आप उत्पन्न करना चाहते हैं।",
    worksheet: "कार्यपत्रक",
    drawingActivity: "चित्रकला गतिविधि",
    notes: "नोट्स",
    generateLessonKit: "पाठ किट उत्पन्न करें",
    autoPlanWeek: "मेरे सप्ताह की स्वचालित योजना",
    generateWeeklyPlan:
      "अपने पाठ्यक्रम या मुख्य विषयों से साप्ताहिक शिक्षण योजना बनाएं।",
    textbookSyllabus: "पाठ्यपुस्तक पाठ्यक्रम या मुख्य विषय",
    enterSyllabusContent:
      "सप्ताह के लिए पाठ्यक्रम सामग्री या विषयों की सूची दर्ज करें।",
    syllabusPlaceholder: "जैसे, अध्याय 1: सौर मंडल, अध्याय 2: जीवित जीव, ...",
    numberOfTeachingDays: "शिक्षण दिवसों की संख्या",
    howManyDays: "इस सप्ताह आप कितने दिन पढ़ाएंगे?",
    teachingDaysPlaceholder: "जैसे, 5",
    holidays: "छुट्टियां (वैकल्पिक)",
    specifyHolidays: "इस सप्ताह की कोई छुट्टियां निर्दिष्ट करें।",
    holidaysPlaceholder: "जैसे, बुधवार",
    generatePlan: "योजना बनाएं",
  },
  mr: {
    brand: "विद्यापाक।",
    forEducators: "शिक्षकांसाठी",
    mainHeading:
      "तुमच्या विद्यार्थ्यांना 3 पट अधिक कार्यक्षमतेने जोडण्यात मदत करा",
    tryNow: "आता वापरून पहा",
    madeFor: "श्रुजना हॅकाथॉनसाठी बनवले",
    language: "भाषा",
    loading: "लोड होत आहे...",
    welcome: "स्वागत आहे",
    welcomeTo: "मध्ये आपले स्वागत आहे",
    heresWhat: "आज तुम्ही हे करू शकता:",
    signInToAccess: "तुमच्या डॅशबोर्डमध्ये प्रवेश करण्यासाठी साइन इन करा:",
    signInWithGoogle: "Google सह साइन इन करा",
    signIn: "साइन इन करा",
    signOut: "साइन आउट करा",
    classSparks: "वर्ग स्पार्क्स",
    sparksCuriosity: "वर्गात जिज्ञासा निर्माण करतो",
    photoToLesson: "फोटो-टू-लेसन किट",
    transformPhotos: "फोटोंना धडा योजनांमध्ये रूपांतरित करा",
    weeklyPlanner: "साप्ताहिक योजनाकार",
    generateSchedules: "साप्ताहिक वेळापत्रक तयार करा",
    aiEasySlides: "AI सोपे स्लाइड्स",
    createPresentations: "AI वापरून सहजतेने प्रेझेंटेशन तयार करा",
    makeClassMoreClasssy: "तुमच्या वर्गाला आणखी चांगले बनवा",
    initialGreeting:
      "नमस्कार! मी तुमचा AI शिक्षण सहायक आहे. आज मी तुमच्या वर्गात जिज्ञासा निर्माण करण्यात कशी मदत करू शकतो?",
    personalizedGreeting:
      "नमस्कार {name}! मी तुमचा AI शिक्षण सहायक आहे. आज मी तुमच्या वर्गात जिज्ञासा निर्माण करण्यात कशी मदत करू शकतो?",
    askMeAnything:
      "शिक्षण, धडा योजना किंवा वर्गातील क्रियाकलापांबद्दल काहीही विचारा...",
    yourMessageTooLong:
      "तुमचा संदेश खूप लांब आहे. चांगल्या प्रक्रियेसाठी कृपया 2000 वर्णांपेक्षा कमी ठेवा.",
    pleaseWait: "कृपया दुसरा संदेश पाठवण्यापूर्वी थोडा वेळ थांबा.",
    sorryTrouble:
      "माफ करा, मला तुमचा विनंती प्रक्रिया करण्यात अडचण येत आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.",
    networkIssue:
      "नेटवर्क कनेक्शन समस्या. कृपया तुमचे इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.",
    requestTimeout:
      "विनंतीची वेळ संपली. कृपया लहान संदेशासह पुन्हा प्रयत्न करा.",
    serverNotResponding:
      "सर्व्हर प्रतिसाद देत नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.",
    clickPhotoTextbook: "सुरुवात करण्यासाठी पाठ्यपुस्तक पृष्ठाचे फोटो काढा.",
    clickUploadPhoto:
      "फोटो अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग आणि ड्रॉप करा",
    supportsFormats: "JPG, PNG आणि इतर प्रतिमा स्वरूपांचे समर्थन करते",
    changePhoto: "फोटो बदला",
    takePhoto: "फोटो काढा",
    configureLessonKit: "तुमची धडा किट कॉन्फिगर करा",
    selectActivities:
      "तुम्ही तयार करू इच्छित असलेल्या क्रियाकलापांचे प्रकार निवडा.",
    worksheet: "कार्यपत्रक",
    drawingActivity: "चित्रकला क्रियाकलाप",
    notes: "नोट्स",
    generateLessonKit: "धडा किट तयार करा",
    autoPlanWeek: "माझ्या आठवड्याची स्वयंचलित योजना",
    generateWeeklyPlan:
      "तुमच्या अभ्यासक्रम किंवा मुख्य विषयांवरून साप्ताहिक शिक्षण योजना तयार करा.",
    textbookSyllabus: "पाठ्यपुस्तक अभ्यासक्रम किंवा मुख्य विषय",
    enterSyllabusContent:
      "आठवड्यासाठी अभ्यासक्रम सामग्री किंवा विषयांची यादी प्रविष्ट करा.",
    syllabusPlaceholder: "उदा., अध्याय 1: सौर मंडळ, अध्याय 2: सजीव प्राणी, ...",
    numberOfTeachingDays: "शिक्षण दिवसांची संख्या",
    howManyDays: "या आठवड्यात तुम्ही किती दिवस शिकवाल?",
    teachingDaysPlaceholder: "उदा., 5",
    holidays: "सुट्ट्या (पर्यायी)",
    specifyHolidays: "या आठवड्यातील कोणत्याही सुट्ट्या निर्दिष्ट करा.",
    holidaysPlaceholder: "उदा., बुधवार",
    generatePlan: "योजना तयार करा",
  },
  ta: {
    brand: "வித்யாபாக்।",
    forEducators: "கல்வியாளர்களுக்கு",
    mainHeading:
      "உங்கள் மாணவர்களை 3 மடங்கு அதிக திறமையுடன் ஈடுபடுத்த உதவுங்கள்",
    tryNow: "இப்போது முயற்சிக்கவும்",
    madeFor: "ஸ்ருஜனா ஹேக்காத்தானுக்காக உருவாக்கப்பட்டது",
    language: "மொழி",
    loading: "ஏற்றுகிறது...",
    welcome: "வரவேற்கிறோம்",
    welcomeTo: "இல் வரவேற்கிறோம்",
    heresWhat: "இன்று நீங்கள் இதை செய்யலாம்:",
    signInToAccess: "உங்கள் டாஷ்போர்டை அணுக உள்நுழையவும்:",
    signInWithGoogle: "Google உடன் உள்நுழையவும்",
    signIn: "உள்நுழையவும்",
    signOut: "வெளியேறவும்",
    classSparks: "வகுப்பு ஸ்பார்க்ஸ்",
    sparksCuriosity: "வகுப்பில் ஆர்வத்தைத் தூண்டுகிறது",
    photoToLesson: "புகைப்படம்-டு-பாடம் கிட்",
    transformPhotos: "புகைப்படங்களை பாடத் திட்டங்களாக மாற்றவும்",
    weeklyPlanner: "வாராந்திர திட்டமிடுபவர்",
    generateSchedules: "வாராந்திர அட்டவணைகளை உருவாக்கவும்",
    aiEasySlides: "AI எளிதான ஸ்லைடுகள்",
    createPresentations:
      "AI ஐப் பயன்படுத்தி எளிதாக விளக்கக்காட்சிகளை உருவாக்கவும்",
    makeClassMoreClasssy: "உங்கள் வகுப்பை மேலும் சிறப்பாக்குங்கள்",
    initialGreeting:
      "வணக்கம்! நான் உங்கள் AI கற்பித்தல் உதவியாளர். இன்று உங்கள் வகுப்பில் ஆர்வத்தைத் தூண்டுவதில் நான் எவ்வாறு உதவ முடியும்?",
    personalizedGreeting:
      "வணக்கம் {name}! நான் உங்கள் AI கற்பித்தல் உதவியாளர். இன்று உங்கள் வகுப்பில் ஆர்வத்தைத் தூண்டுவதில் நான் எவ்வாறு உதவ முடியும்?",
    askMeAnything:
      "கற்பித்தல், பாடத் திட்டங்கள் அல்லது வகுப்பறை செயல்பாடுகள் பற்றி எதையும் கேளுங்கள்...",
    yourMessageTooLong:
      "உங்கள் செய்தி மிக நீளமானது. சிறந்த செயலாக்கத்திற்கு 2000 எழுத்துகளுக்கு குறைவாக வைக்கவும்.",
    pleaseWait:
      "மற்றொரு செய்தியை அனுப்புவதற்கு முன் சிறிது நேரம் காத்திருக்கவும்.",
    sorryTrouble:
      "மன்னிக்கவும், உங்கள் கோரிக்கையை செயலாக்குவதில் சிக்கல் உள்ளது. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.",
    networkIssue:
      "நெட்வொர்க் இணைப்பு சிக்கல். உங்கள் இணைய இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
    requestTimeout:
      "கோரிக்கை நேரம் முடிந்தது. குறுகிய செய்தியுடன் மீண்டும் முயற்சிக்கவும்.",
    serverNotResponding:
      "சர்வர் பதிலளிக்கவில்லை. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.",
    clickPhotoTextbook: "தொடங்க பாடநூல் பக்கத்தின் புகைப்படம் எடுக்கவும்.",
    clickUploadPhoto:
      "புகைப்படத்தை பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்",
    supportsFormats: "JPG, PNG மற்றும் பிற பட வடிவங்களை ஆதரிக்கிறது",
    changePhoto: "புகைப்படத்தை மாற்றவும்",
    takePhoto: "புகைப்படம் எடுக்கவும்",
    configureLessonKit: "உங்கள் பாடம் கிட் ஐ கட்டமைக்கவும்",
    selectActivities:
      "நீங்கள் உருவாக்க விரும்பும் செயல்பாடுகளின் வகைகளைத் தேர்ந்தெடுக்கவும்.",
    worksheet: "வேலைத்தாள்",
    drawingActivity: "வரைதல் செயல்பாடு",
    notes: "குறிப்புகள்",
    generateLessonKit: "பாடம் கிட் உருவாக்கவும்",
    autoPlanWeek: "எனது வாரத்தின் தானியங்கி திட்டம்",
    generateWeeklyPlan:
      "உங்கள் பாடத்திட்டம் அல்லது முக்கிய தலைப்புகளிலிருந்து வாராந்திர கற்பித்தல் திட்டத்தை உருவாக்கவும்.",
    textbookSyllabus: "பாடநூல் பாடத்திட்டம் அல்லது முக்கிய தலைப்புகள்",
    enterSyllabusContent:
      "வாரத்திற்கான பாடத்திட்ட உள்ளடக்கம் அல்லது தலைப்புகளின் பட்டியலை உள்ளிடவும்.",
    syllabusPlaceholder:
      "எ.கா., அத்தியாயம் 1: சூரிய குடும்பம், அத்தியாயம் 2: உயிரினங்கள், ...",
    numberOfTeachingDays: "கற்பித்தல் நாட்களின் எண்ணிக்கை",
    howManyDays: "இந்த வாரத்தில் எத்தனை நாட்கள் நீங்கள் கற்பிப்பீர்கள்?",
    teachingDaysPlaceholder: "எ.கா., 5",
    holidays: "விடுமுறைகள் (விருப்பமானது)",
    specifyHolidays: "இந்த வாரத்தின் எந்த விடுமுறைகளையும் குறிப்பிடவும்.",
    holidaysPlaceholder: "எ.கா., புதன்கிழமை",
    generatePlan: "திட்டத்தை உருவாக்கவும்",
  },
  te: {
    brand: "విద్యాపాక్।",
    forEducators: "విద్యావేత్తల కోసం",
    mainHeading:
      "మీ విద్యార్థులను 3 రెట్లు ఎక్కువ సమర్థతతో నిమగ్నం చేయడంలో సహాయపడండి",
    tryNow: "ఇప్పుడు ప్రయత్నించండి",
    madeFor: "శ్రుజన హ్యాకథాన్ కోసం తయారు చేయబడింది",
    language: "భాష",
    loading: "లోడ్ అవుతోంది...",
    welcome: "స్వాగతం",
    welcomeTo: "కు స్వాగతం",
    heresWhat: "ఈరోజు మీరు ఇది చేయవచ్చు:",
    signInToAccess: "మీ డాష్‌బోర్డ్‌ను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి:",
    signInWithGoogle: "Googleతో సైన్ ఇన్ చేయండి",
    signIn: "సైన్ ఇన్ చేయండి",
    signOut: "సైన్ అవుట్ చేయండి",
    classSparks: "క్లాస్ స్పార్క్స్",
    sparksCuriosity: "తరగతిలో ఆసక్తిని రేకెత్తిస్తుంది",
    photoToLesson: "ఫోటో-టు-లెసన్ కిట్",
    transformPhotos: "ఫోటోలను పాఠ ప్రణాళికలుగా మార్చండి",
    weeklyPlanner: "వారపు ప్లానర్",
    generateSchedules: "వారపు షెడ్యూల్‌లను సృష్టించండి",
    aiEasySlides: "AI సులభ స్లైడ్‌లు",
    createPresentations: "AIని ఉపయోగించి సులభంగా ప్రజంటేషన్‌లను సృష్టించండి",
    makeClassMoreClasssy: "మీ తరగతిని మరింత మెరుగ్గా చేయండి",
    initialGreeting:
      "హలో! నేను మీ AI బోధన సహాయకుడిని. ఈరోజు మీ తరగతిలో ఆసక్తిని రేకెత్తించడంలో నేను ఎలా సహాయపడగలను?",
    personalizedGreeting:
      "హలో {name}! నేను మీ AI బోధన సహాయకుడిని. ఈరోజు మీ తరగతిలో ఆసక్తిని రేకెత్తించడంలో నేను ఎలా సహాయపడగలను?",
    askMeAnything:
      "బోధన, పాఠ ప్రణాళికలు లేదా తరగతి కార్యకలాపాల గురించి ఏదైనా అడగండి...",
    yourMessageTooLong:
      "మీ సందేశం చాలా పొడవుగా ఉంది. మెరుగైన ప్రాసెసింగ్ కోసం దయచేసి 2000 అక్షరాల కంటే తక్కువగా ఉంచండి.",
    pleaseWait: "మరొక సందేశాన్ని పంపేముందు కొంచెం వేచి ఉండండి.",
    sorryTrouble:
      "క్షమించండి, మీ అభ్యర్థనను ప్రాసెస్ చేయడంలో నాకు ఇబ్బంది ఉంది. కొంచెం తర్వాత మళ్లీ ప్రయత్నించండి.",
    networkIssue:
      "నెట్‌వర్క్ కనెక్షన్ సమస్య. దయచేసి మీ ఇంటర్నెట్ కనెక్షన్‌ను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
    requestTimeout:
      "అభ్యర్థన సమయం ముగిసింది. దయచేసి చిన్న సందేశంతో మళ్లీ ప్రయత్నించండి.",
    serverNotResponding:
      "సర్వర్ ప్రతిస్పందించడం లేదు. కొంచెం తర్వాత మళ్లీ ప్రయత్నించండి.",
    clickPhotoTextbook: "ప్రారంభించడానికి పాఠ్యపుస్తక పేజీ ఫోటో తీయండి.",
    clickUploadPhoto:
      "ఫోటోను అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా లాగి వదలండి",
    supportsFormats: "JPG, PNG మరియు ఇతర చిత్ర ఫార్మాట్‌లను మద్దతు ఇస్తుంది",
    changePhoto: "ఫోటోను మార్చండి",
    takePhoto: "ఫోటో తీయండి",
    configureLessonKit: "మీ పాఠ కిట్‌ను కాన్ఫిగర్ చేయండి",
    selectActivities: "మీరు సృష్టించాలనుకునే కార్యకలాపాల రకాలను ఎంచుకోండి.",
    worksheet: "వర్క్‌షీట్",
    drawingActivity: "డ్రాయింగ్ కార్యకలాపం",
    notes: "నోట్‌లు",
    generateLessonKit: "పాఠ కిట్‌ను సృష్టించండి",
    autoPlanWeek: "నా వారపు ఆటో ప్లాన్",
    generateWeeklyPlan:
      "మీ సిలబస్ లేదా కీ టాపిక్‌ల నుండి వారపు బోధనా ప్రణాళికను సృష్టించండి.",
    textbookSyllabus: "పాఠ్యపుస్తక సిలబస్ లేదా కీ టాపిక్‌లు",
    enterSyllabusContent:
      "వారానికి సిలబస్ కంటెంట్ లేదా టాపిక్‌ల జాబితాను నమోదు చేయండి.",
    syllabusPlaceholder: "ఉదా., అధ్యాయం 1: సౌర వ్యవస్థ, అధ్యాయం 2: జీవులు, ...",
    numberOfTeachingDays: "బోధనా రోజుల సంఖ్య",
    howManyDays: "ఈ వారంలో మీరు ఎన్ని రోజులు బోధిస్తారు?",
    teachingDaysPlaceholder: "ఉదా., 5",
    holidays: "సెలవులు (ఐచ్ఛికం)",
    specifyHolidays: "ఈ వారంలోని ఏ సెలవులైనా పేర్కొనండి.",
    holidaysPlaceholder: "ఉదా., బుధవారం",
    generatePlan: "ప్లాన్‌ను సృష్టించండి",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
