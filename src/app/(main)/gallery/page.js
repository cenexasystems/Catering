"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import { getGalleryImages } from '../../../lib/supabase';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './GalleryPage.module.css';

export default function FullGalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadData() {
      const data = await getGalleryImages();
      const photosOnly = (data || []).filter(item => {
        if (!item || !item.src) return false;
        const isVid = item.category === 'Video' || 
          item.src.endsWith('.mp4') || 
          item.src.endsWith('.webm') || 
          item.src.endsWith('.mov') || 
          item.src.startsWith('data:video');
        return !isVid;
      });
      setImages(photosOnly);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredImages = images;

  return (
    <div className={styles.pageWrap}>

      {/* Main Section under Header */}
      <main className={styles.mainContent}>

        {/* Back Link & Title */}
        <div className={styles.topBarRow}>
          <Link href="/" className={styles.backBtn}>
            {t('backToHome')}
          </Link>
          <span className={styles.itemCountBadge}>{images.length} {t('photosText')}</span>
        </div>

        <div className={styles.titleArea}>
          <span className={styles.preTitle}>{t('completePortfolio')}</span>
          <h1 className={styles.mainHeading}>{t('fullGallery')}</h1>
          <p className={styles.subHeading}>{t('exploreGallery')}</p>
        </div>



        {/* Compact Phone-Sized Cards Grid */}
        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>{t('loadingGallery') || 'Loading divine feast gallery...'}</p>
          </div>
        ) : (
          <motion.div className={styles.grid} layout>
            <AnimatePresence>
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: (index % 6) * 0.04 }}
                  className={styles.cardItem}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img.src} 
                    alt={`${img.title || 'Traditional South Indian Catering Feast'} - Sri Sankaraa Catering Services Chennai`} 
                    className={styles.cardImg} 
                    loading="lazy" 
                  />
                  
                  {/* Clean Hover Overlay with Zoom Icon */}
                  <div className={styles.overlay}>
                    <span className={styles.expandIcon}>🔍</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className={styles.closeBtn}>✕</button>
            <motion.div 
              className={styles.lightboxCard}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.src && (selectedImage.src.endsWith('.mp4') || selectedImage.src.endsWith('.webm') || selectedImage.src.endsWith('.mov') || selectedImage.src.startsWith('data:video')) ? (
                <video src={selectedImage.src} controls autoPlay playsInline className={styles.lightboxImg} />
              ) : (
                <img src={selectedImage.src} alt={selectedImage.title || 'Gallery Image'} className={styles.lightboxImg} />
              )}
              {selectedImage.title && !(/\.(mp4|webm|mov|png|jpg|jpeg|webp)$/i.test(selectedImage.title) || /^\d{5,}/.test(selectedImage.title) || /fps/i.test(selectedImage.title)) && (
                <div className={styles.lightboxMeta}>
                  <span className={styles.lightboxCat}>{selectedImage.category || 'Feast'}</span>
                  <h3 className={styles.lightboxTitle}>{selectedImage.title}</h3>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared Footer */}
      <Footer />

    </div>
  );
}
