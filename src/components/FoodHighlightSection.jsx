"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import styles from './FoodHighlightSection.module.css';

const highlights = [
  {
    emoji: "🍛",
    title: { en: "South Indian Sadhya", ta: "தென்னிந்திய சத்யா விருந்து" },
    desc: { en: "Traditional banana leaf meals with 20+ authentic accompaniments. A feast for the soul.", ta: "20+ பாரம்பரிய சுவைகளுடன் வாழை இலையில் பரிமாறப்படும் தெய்விக விருந்து." },
    tag: { en: "Wedding Special", ta: "திருமண சிறப்பு" }
  },
  {
    emoji: "🍲",
    title: { en: "Live Counter Station", ta: "நேரடி உணவகம் (Live Counter)" },
    desc: { en: "Interactive live dosa, chaat & dessert counters that become the star of your event.", ta: "சூடான தோசை, சாட் மற்றும் இனிப்புகள் உடனுக்குடன் தயாரித்து வழங்கப்படும்." },
    tag: { en: "Most Popular", ta: "மிகவும் விரும்பப்படும்" }
  },
  {
    emoji: "🎂",
    title: { en: "Grand Dessert Spreads", ta: "பிரமாண்ட இனிப்பு வகைகள்" },
    desc: { en: "Decadent dessert platters crafted fresh — from payasam to fusion sweets.", ta: "இளநீர் பாயாசம் முதல் பலவிதமான சுவையான இனிப்பு வகைகள்." },
    tag: { en: "Party Favourite", ta: "விழாக்களுக்கு சிறந்தது" }
  },
  {
    emoji: "🥘",
    title: { en: "Multi-Cuisine Buffet", ta: "பஃபே விருந்து அமைப்பு" },
    desc: { en: "Full-service North Indian, South Indian & Continental buffet setups for every taste.", ta: "வட இந்திய, தென்னிந்திய மற்றும் பலவகை உணவுகளுடன் கூடிய பஃபே." },
    tag: { en: "Corporate Ready", ta: "கார்ப்பரேட் ஸ்பெஷல்" }
  },
];

export default function FoodHighlightSection() {
  const { lang, t } = useLanguage();
  const { openBookingModal } = useBooking();

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.preTitle}>{t('forTheFood')}</span>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('dishStoryTitle')}
            </motion.h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.subtitle}>
              {t('dishStorySub')}
            </p>
            <button className={styles.ctaBtn} onClick={openBookingModal}>
              {t('planMenuBtn')} →
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className={styles.cardEmoji}>{item.emoji}</div>
              <div className={styles.cardBody}>
                <span className={styles.cardTag}>{item.tag[lang] || item.tag.en}</span>
                <h3 className={styles.cardTitle}>{item.title[lang] || item.title.en}</h3>
                <p className={styles.cardDesc}>{item.desc[lang] || item.desc.en}</p>
              </div>
              <div className={styles.cardArrow}>→</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          className={styles.banner}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.bannerImages}>
            <img src="/gallery/south_indian_meals_1785684185063.png" alt="South Indian banana leaf Sadhya meals catered by Sri Sankaraa Catering Services Chennai" />
            <img src="/gallery/dessert_platter_1785684210041.png" alt="Royal South Indian dessert platter spread in Chennai by Sri Sankaraa Catering" />
            <img src="/gallery/live_counter_1785684260521.png" alt="Live counter catering service setup in Ambattur Chennai" />
          </div>
          <div className={styles.bannerText}>
            <h3>{t('customMenusTitle')}</h3>
            <p>{t('talkChefSub')}</p>
          </div>
          <button className={styles.bannerBtn} onClick={openBookingModal}>
            {t('getQuoteBtn')}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
