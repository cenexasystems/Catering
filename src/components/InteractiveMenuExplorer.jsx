"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import styles from './InteractiveMenuExplorer.module.css';

const SERVING_STEPS = [
  {
    id: 1,
    title: { en: 'Morning Tiffin & Breakfast', ta: 'காலை உணவு & டிபன்' },
    subtitle: { en: 'Authentic Tiffin with Kasi Halwa, Medhu Vadai & Degree Coffee', ta: 'காசி அல்வா, மெது வடை, இட்லி, பொங்கல் & பில்டர் காபி' },
    icon: '☕',
    dishes: [
      { name: { en: 'Kasi Halwa / Wheat Halwa', ta: 'காசி அல்வா / கோதுமை அல்வா' }, icon: '🧈', desc: { en: 'Melt-in-the-mouth Halwa made with pure ghee & cashews.', ta: 'நெய் மணக்கும் சுவையான கோதுமை / காசி அல்வா.' } },
      { name: { en: 'Medhu Vadai', ta: 'மெது வடை' }, icon: '🧆', desc: { en: 'Crispy golden fried lentil Medhu Vadai.', ta: 'மொறுமொறுப்பான உளுந்து மெதுவடை.' } },
      { name: { en: 'Idly & Ven Pongal', ta: 'இட்லி & வெண் பொங்கல்' }, icon: '🥞', desc: { en: 'Soft Mallipoo Idly & aromatic Ghee Ven Pongal.', ta: 'மல்லிகைப் பூ இட்லி மற்றும் நெய் வெண் பொங்கல்.' } },
      { name: { en: 'Coconut Chutney & Tomato Thokku', ta: 'தேங்காய் சட்னி & தக்காளி தொக்கு' }, icon: '🥥', desc: { en: 'Freshly ground coconut chutney & spicy tomato thokku.', ta: 'தேங்காய் சட்னி மற்றும் தக்காளி தொக்கு.' } },
      { name: { en: 'Kosthu', ta: 'கொஸ்து' }, icon: '🍲', desc: { en: 'Traditional spiced brinjal & lentil Kosthu.', ta: 'பாரம்பரிய சுவையான கொஸ்து.' } },
      { name: { en: 'Filter Coffee', ta: 'ஃபில்டர் காபி' }, icon: '☕', desc: { en: 'Freshly brewed Kumbakonam brass dabba Filter Coffee.', ta: 'பித்தளை டம்ளரில் பரிமாறப்படும் பில்டர் காபி.' } }
    ],
    heritageTip: {
      en: 'Morning breakfast begins with a traditional hot halwa and filter coffee followed by soft idlis, ghee pongal, and crispy medhu vada.',
      ta: 'காலை உணவு பாரம்பரிய இனிப்பு மற்றும் சுடச்சுட காபியுடன் தொடங்கி சுவையான இட்லி, பொங்கலுடன் நிறைவடைகிறது.'
    }
  },
  {
    id: 2,
    title: { en: 'Leaf Sadhya: Starters & Sweets', ta: 'வாழையிலை விருந்து: ஸ்வீட்ஸ் & அப்பளம்' },
    subtitle: { en: 'Top Leaf Placement: Sweets, Vadai, Payasam & Accompaniments', ta: 'வாழை இலையின் மேல் பகுதியில் பரிமாறப்படும் இனிப்பு மற்றும் தொடுகறிகள்' },
    icon: '🍃',
    dishes: [
      { name: { en: 'Jangri / Badusha', ta: 'ஜாங்கிரி / பாதுஷா' }, icon: '🍯', desc: { en: 'Freshly made juicy Jangri or melt-in-the-mouth Badusha.', ta: 'பாரம்பரிய ஜாங்கிரி அல்லது சுவையான பாதுஷா.' } },
      { name: { en: 'Aama Vadai / Curd Vadai', ta: 'ஆமை வடை / தயிர் வடை' }, icon: '🧆', desc: { en: 'Crispy Aama Vadai or cool spiced Curd Vadai.', ta: 'பாரம்பரிய ஆமை வடை அல்லது குளிர்ந்த தயிர் வடை.' } },
      { name: { en: 'Milk Payasam / Paruppu Payasam', ta: 'பால் பாயாசம் / பருப்பு பாயாசம்' }, icon: '🥣', desc: { en: 'Rich cardamom Paal Payasam or Paruppu Payasam.', ta: 'முந்திரி திராட்சை தூவிய பால் / பருப்பு பாயாசம்.' } },
      { name: { en: 'Pineapple Sweet Pachadi', ta: 'அன்னாசி ஸ்வீட் பச்சடி' }, icon: '🍍', desc: { en: 'Sweet & tangy Pineapple fruit pachadi.', ta: 'சுவையான அன்னாசி ஸ்வீட் பச்சடி.' } },
      { name: { en: 'Appalam & Orugai (Pickle)', ta: 'அப்பளம் & ஊறுகாய்' }, icon: '🍘', desc: { en: 'Crispy Appalam & authentic spicy Mango/Citron Pickle.', ta: 'மொறுமொறு அப்பளம் மற்றும் மாங்காய் ஊறுகாய்.' } }
    ],
    heritageTip: {
      en: 'In banana leaf dining etiquette, sweets and vadai are placed on the top right corner of the leaf, signaling the start of the grand feast.',
      ta: 'வாழையிலை விருந்தில் இனிப்பு மற்றும் வடை இலையின் வலது மேல் மூலையில் முதன்முதலாக பரிமாறப்படுகிறது.'
    }
  },
  {
    id: 3,
    title: { en: 'Leaf Sadhya: Mains & Gravies', ta: 'வாழையிலை விருந்து: சாதம் & சாம்பார்' },
    subtitle: { en: 'Steamed Rice, Paruppu Ghee, Sambar, Mor Kuzhambu & Usili', ta: 'சூடான சாதம், பருப்பு நெய், சாம்பார், மோர்குழம்பு & உசிலி' },
    icon: '🍚',
    dishes: [
      { name: { en: 'Steamed Rice & Paruppu Ghee', ta: 'சாதம் & பருப்பு நெய்' }, icon: '🍚', desc: { en: 'Piping hot steamed rice served with pure ghee and cooked dal.', ta: 'சூடான சாதம், பருப்பு மற்றும் சுத்தமான பசு நெய்.' } },
      { name: { en: 'Vendaikkai Sambar', ta: 'வெண்டக்காய் சாம்பார்' }, icon: '🍲', desc: { en: 'Traditional Okra Sambar cooked with freshly ground spices.', ta: 'மணமணக்கும் வெண்டக்காய் சாம்பார்.' } },
      { name: { en: 'Poosani Mor Kuzhambu', ta: 'பூசணி மோர்குழம்பு' }, icon: '🥣', desc: { en: 'Spiced yogurt gravy cooked with ash gourd / white pumpkin.', ta: 'பூசணிக்காய் சேர்த்த சுவையான மோர்குழம்பு.' } },
      { name: { en: 'Avial & Potato Kara Kari', ta: 'அவியல் & உருளை காரக்கறி' }, icon: '🥦', desc: { en: 'Mixed vegetable coconut Avial & spicy roasted Potato Kari.', ta: 'பாரம்பரிய அவியல் மற்றும் உருளை காரக்கறி.' } },
      { name: { en: 'Beans Usili', ta: 'பீன்ஸ் உசிலி' }, icon: '🫛', desc: { en: 'Lentil crumbled vegetable Beans Usili.', ta: 'சுவையான பீன்ஸ் உசிலி.' } },
      { name: { en: 'Puliyogare', ta: 'புளியோதரை' }, icon: '🥘', desc: { en: 'Authentic temple-style tangy tamarind rice.', ta: 'கோவில் பாணி சுவையான புளியோதரை.' } }
    ],
    heritageTip: {
      en: 'The main course is served sequentially: Paruppu & Ghee first, followed by Vendaikkai Sambar, then Poosani Mor Kuzhambu, accompanied by Avial and Usili.',
      ta: 'முதலில் பருப்பு நெய், தொடர்ந்து சாம்பார், பின்னர் மோர்குழம்பு என வரிசையாக பரிமாறப்படுகிறது.'
    }
  },
  {
    id: 4,
    title: { en: 'Finishers & Return Gift Seethanam', ta: 'ரசம், மோர் & சீதனப் பொருட்கள்' },
    subtitle: { en: 'Rasam, Katti Mor, Paruppu Gopuram, Murukku & Thamboola Bag', ta: 'தக்காளி ரசம், கட்டி மோர், பருப்பு கோபுரம், சுத்து முறுக்கு & தாம்பூலம்' },
    icon: '🎁',
    dishes: [
      { name: { en: 'Tomato Rasam', ta: 'தக்காளி ரசம்' }, icon: '🍲', desc: { en: 'Pepper garlic digestion-boosting Tomato Rasam.', ta: 'செரிமானத்திற்கு உகந்த தக்காளி ரசம்.' } },
      { name: { en: 'Katti Mor', ta: 'கட்டி மோர்' }, icon: '🥛', desc: { en: 'Thick chilled spiced curd/buttermilk to finish the meal.', ta: 'விருந்து நிறைவடையும் கட்டி மோர்.' } },
      { name: { en: 'Paruppu Gopuram', ta: 'பருப்பு கோபுரம்' }, icon: '🏺', desc: { en: 'Auspicious traditional Paruppu Gopuram setup for marriages.', ta: 'திருமணத்திற்கான பாரம்பரிய பருப்பு கோபுரம்.' } },
      { name: { en: 'Suthu Murukku & Laddu', ta: 'சுத்து முறுக்கு & லட்டு' }, icon: '🥠', desc: { en: 'Crispy handcrafted Suthu Murukku & sweet Laddu.', ta: 'சுத்து முறுக்கு மற்றும் சுவையான லட்டு.' } },
      { name: { en: 'Thamboola Bag', ta: 'தாம்பூல பை' }, icon: '🛍️', desc: { en: 'Return gift Thamboola Bag for all event guests.', ta: 'விருந்தினர்களுக்கான பாரம்பரிய தாம்பூல பை.' } }
    ],
    heritageTip: {
      en: 'The banana leaf meal finishes with digestives like Rasam and Katti Mor, followed by presenting guests with Suthu Murukku, Laddu, and Thamboola Bag.',
      ta: 'விருந்தின் இறுதியில் ரசம், கட்டி மோர் பரிமாறப்பட்டு, விருந்தினர்களுக்கு தாம்பூல பை மற்றும் முறுக்கு வழங்கி உபசரிக்கப்படுகிறது.'
    }
  }
];

