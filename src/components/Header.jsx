"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import styles from './Header.module.css';

const TICKER_ITEMS = [
  '🍛 SOUTH INDIAN SADHYA',
  '💍 WEDDING CATERING',
  '🏢 CORPORATE EVENTS',
  '🎂 BIRTHDAY PARTIES',
  '🍲 LIVE COUNTERS',
  '🌿 FRESH EVERY DAY',
  '⭐ 4.9 RATED SERVICE',
];

export default function Header() {
  const { lang, toggleLanguage, t } = useLanguage();
  const { openBookingModal } = useBooking();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const getNavLink = (hash) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <div className={`${styles.headerWrapper} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Top Announcement Ticker */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item} <span className={styles.tickerDot}>·</span>
            </span>
          ))}
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <span className={lang === 'ta' ? 'tamilTitle' : ''}>{t('title')}</span>
            <span className={styles.logoDot}>.</span>
          </Link>
        </div>
        
        <button 
          className={styles.menuButton} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <Link href={getNavLink('#services')} className={styles.navLink} onClick={closeMenu}>{t('services')}</Link>
          <Link href={getNavLink('#gallery')} className={styles.navLink} onClick={closeMenu}>{t('gallery')}</Link>
          <Link href={getNavLink('#testimonials')} className={styles.navLink} onClick={closeMenu}>{t('testimonials')}</Link>
          <Link href={getNavLink('#contact')} className={styles.navLink} onClick={closeMenu}>{t('contact')}</Link>
          
          <div className={styles.actions}>
            <button className={styles.langToggle} onClick={toggleLanguage}>
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
            <button 
              className={styles.ctaButton} 
              onClick={() => {
                closeMenu();
                openBookingModal();
              }}
            >
              {t('bookNow')}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
