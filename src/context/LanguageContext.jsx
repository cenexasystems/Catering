"use client";

import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    // Header & Global
    title: "Sri Sankaraa Catering Services",
    services: "Services",
    menu: "Menu",
    gallery: "Gallery",
    testimonials: "Reviews",
    about: "About Us",
    contact: "Contact",
    bookNow: "Book a Consultation",

    // Hero
    heroBadge: "FSSAI Certified Premium Catering · Ambattur, Chennai",
    heroTitle1: "Crafting Divine Feasts",
    heroTitle2: "for Your Celebrations —",
    heroTitle3: "Premium Catering in Chennai",
    heroDesc: "Transforming every celebration into an unforgettable culinary journey. Premium wedding, corporate & traditional South Indian Sadhya catering in Chennai since 2009.",
    heroCta1: "Begin Your Journey",
    heroCta2: "Explore Menus",
    statLegacy: "YEARS OF LEGACY",
    statGrandEvents: "GRAND EVENTS",
    statHappySouls: "HAPPY SOULS",

    // Why Choose Us
    whyTag: "WHY CHOOSE US",
    whyTitle: "Built on Trust.",
    whyDesc: "Chennai's most reliable catering partner since day one. Experience flawless service and exceptional taste.",
    whyFeature1Title: "Fresh Ingredients",
    whyFeature1Desc: "Locally sourced, premium quality ingredients for every single dish.",
    whyFeature2Title: "Expert Chefs",
    whyFeature2Desc: "Decades of authentic culinary experience spanning diverse regional cuisines.",
    whyFeature3Title: "Hygiene First",
    whyFeature3Desc: "Strict adherence to safety and hygiene protocols during prep and service.",
    whyFeature4Title: "Transparent Pricing",
    whyFeature4Desc: "Honest, straightforward packages. No hidden fees or last-minute surprises.",

    // Live Poll Section
    pollTag: "LIVE GUEST FAVORITES",
    pollTitle: "Vote For Your Must-Have Dish",
    pollSub: "Tap heart to vote for the signature dishes you want featured at your next grand feast!",
    voted: "Voted",
    tapToVote: "Tap to Vote",

    // Food Highlight Section
    forTheFood: "FOR THE FOOD",
    dishStoryTitle: "Every dish tells a story.",
    dishStorySub: "From intimate family celebrations to grand weddings — we bring authentic flavours that your guests will talk about for years.",
    planMenuBtn: "Plan Your Menu",
    customMenusTitle: "Custom menus crafted just for your event.",
    talkChefSub: "Talk to our chef — personalise every dish for your occasion.",
    getQuoteBtn: "Get a Quote",

    // Interactive Menu Explorer
    leafTag: "TRADITIONAL LEAF DINING HERITAGE",
    leafTitle: "The Art of Banana Leaf Serving",
    leafSub: "Explore the authentic step-by-step serving sequence of a traditional South Indian Sadhya. Tap each step to discover dish placements and ancient dining lore!",

    // Video Showcase
    realStoriesTag: "REAL STORIES",
    videoShowcaseTitle: "Video Showcase",

    // About Strip (Stats)
    statYears: "Years Experience",
    statEvents: "Events Catered",
    statCities: "Cities Served",
    statClients: "Happy Clients",
    aboutStory: "With over 15 years of legacy since 2009, Sri Sankaraa Catering Services is dedicated to providing extraordinary food and service. Serving Ambattur, Chennai and surrounding areas across Tamil Nadu, our master chefs craft traditional South Indian Sadhya, grand multi-cuisine buffets, and live counters using fresh, FSSAI-certified ingredients.",

    // Services Section
    servicesTitle: "Our Catering Packages & Menus",
    servicesSub: "Choose the perfect catering package for your special occasion. View menu inclusions, download brochure PDF, or book directly.",
    service1: "Brahmin Menu (Tiffin & Lunch)",
    service1Desc: "Traditional Brahmin-style morning tiffin and grand lunch feast.",
    service1Included: [
      "Morning Tiffin: Kasi Halwa, Medhu Vadai, Pongal, Idly, Coffee",
      "Sweets & Snacks: Paruppu Gopuram, Suthu Murukku, Laddu",
      "Lunch Sweets: Jangri / Badusha, Milk Payasam",
      "Lunch Mains: Aama Vadai, Beans Usili, Potato Kaara Kari, Aviyal",
      "Accompaniments: Sambar, Mor Kuzhambu, Rasam, Appalam, Paruppu Ghee"
    ],
    service2: "Premium A5 Catering Booklet (2024)",
    service2Desc: "Comprehensive wedding contract covering all rituals, seer, and multi-day feasts.",
    service2Included: [
      "Seer Bakshanam: 7 Suthu Murukku, Athirasam, Mysorepak",
      "Muhurtham Breakfast: Asoka Halwa, Idly, Ghee Pongal, Vadai, Dosa",
      "Muhurtham Lunch: Kalyana Payasam, Cabbage Carrot Poriyal, Kadamba Sambar",
      "Reception Dinner: Veg Pulao, Paneer Masala, Chappathi, Ice Cream",
      "Kattu Sadam: Puliyodarai, Curd Rice, Idly with Milagai Podi"
    ],
    service3: "Sky Blue Four-Folding Menu",
    service3Desc: "Extensive multi-day catering covering Reception, Muhurtham, and Seer items.",
    service3Included: [
      "Dinner Menu 1: Malai Sandwich, Cutlet, Veg Pulao, Paneer Masala",
      "Dinner Menu 2: Rasamalai, Paneer Roll, Dum Briyani, Veg Oothappam",
      "Morning Tiffin: Dryfruit Halwa, Ilaneer Idly, Kuli Paniyaram",
      "Muhurtham Lunch: Paruppu Payasam, Potato Peas Poriyal, Aviyal",
      "Malabar Menu: Adai Prathaman, Olan, Kurukkiya Kaalan, Malabar Aviyal"
    ],
    service4: "Standard A5 Catering Booklet",
    service4Desc: "Classic South Indian tiffin and lunch combos.",
    service4Included: [
      "Tiffin: Pineapple Kesari, Idly, Pongal, Medhu Vadai",
      "Special Tiffin: Idiyappam / Kuruma, Poori / Masal",
      "Lunch Sweets: Dry Globejamun / Badusha, Semiya Payasam",
      "Lunch Mains: Potato Peas Porial, Aviyal, Sambar, Vatha Kuzhambu",
      "Special Rice: Veg Brinji & Thayir Pachadi"
    ],
    service5: "Sankaraa Catering Classic Menu",
    service5Desc: "Our signature extensive menu spanning grand buffets and traditional saapadu.",
    service5Included: [
      "Buffet Menu: Welcome Soup, Paneer Tikka, Mushroom Briyani, White Kuruma",
      "Evening Tiffin: Carrot Halwa, Mysore Bonda, Kichadi, Sambar",
      "Seemantham Menu: Semiya Payasam, 5 Variety Rice (Coconut, Mango, Puli)",
      "Dinner Specials: Malai Sandwich, Veg Lollipop, Mushroom Pepper Gravy",
      "Desserts & Live: Jalebi, Rasamalai, Live Dosa & Chaat Stations"
    ],
    service6: "Sky Blue Sheet Menu Card",
    service6Desc: "Premium complete catering package for grand events and weddings.",
    service6Included: [
      "Grand Buffet: Sweet Corn Soup, Paneer Tikka, Veg Dum Briyani",
      "Lunch Feast: Jangiri, Paruppu Payasam, Cabbage Poriyal, Vathakulambu",
      "Dinner Specials: Pista Roll, Veg Kabab, Aloo Parotta, Malai Kofta",
      "Chaat & Extras: Pani Puri, Bhel Puri, Cotton Candy, Popcorn",
      "Desserts: Carrot Halwa, Ilaneer Payasam, Ice Cream & Beeda"
    ],
    viewDetails: "View Details",
    downloadBrochure: "Download Brochure PDF",
    contactWhatsapp: "Contact via WhatsApp",

    // Gallery Section
    galleryTitle: "Our Culinary Canvas",
    backToHome: "← Back to Home",
    photosText: "Photos",
    completePortfolio: "OUR COMPLETE PORTFOLIO",
    fullGallery: "Culinary Gallery",
    exploreGallery: "Explore our handcrafted South Indian feasts, buffet setups, live counters, and sweet spreads.",
    catAll: "All",
    catSadhya: "Sadhya",
    catBuffet: "Buffet",
    catLive: "Live Stations",
    catDesserts: "Desserts",
    loadingGallery: "Loading divine feast gallery...",

    // Testimonials
    testimonialsTitle: "Customer Reviews",
    testimonialSummary: "4.9★ from 500+ successful events",
    socialProofTag: "WHAT THEY SAY",
    writeReview: "Write a Review",

    // Menu Section
    menuTitle: "Menu Highlights",
    menuDesc: "A glimpse into our diverse culinary offerings.",
    tabTiffin: "Morning Tiffin",
    tabLunch: "Sadhya / Lunch",
    tabDinner: "Dinner & Reception",
    tabChaat: "Live & Chaat",

    // Booking / Contact Section
    contactTitle: "Plan Your Event With Us",
    contactDesc: "Ready to start planning? Fill out the form below or reach out to us directly.",
    contactTag: "Enquiry",
    locationTag: "Visit Us",
    locationTitle: "Our Location",
    locationDesc: "Come experience our premium catering services in person",
    openInMap: "Open in Map",
    hours: "Business Hours",
    formName: "Full Name",
    formDate: "Event Date",
    formType: "Event Type",
    formGuests: "Number of Guests",
    formMessage: "Additional Details",
    submitForm: "Send Enquiry",
    phone: "Phone",
    email: "Email",
    address: "Address",
    visitUs: "visit us",
    bookingTitleLine1: "Experience Divine",
    bookingTitleLine2: "Flavours.",
    bookingAddress: "No.8/14, Sangam Street,\nVenkatapuram, Ambattur,\nChennai - 600 053.",
    bookingHours: "Mon — Sun · 10:00 AM — 9:00 PM",
    bookingPhoneLabel: "PHONE / WHATSAPP",
    bookingInstaLabel: "INSTAGRAM",
    bookingInstaValue: "@srisankaraacateringservices",
    bookingInstaUrl: "https://www.instagram.com/srisankaraacateringservices",
    bookingInstaValue2: "@srisankaraabrahmincatering",
    bookingInstaUrl2: "https://www.instagram.com/srisankaraabrahmincatering",
    waBooking: "WhatsApp Booking",
    directions: "Directions",
    ourShopHere: "Our kitchen is right here!",
    openInGoogleMaps: "Open in Google Maps App",
    liveLocation: "LIVE LOCATION",
    mapAddressFull: "Sri Sankaraa Catering Services, No.8/14, Sangam Street, Venkatapuram, Ambattur, Chennai - 600 053, India",
    mapReviews: "4.9 ★ (500+ Reviews)",
    startPlanningTag: "START PLANNING",
    readyTitle: "Ready to make your event unforgettable?",
    readySub: "Talk to our team — custom menus, full-service setup, and a team that cares.",
    bookEventBtn: "Book Your Event",
    whatsappUsBtn: "WhatsApp Us",
    callUs: "Call Us",
    chatWhatsapp: "Chat on WhatsApp",

    // Philosophy Section
    philTitle: "Our Culinary Philosophy",
    philSub: "Keeping traditions alive with modern sophistication",
    philDesc1: "At Sri Sankaraa Catering, we believe that food is not just sustenance—it is a celebration of culture, taste, and togetherness. Our culinary philosophy centers on sourcing the finest ingredients, preserving time-honored traditional recipes, and presenting them with contemporary refinement.",
    philDesc2: "Whether serving a classic South Indian wedding sadhya or a modern corporate buffet, our chefs ensure that every dish is a masterpiece of authentic flavors and flawless preparation.",
    philPoint1: "100% Vegetarian & Pure Ingredients",
    philPoint2: "Time-Honored Traditional Recipes",
    philPoint3: "Contemporary Food Presentation",

    // Process Section
    procTitle: "Our Service Process",
    procSub: "How we bring your dream culinary experience to life",
    step1Title: "1. Consultation",
    step1Desc: "We sit down with you to understand your preferences, guests, theme, and custom menu requirements.",
    step2Title: "2. Tasting & Curation",
    step2Desc: "Our expert chefs prepare selected highlights so you can taste and perfect the menu prior to the event.",
    step3Title: "3. Flawless Execution",
    step3Desc: "From preparation to setup and service, our professional team delivers an impeccable dining experience.",

    // Gallery Page
    portfolioTag: "OUR PORTFOLIO",
    galleryHeading: "Gallery",
    gallerySubText: "A glimpse of the divine culinary journeys we've crafted",
    loadingGallery: "Loading gallery...",
    viewFullGallery: "View Full Gallery Page",
    photosText: "Photos",
    completePortfolio: "OUR COMPLETE PORTFOLIO",
    fullGallery: "Full Gallery",
    exploreGallery: "Explore all our signature dishes, sadhya sequence spreads, live counters, and catering setups.",
    backToHome: "← Back to Home",
    catAll: "All",
    catSadhya: "Sadhya",
    catBuffet: "Buffet",
    catLive: "Live Station",
    catDesserts: "Desserts",
    catWedding: "Wedding",
    catCorporate: "Corporate",

    // Footer
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    footerText: "© 2026 Sri Sankaraa Catering Services. All rights reserved."
  },
  ta: {
    // Header & Global
    title: "ஸ்ரீ சங்கராஆ கேட்டரிங் சர்வீஸ்",
    services: "சேவைகள்",
    menu: "மெனு",
    gallery: "புகைப்படங்கள்",
    testimonials: "விமர்சனங்கள்",
    about: "எங்களை பற்றி",
    contact: "தொடர்பு",
    bookNow: "முன்பதிவு",

    // Hero
    heroBadge: "FSSAI சான்றளிக்கப்பட்ட உயர்தர கேட்டரிங் · அம்பத்தூர், சென்னை",
    heroTitle1: "உங்கள் கொண்டாட்டங்களுக்கு",
    heroTitle2: "தெய்வீக விருந்துகளை",
    heroTitle3: "உருவாக்குகிறோம் — சென்னை",
    heroDesc: "2009 முதல் சென்னையின் மிகச்சிறந்த திருமண கேட்டரிங், கார்ப்பரேட் மற்றும் பாரம்பரிய வாழையிலை விருந்து சேவைகள்.",
    heroCta1: "முன்பதிவு செய்ய",
    heroCta2: "சேவைகளை பார்க்க",
    statLegacy: "ஆண்டுகள் பாரம்பரியம்",
    statGrandEvents: "சிறப்பான நிகழ்வுகள்",
    statHappySouls: "மகிழ்ச்சியான மனிதர்கள்",

    // Why Choose Us
    whyTag: "ஏன் எங்களை தேர்ந்தெடுக்க வேண்டும்",
    whyTitle: "நம்பிக்கையின் அடிப்படை.",
    whyDesc: "ஆரம்பத்திலிருந்தே சென்னையின் மிகவும் நம்பகமான கேட்டரிங் பார்ட்னர். குறைபாடற்ற சேவை மற்றும் சிறந்த சுவையை அனுபவியுங்கள்.",
    whyFeature1Title: "புதிய பொருட்கள்",
    whyFeature1Desc: "ஒவ்வொரு உணவுக்கும் உள்ளூர் மற்றும் உயர்தர இயற்கை பொருட்கள்.",
    whyFeature2Title: "வல்லுநர் சமையல்காரர்கள்",
    whyFeature2Desc: "பல்வேறு சமையல் கலைகளில் பல தசாப்த கால உண்மையான அனுபவம்.",
    whyFeature3Title: "சுத்தம் மற்றும் சுகாதாரம்",
    whyFeature3Desc: "உணவு தயாரிப்பு மற்றும் சேவையின் போது கடுமையான பாதுகாப்பு விதிமுறைகள்.",
    whyFeature4Title: "வெளிப்படையான விலை",
    whyFeature4Desc: "நேர்மையான பேக்கேஜ்கள். மறைமுகக் கட்டணங்கள் எதுவும் இல்லை.",

    // Live Poll Section
    pollTag: "விருந்தினர்களின் விருப்பங்கள்",
    pollTitle: "உங்கள் விருப்பமான உணவுக்கு வாக்களியுங்கள்",
    pollSub: "உங்கள் அடுத்த பெரிய விருந்தில் இடம்பெற வேண்டிய உணவுகளுக்கு வாக்களியுங்கள்!",
    voted: "வாக்களிக்கப்பட்டது",
    tapToVote: "வாக்களிக்க கிளிக் செய்க",

    // Food Highlight Section
    forTheFood: "சுவையான உணவுகள்",
    dishStoryTitle: "ஒவ்வொரு உணவும் ஒரு கதை சொல்லும்.",
    dishStorySub: "சிறிய குடும்ப விழாக்கள் முதல் பெரிய திருமணங்கள் வரை — உங்கள் விருந்தினர்கள் காலமெல்லாம் பேசும் சுவையை நாங்கள் வழங்குகிறோம்.",
    planMenuBtn: "மெனுவைத் திட்டமிடுங்கள்",
    customMenusTitle: "உங்கள் நிகழ்வுக்கு ஏற்ப சிறப்பு மெனுக்கள்.",
    talkChefSub: "எங்கள் செஃப் உடன் பேசுங்கள் — உங்கள் நிகழ்வுக்கேற்ப உணவை தேர்வு செய்யுங்கள்.",
    getQuoteBtn: "விலை அறிய",

    // Interactive Menu Explorer
    leafTag: "பாரம்பரிய வாழையிலை விருந்து",
    leafTitle: "வாழையிலை பரிமாறும் முறை",
    leafSub: "தென்னிந்திய சாத்யா விருந்தின் பாரம்பரிய பரிமாறும் முறையை அறிந்துகொள்ள ஒவ்வொரு படிநிலையையும் கிளிக் செய்து பாருங்கள்!",

    // Video Showcase
    realStoriesTag: "உண்மையான கதைகள்",
    videoShowcaseTitle: "வீடியோ காட்சிகள்",

    // About Strip (Stats)
    statYears: "ஆண்டுகள் அனுபவம்",
    statEvents: "நிகழ்வுகள்",
    statCities: "நகரங்களில்",
    statClients: "மகிழ்ச்சியான வாடிக்கையாளர்கள்",
    aboutStory: "2009 முதல் 15 ஆண்டுகளுக்கும் மேலான சமையல் பாரம்பரியத்துடன், ஸ்ரீ சங்கராஆ கேட்டரிங் சர்வீசஸ் அம்பத்தூர், சென்னை மற்றும் தமிழ்நாடு முழுவதும் சிறந்த உணவு மற்றும் உபசரிப்பை வழங்குகிறது. புதிய FSSAI சான்றளிக்கப்பட்ட பொருட்களைக் கொண்டு பாரம்பரிய வாழையிலை விருந்து, மல்டி-க்விசின் பஃபே மற்றும் லைவ் கவுண்டர்களை வழங்குகிறோம்.",

    // Services Section
    servicesTitle: "எங்கள் கேட்டரிங் மெனுக்கள்",
    servicesSub: "உங்கள் சிறப்பு நிகழ்விற்கான பிரத்யேக கேட்டரிங் மெனுவைத் தேர்ந்தெடுத்து முழு விவரங்களையும் காண்க.",
    service1: "பிராமின் மெனு (டிபன் & மதிய உணவு)",
    service1Desc: "பாரம்பரிய பிராமண முறைப்படி காலை சிற்றுண்டி மற்றும் மதிய உணவு விருந்து.",
    service1Included: [
      "காலை சிற்றுண்டி: காசி அல்வா, மெது வடை, பொங்கல், இட்லி, காபி",
      "இனிப்புகள் & தின்பண்டங்கள்: பருப்பு கோபுரம், சுத்து முறுக்கு, லட்டு",
      "மதிய இனிப்புகள்: ஜாங்கிரி / பாதுஷா, பால் பாயாசம்",
      "மதிய முதன்மை உணவுகள்: ஆமை வடை, பீன்ஸ் உசிலி, உருளை கார கறி, அவியல்",
      "தொட்டுக்கொள்ள: சாம்பார், மோர் குழம்பு, ரசம், அப்பளம், பருப்பு நெய்"
    ],
    service2: "பிரீமியம் A5 கேட்டரிங் கையேடு (2024)",
    service2Desc: "சடங்குகள், சீர் மற்றும் பல நாள் விருந்துகளை உள்ளடக்கிய விரிவான திருமண ஒப்பந்தம்.",
    service2Included: [
      "சீர் பட்சணம்: 7 சுத்து முறுக்கு, அதிரசம், மைசூர்பாகு",
      "முகூர்த்த காலை சிற்றுண்டி: அசோகா அல்வா, இட்லி, நெய் பொங்கல், வடை, தோசை",
      "முகூர்த்த மதிய உணவு: கல்யாண பாயாசம், முட்டைக்கோஸ் கேரட் பொரியல், கதம்ப சாம்பார்",
      "வரவேற்பு இரவு உணவு: வெஜ் புலாவு, பன்னீர் மசாலா, சப்பாத்தி, ஐஸ்கிரீம்",
      "கட்டு சாதம்: புளியோதரை, தயிர் சாதம், மிளகாய் பொடியுடன் இட்லி"
    ],
    service3: "ஸ்கை ப்ளூ ஃபோர் ஃபோல்டிங் மெனு",
    service3Desc: "வரவேற்பு, முகூர்த்தம் மற்றும் சீர் வகைகளை உள்ளடக்கிய பிரம்மாண்ட கேட்டரிங்.",
    service3Included: [
      "இரவு உணவு 1: மலாய் சாண்ட்விச், கட்லெட், வெஜ் புலாவு, பன்னீர் மசாலா",
      "இரவு உணவு 2: ரசமலை, பன்னீர் ரோல், தம் பிரியாணி, வெஜ் ஊத்தப்பம்",
      "காலை சிற்றுண்டி: ட்ரை ஃப்ரூட் அல்வா, இளநீர் இட்லி, குழி பணியாரம்",
      "முகூர்த்த மதிய உணவு: பருப்பு பாயாசம், உருளை பட்டாணி பொரியல், அவியல்",
      "மலபார் மெனு: அடை பிரதமன், ஓலன், குறுக்கிய காளான், மலபார் அவியல்"
    ],
    service4: "ஸ்டாண்டர்ட் A5 கேட்டரிங் கையேடு",
    service4Desc: "உன்னதமான தென்னிந்திய சிற்றுண்டி மற்றும் மதிய உணவு வகைகள்.",
    service4Included: [
      "சிற்றுண்டி: அன்னாசி கேசரி, இட்லி, பொங்கல், மெது வடை",
      "சிறப்பு சிற்றுண்டி: இடியாப்பம் / குருமா, பூரி / மசால்",
      "மதிய இனிப்புகள்: ட்ரை குலோப் ஜாமூன் / பாதுஷா, சேமியா பாயாசம்",
      "மதிய உணவுகள்: உருளை பட்டாணி பொரியல், அவியல், சாம்பார், வத்த குழம்பு",
      "சிறப்பு சாதம்: வெஜ் பிரிஞ்சி & தயிர் பச்சடி"
    ],
    service5: "சங்கராஆ கேட்டரிங் கிளாசிக் மெனு",
    service5Desc: "பிரம்மாண்ட பஃபே மற்றும் பாரம்பரிய சாப்பாடு அடங்கிய எங்களின் சிறப்பு மெனு.",
    service5Included: [
      "பஃபே மெனு: வெல்கம் சூப், பன்னீர் டிக்கா, மஷ்ரூம் பிரியாணி, வெள்ளை குருமா",
      "மாலை சிற்றுண்டி: கேரட் அல்வா, மைசூர் போண்டா, கிச்சடி, சாம்பார்",
      "சீமந்தம் மெனு: சேமியா பாயாசம், 5 வகை சாதம் (தேங்காய், மாங்காய், புளி)",
      "இரவு சிறப்பு உணவுகள்: மலாய் சாண்ட்விச், வெஜ் லாலிபாப், மஷ்ரூம் பெப்பர் கிரேவி",
      "இனிப்புகள் & லைவ்: ஜிலேபி, ரசமலை, லைவ் தோசை & சாட் கவுண்டர்கள்"
    ],
    service6: "ஸ்கை ப்ளூ ஷீட் மெனு கார்டு",
    service6Desc: "பிரம்மாண்ட நிகழ்வுகள் மற்றும் திருமணங்களுக்கான முழுமையான கேட்டரிங் பேக்கேஜ்.",
    service6Included: [
      "கிராண்ட் பஃபே: ஸ்வீட் கார்ன் சூப், பன்னீர் டிக்கா, வெஜ் தம் பிரியாணி",
      "மதிய விருந்து: ஜாங்கிரி, பருப்பு பாயாசம், முட்டைக்கோஸ் பொரியல், வத்தக்குழம்பு",
      "இரவு சிறப்பு உணவுகள்: பிஸ்தா ரோல், வெஜ் கபாப், ஆலு பரோட்டா, மலாய் கோஃப்தா",
      "சாட் & கூடுதல்: பானி பூரி, பேல் பூரி, பஞ்சு மிட்டாய், பாப்கார்ன்",
      "இனிப்புகள்: கேரட் அல்வா, இளநீர் பாயாசம், ஐஸ்கிரீம் & பீடா"
    ],
    viewDetails: "மேலும் அறிய",
    downloadBrochure: "விவரங்களை பதிவிறக்க (PDF)",
    contactWhatsapp: "வாட்ஸ்அப் மூலம் தொடர்பு கொள்ள",

    // Gallery Section
    galleryTitle: "எங்கள் சமையல் கலை",
    backToHome: "← முகப்பு பக்கத்திற்கு",
    photosText: "புகைப்படங்கள்",
    completePortfolio: "எங்கள் முழுமையான படைப்புகள்",
    fullGallery: "சமையல் கேலரி",
    exploreGallery: "எங்களின் பாரம்பரிய சத்யா, பஃபே அமைப்புகள், லைவ் கவுண்டர்கள் மற்றும் இனிப்புகளைக் கண்டு களியுங்கள்.",
    catAll: "அனைத்தும்",
    catSadhya: "சத்யா விருந்து",
    catBuffet: "பஃபே அமைப்பு",
    catLive: "லைவ் கவுண்டர்கள்",
    catDesserts: "இனிப்புகள்",
    loadingGallery: "கேலரி ஏற்றப்படுகிறது...",

    // Testimonials
    testimonialsTitle: "வாடிக்கையாளர் கருத்துக்கள்",
    testimonialSummary: "500+ நிகழ்வுகளில் 4.9★ மதிப்பீடு",
    socialProofTag: "வாடிக்கையாளர்கள் கூறுவது",
    writeReview: "விமர்சனம் எழுதவும்",

    // Menu Section
    menuTitle: "மெனு சிறப்பம்சங்கள்",
    menuDesc: "எங்கள் பல்வேறு சமையல் சலுகைகளின் ஒரு பார்வை.",
    tabTiffin: "காலை சிற்றுண்டி",
    tabLunch: "மதிய உணவு",
    tabDinner: "இரவு உணவு",
    tabChaat: "லைவ் & சாட்",

    // Booking / Contact Section
    contactTitle: "தொடர்பு கொள்ள",
    contactDesc: "உங்கள் நிகழ்வைத் திட்டமிட தயாரா? இன்றே எங்களைத் தொடர்புகொள்ளவும்.",
    contactTag: "விசாரணை",
    locationTag: "எங்களை சந்திக்கவும்",
    locationTitle: "எங்கள் அலுவலக இருப்பிடம்",
    locationDesc: "நேரடியாக எங்களை சந்தித்து உங்கள் நிகழ்வைப் பற்றி ஆலோசிக்கவும்",
    openInMap: "வரைபடத்தில் திறக்கவும்",
    hours: "அலுவலக நேரம்",
    formName: "முழு பெயர்",
    formDate: "நிகழ்வு தேதி",
    formType: "நிகழ்வு வகை",
    formGuests: "விருந்தினர்கள் எண்ணிக்கை",
    formMessage: "கூடுதல் விவரங்கள்",
    submitForm: "விவரங்களை அனுப்பவும்",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    address: "முகவரி",
    visitUs: "எங்களை சந்திக்கவும்",
    bookingTitle: "தெய்வீக சுவையை\nஅனுபவியுங்கள்.",
    bookingAddress: "எண். 8/14, சங்கம் தெரு, வெங்கடாபுரம், அம்பத்தூர், சென்னை - 600 053.",
    bookingHours: "திங்கள் — ஞாயிறு · காலை 10:00 — இரவு 9:00",
    bookingPhoneLabel: "தொலைபேசி / வாட்ஸ்அப்",
    bookingInstaLabel: "இன்ஸ்டாகிராம்",
    waBooking: "வாட்ஸ்அப் முன்பதிவு",
    directions: "வழிசெலுத்தல்",
    startPlanningTag: "திட்டமிடத் தொடங்குங்கள்",
    readyTitle: "உங்கள் நிகழ்வை மறக்க முடியாததாக மாற்றத் தயாரா?",
    readySub: "எங்கள் குழுவிடம் பேசுங்கள் — சிறப்பு மெனுக்கள் மற்றும் முழுமையான சேவை.",
    bookEventBtn: "நிகழ்வை முன்பதிவு செய்",
    whatsappUsBtn: "வாட்ஸ்அப்பில் தொடர்புகொள்ள",
    callUs: "எங்களை அழைக்க",
    chatWhatsapp: "வாட்ஸ்அப் செய்ய",

    // Philosophy Section
    philTitle: "எங்கள் சமையல் தத்துவம்",
    philSub: "நவீன நேர்த்தியுடன் பாரம்பரியத்தை உயிர்ப்புடன் வைத்திருத்தல்",
    philDesc1: "ஸ்ரீ சங்கராஆ கேட்டரிங்கில், உணவு என்பது வெறும் பசி ஆற்றுவது மட்டுமல்ல—அது கலாச்சாரம், சுவை மற்றும் ஒற்றுமையின் கொண்டாட்டம் என்று நாங்கள் நம்புகிறோம். சிறந்த பொருட்களைத் தேர்ந்தெடுத்து, பாரம்பரிய முறைகளை மாற்றாமல், நவீன நேர்த்தியுடன் உங்களுக்கு வழங்குகிறோம்.",
    philDesc2: "பாரம்பரிய தென்னிந்திய திருமண விருந்தாக இருந்தாலும் அல்லது நவீன கார்ப்பரேட் பஃபேவாக இருந்தாலும், எங்கள் சமையல்காரர்கள் ஒவ்வொரு உணவும் உண்மையான சுவையுடனும் நேர்த்தியுடனும் தயாரிக்கப்படுவதை உறுதி செய்கிறார்கள்.",
    philPoint1: "100% சுத்தமான சைவ மற்றும் தரமான பொருட்கள்",
    philPoint2: "தலைமுறைகள் கடந்த பாரம்பரிய சமையல் முறைகள்",
    philPoint3: "நவீன மற்றும் நேர்த்தியான உணவு அலங்காரம்",

    // Process Section
    procTitle: "எங்கள் சேவை செயல்முறை",
    procSub: "உங்கள் கனவு சமையல் அனுபவத்தை நாங்கள் எவ்வாறு உருவாக்குகிறோம்",
    step1Title: "1. கலந்தாலோசனை",
    step1Desc: "உங்கள் விருப்பங்கள், விருந்தினர்கள் மற்றும் மெனு தேவைகளை நாங்கள் முழுமையாக கேட்டுத் தெரிந்துகொள்கிறோம்.",
    step2Title: "2. சுவைத்தல் மற்றும் தேர்வு",
    step2Desc: "எங்கள் சமையல்காரர்கள் மெனுவை தயாரித்து, நிகழ்வுக்கு முன்பே நீங்கள் சுவைத்துப் பார்த்து இறுதி செய்ய உதவுகிறோம்.",
    step3Title: "3. நேர்த்தியான செயலாக்கம்",
    step3Desc: "தயாரிப்பு முதல் மேஜை அலங்காரம் மற்றும் சேவை வரை, எங்கள் குழு ஒரு குறைபாடற்ற உணவு அனுபவத்தை வழங்குகிறது.",

    // Gallery Page
    portfolioTag: "எங்கள் தொகுப்பு",
    galleryHeading: "புகைப்படங்கள்",
    gallerySubText: "நாங்கள் உருவாக்கிய தெய்வீக சமையல் பயணங்களின் ஒரு பார்வை",
    loadingGallery: "ஏற்றப்படுகிறது...",
    viewFullGallery: "முழு கேலரி பக்கத்தைக் காண்க",
    photosText: "புகைப்படங்கள்",
    completePortfolio: "எங்கள் முழுமையான தொகுப்பு",
    fullGallery: "முழு கேலரி",
    exploreGallery: "எங்கள் அனைத்து சிக்னேச்சர் உணவுகள், சாத்யா விரிப்புகள், லைவ் கவுண்டர்கள் மற்றும் கேட்டரிங் அமைப்புகளை ஆராயுங்கள்.",
    backToHome: "← முகப்புக்குத் திரும்பு",
    catAll: "அனைத்தும்",
    catSadhya: "சாத்யா",
    catBuffet: "பஃபே",
    catLive: "லைவ் ஸ்டேஷன்",
    catDesserts: "இனிப்புகள்",
    catWedding: "திருமணம்",
    catCorporate: "கார்ப்பரேட்",

    // Footer
    quickLinks: "முக்கிய இணைப்புகள்",
    followUs: "சமூக வலைத்தளங்கள்",
    footerText: "© 2026 ஸ்ரீ சங்கராஆ கேட்டரிங் சர்வீஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    address: "முகவரி",
    visitUs: "visit us",
    bookingTitleLine1: "தெய்வீக சுவையை",
    bookingTitleLine2: "அனுபவியுங்கள்.",
    bookingAddress: "எண்.8/14, சங்கம் தெரு,\nவெங்கடாபுரம், அம்பத்தூர்,\nசென்னை - 600 053.",
    bookingHours: "திங்கள் — ஞாயிறு · காலை 10:00 — இரவு 9:00",
    bookingPhoneLabel: "தொலைபேசி / வாட்ஸ்அப்",
    bookingInstaLabel: "இன்ஸ்டாகிராம்",
    bookingInstaValue: "@srisankaraacateringservices",
    bookingInstaUrl: "https://www.instagram.com/srisankaraacateringservices",
    bookingInstaValue2: "@srisankaraabrahmincatering",
    bookingInstaUrl2: "https://www.instagram.com/srisankaraabrahmincatering",
    waBooking: "வாட்ஸ்அப் முன்பதிவு",
    directions: "வழிசெலுத்தல்",
    ourShopHere: "எங்கள் சமையலறை இங்கே உள்ளது!",
    openInGoogleMaps: "கூகுள் மேப்ஸில் திறக்கவும்",
    liveLocation: "நேரலை இருப்பிடம்",
    mapAddressFull: "ஸ்ரீ சங்கராஆ கேட்டரிங் சர்வீஸ், எண்.8/14, சங்கம் தெரு, வெங்கடாபுரம், அம்பத்தூர், சென்னை - 600 053",
    mapReviews: "4.9 ★ (500+ விமர்சனங்கள்)",

    // Philosophy Section
    philTitle: "எங்கள் சமையல் தத்துவம்",
    philSub: "நவீன நேர்த்தியுடன் பாரம்பரியத்தை உயிர்ப்புடன் வைத்திருத்தல்",
    philDesc1: "ஸ்ரீ சங்கரா கேட்டரிங்கில், உணவு என்பது வெறும் பசி ஆற்றுவது மட்டுமல்ல—அது கலாச்சாரம், சுவை மற்றும் ஒற்றுமையின் கொண்டாட்டம் என்று நாங்கள் நம்புகிறோம். சிறந்த பொருட்களைத் தேர்ந்தெடுத்து, பாரம்பரிய முறைகளை மாற்றாமல், நவீன நேர்த்தியுடன் உங்களுக்கு வழங்குகிறோம்.",
    philDesc2: "பாரம்பரிய தென்னிந்திய திருமண விருந்தாக இருந்தாலும் அல்லது நவீன கார்ப்பரேட் பஃபேவாக இருந்தாலும், எங்கள் சமையல்காரர்கள் ஒவ்வொரு உணவும் உண்மையான சுவையுடனும் நேர்த்தியுடனும் தயாரிக்கப்படுவதை உறுதி செய்கிறார்கள்.",
    philPoint1: "100% சுத்தமான சைவ மற்றும் தரமான பொருட்கள்",
    philPoint2: "தலைமுறைகள் கடந்த பாரம்பரிய சமையல் முறைகள்",
    philPoint3: "நவீன மற்றும் நேர்த்தியான உணவு அலங்காரம்",

    // Process Section
    procTitle: "எங்கள் சேவை செயல்முறை",
    procSub: "உங்கள் கனவு சமையல் அனுபவத்தை நாங்கள் எவ்வாறு உருவாக்குகிறோம்",
    step1Title: "1. கலந்தாலோசனை",
    step1Desc: "உங்கள் விருப்பங்கள், விருந்தினர்கள் மற்றும் மெனு தேவைகளை நாங்கள் முழுமையாக கேட்டுத் தெரிந்துகொள்கிறோம்.",
    step2Title: "2. சுவைத்தல் மற்றும் தேர்வு",
    step2Desc: "எங்கள் சமையல்காரர்கள் மெனுவை தயாரித்து, நிகழ்வுக்கு முன்பே நீங்கள் சுவைத்துப் பார்த்து இறுதி செய்ய உதவுகிறோம்.",
    step3Title: "3. நேர்த்தியான செயலாக்கம்",
    step3Desc: "தயாரிப்பு முதல் மேஜை அலங்காரம் மற்றும் சேவை வரை, எங்கள் குழு ஒரு குறைபாடற்ற உணவு அனுபவத்தை வழங்குகிறது.",

    // Gallery Page
    portfolioTag: "எங்கள் தொகுப்பு",
    galleryHeading: "புகைப்படங்கள்",
    gallerySubText: "நாங்கள் உருவாக்கிய தெய்வீக சமையல் பயணங்களின் ஒரு பார்வை",
    loadingGallery: "ஏற்றப்படுகிறது...",
    viewFullGallery: "முழு கேலரி பக்கத்தைக் காண்க",
    photosText: "புகைப்படங்கள்",
    completePortfolio: "எங்கள் முழுமையான தொகுப்பு",
    fullGallery: "முழு கேலரி",
    exploreGallery: "எங்கள் அனைத்து சிக்னேச்சர் உணவுகள், சாத்யா விரிப்புகள், லைவ் கவுண்டர்கள் மற்றும் கேட்டரிங் அமைப்புகளை ஆராயுங்கள்.",
    backToHome: "← முகப்புக்குத் திரும்பு",
    catAll: "அனைத்தும்",
    catSadhya: "சாத்யா",
    catBuffet: "பஃபே",
    catLive: "லைவ் ஸ்டேஷன்",
    catDesserts: "இனிப்புகள்",
    catWedding: "திருமணம்",
    catCorporate: "கார்ப்பரேட்",

    // Footer
    quickLinks: "முக்கிய இணைப்புகள்",
    followUs: "சமூக வலைத்தளங்கள்",
    footerText: "© 2026 ஸ்ரீ சங்கரா கேட்டரிங் சர்வீஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  React.useEffect(() => {
    const savedLang = localStorage.getItem('sri_sankara_lang');
    if (savedLang === 'ta' || savedLang === 'en') {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => {
      const nextLang = prev === 'en' ? 'ta' : 'en';
      localStorage.setItem('sri_sankara_lang', nextLang);
      return nextLang;
    });
  };

  React.useEffect(() => {
    if (lang === 'ta') {
      document.documentElement.classList.add('tamil-mode');
    } else {
      document.documentElement.classList.remove('tamil-mode');
    }
  }, [lang]);

  const t = (key) => translations[lang]?.[key] || translations['en']?.[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