export default function InteractiveMenuExplorer() {
  const { lang, t } = useLanguage();
  const { openBookingModal } = useBooking();
  const [activeStep, setActiveStep] = useState(SERVING_STEPS[0]);

  const getText = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.en || '';
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.preTitle}>🌿 {t('leafTag')}</span>
          <h2 className={styles.title}>{t('leafTitle')}</h2>
          <p className={styles.subtitle}>
            {t('leafSub')}
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className={styles.stepTabs}>
          {SERVING_STEPS.map((step) => (
            <button
              key={step.id}
              className={`${styles.tabBtn} ${activeStep.id === step.id ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveStep(step)}
            >
              <span className={styles.stepNum}>0{step.id}</span>
              <span className={styles.stepIcon}>{step.icon}</span>
              <span className={styles.stepTitle}>{getText(step.title)}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className={styles.showcaseCard}
          >
            <div className={styles.showcaseHeader}>
              <div>
                <span className={styles.stepBadge}>STEP 0{activeStep.id} OF 04</span>
                <h3 className={styles.cardMainTitle}>{getText(activeStep.title)}</h3>
                <p className={styles.cardSubtitle}>{getText(activeStep.subtitle)}</p>
              </div>
              <button className={styles.bookMenuCta} onClick={openBookingModal}>
                Book This Sadhya Experience →
              </button>
            </div>

            {/* Dish Placement Grid */}
            <div className={styles.dishesGrid}>
              {activeStep.dishes.map((dish, i) => (
                <div key={i} className={styles.dishCard}>
                  <div className={styles.dishHeader}>
                    <span className={styles.dishIcon}>{dish.icon}</span>
                    <span className={styles.dishName}>{getText(dish.name)}</span>
                  </div>
                  <p className={styles.dishDesc}>{getText(dish.desc)}</p>
                </div>
              ))}
            </div>

            {/* Heritage Lore Tip Box */}
            <div className={styles.heritageTipBox}>
              <span className={styles.tipIcon}>💡</span>
              <div>
                <h4 className={styles.tipTitle}>
                  {lang === 'ta' ? 'பாரம்பரிய பரிமாறும் முறை' : 'Ancient Banana Leaf Serving Tradition'}
                </h4>
                <p className={styles.tipText}>{getText(activeStep.heritageTip)}</p>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
