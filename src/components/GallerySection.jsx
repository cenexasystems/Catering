"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getGalleryImages } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import styles from './GallerySection.module.css';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
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

  // Display initial 4 phone-sized compact images
  const displayImages = images.slice(0, 4);

  return (
    <section id="gallery" className={styles.gallerySection}>
      <div className={styles.container}>

        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.preTitle}>{t('portfolioTag')}</span>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('galleryHeading')}
          </motion.h2>
          <p className={styles.sectionDesc}>{t('gallerySubText')}</p>
        </div>

        {/* Compact Phone-Sized Cards Grid (No text on top of images) */}
        {loading ? (
          <p className={styles.loadingText}>{t('loadingGallery')}</p>
        ) : (
          <div className={styles.grid}>
            {displayImages.map((img, index) => (
              <motion.div
                key={img.id || index}
                className={styles.gridItem}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img.src} 
                  alt={`${img.title || 'South Indian Catering Feast'} - Sri Sankaraa Catering Services Chennai`} 
                  loading="lazy" 
                  className={styles.image} 
                />
                
                {/* Clean Hover Overlay with Zoom Icon */}
                <div className={styles.overlay}>
                  <span className={styles.expandIcon}>🔍</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Open Full Gallery Page Button */}
        <div className={styles.btnWrapper}>
          <Link href="/gallery" scroll={true} className={styles.openFullGalleryBtn}>
            <span>{t('viewFullGallery')} ({images.length > 0 ? images.length : '20+'} {t('photosText')})</span>
            <span className={styles.btnArrow}>→</span>
          </Link>
        </div>

      </div>

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
            <button className={styles.closeLightbox}>✕</button>
            <motion.div 
              className={styles.lightboxCard}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.src && (selectedImage.src.endsWith('.mp4') || selectedImage.src.endsWith('.webm') || selectedImage.src.endsWith('.mov') || selectedImage.src.startsWith('data:video')) ? (
                <video src={selectedImage.src} controls autoPlay playsInline className={styles.lightboxImage} />
              ) : (
                <img src={selectedImage.src} alt={selectedImage.title || 'Gallery Image'} className={styles.lightboxImage} />
              )}
              {selectedImage.title && !(/\.(mp4|webm|mov|png|jpg|jpeg|webp)$/i.test(selectedImage.title) || /^\d{5,}/.test(selectedImage.title) || /fps/i.test(selectedImage.title)) && (
                <div className={styles.lightboxMeta}>
                  <span className={styles.lightboxTag}>{selectedImage.category || 'Feast'}</span>
                  <h3 className={styles.lightboxTitle}>{selectedImage.title}</h3>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
