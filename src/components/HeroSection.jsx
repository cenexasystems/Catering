"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import styles from './HeroSection.module.css';
import Link from 'next/link';

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}



export default function HeroSection() {
  const { lang, t } = useLanguage();
  const { openBookingModal } = useBooking();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const events = useCounter(500, 1800, statsVisible);
  const guests = useCounter(10000, 2000, statsVisible);
  const years = useCounter(15, 1200, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.hero}>

      <div className={styles.heroContent}>

        {/* LEFT: Text */}
        <div className={styles.textContainer}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.badgeDot}></span>
            {t('heroBadge')}
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {lang === 'ta' ? (
              <>
                {t('heroTitle1')} <br />
                {t('heroTitle2')} <br />
                <span className={styles.highlight}>{t('heroTitle3')}</span>
              </>
            ) : (
              <>
                {t('heroTitle1')} <br />
                {t('heroTitle2')} <span className={styles.highlight}>{t('heroTitle3')}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {t('heroDesc')}
          </motion.p>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <button className={styles.primaryButton} onClick={openBookingModal}>
              {t('heroCta1')} <span className={styles.arrow}>→</span>
            </button>
            <Link href="#services" className={styles.secondaryButton}>
              {t('heroCta2')}
            </Link>
          </motion.div>

          {/* Animated stat counters */}
          <div className={styles.heroStats} ref={statsRef}>
            <div className={styles.statItem}>
              <h3 className={styles.statNum}>{years}<span className={styles.statPlus}>+</span></h3>
              <p className={styles.statLabel}>{t('statLegacy')}</p>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <h3 className={styles.statNum}>{events}<span className={styles.statPlus}>+</span></h3>
              <p className={styles.statLabel}>{t('statGrandEvents')}</p>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <h3 className={styles.statNum}>{(guests / 1000).toFixed(0)}K<span className={styles.statPlus}>+</span></h3>
              <p className={styles.statLabel}>{t('statHappySouls')}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Deity Image with Draggable Interactive Elements */}
        <div className={styles.imageContainer}>
          <motion.div
            className={styles.deityFrame}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {/* Decorative ring */}
            <div className={styles.deityRing} />
            
            {/* Interactive Draggable Particles */}
            <motion.div
              className={styles.particle1}
              drag
              dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
              whileHover={{ scale: 1.5, cursor: "grab" }}
              whileDrag={{ scale: 1.3, cursor: "grabbing" }}
            >
              ✨
            </motion.div>
            <motion.div
              className={styles.particle2}
              drag
              dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
              whileHover={{ scale: 1.5, cursor: "grab" }}
              whileDrag={{ scale: 1.3, cursor: "grabbing" }}
            >
              🌿
            </motion.div>
            <motion.div
              className={styles.particle3}
              drag
              dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
              whileHover={{ scale: 1.5, cursor: "grab", opacity: 1 }}
              whileDrag={{ scale: 1.3, cursor: "grabbing" }}
            >
              🌸
            </motion.div>

            <motion.img 
              layoutId="deity-image"
              src="/deity.png" 
              alt="Sri Sankaraa Catering Services - Traditional Divine Blessings Icon" 
              className={styles.deityImage}
              whileHover={{ scale: 1.05, filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.15))" }}
              transition={{ layout: { duration: 0.85, ease: [0.77, 0, 0.175, 1] }, duration: 0.4 }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
