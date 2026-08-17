"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getGalleryImages, getCustomerReviews, saveCustomerReview } from '../lib/supabase';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Plus, Play, Quote } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

const defaultVideoTestimonials = [
  { id: 'default-1', title: 'A Memorable Wedding', thumb: '/gallery/wedding_catering.png' },
  { id: 'default-2', title: 'Corporate Excellence', thumb: '/gallery/corporate_catering.png' },
  { id: 'default-3', title: 'Delightful Desserts', thumb: '/gallery/dessert_platter_1785684210041.png' },
  { id: 'default-4', title: 'Live Counter Magic', thumb: '/gallery/live_counter_1785684260521.png' },
  { id: 'default-5', title: 'Traditional Sadhya', thumb: '/gallery/south_indian_meals_1785684185063.png' },
  { id: 'default-6', title: 'Flawless Execution', thumb: '/gallery/buffet_setup_1785684198318.png' },
];

function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`${styles.starBtn} ${star <= value ? styles.starFilled : ''}`}
          onClick={() => onChange && onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState(defaultVideoTestimonials);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', event: '', text: '', rating: 5 });
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      const allData = await getGalleryImages();
      const customVideos = (allData || []).filter(item => {
        if (!item || !item.src) return false;
        return item.category === 'Video' || 
          item.src.endsWith('.mp4') || 
          item.src.endsWith('.webm') || 
          item.src.endsWith('.mov') || 
          item.src.startsWith('data:video');
      });
      if (customVideos.length > 0) {
        setVideos(customVideos.slice(0, 6));
      } else {
        setVideos(defaultVideoTestimonials);
      }

      const revData = await getCustomerReviews();
      setReviews(revData || []);
    }
    loadData();
  }, []);

  const duplicated = [...reviews, ...reviews];

  const handleManualScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    const saved = await saveCustomerReview(formData);
    setReviews(prev => [saved, ...prev]);
    setFormData({ name: '', event: '', text: '', rating: 5 });
    setShowForm(false);
  };

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>

        {/* ===== Customer Reviews Section ===== */}
        <div className={styles.reviewSection}>
          
          {/* Header Bar */}
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.ratingBadge}>
                <span className={styles.badgeStars}>★★★★★</span>
                <span className={styles.badgeText}>4.9 / 5.0 Rating • 500+ Grand Events</span>
              </div>
              <h2 className={styles.sectionTitle}>{t('testimonialsTitle') || 'Loved by Hosts Across Chennai'}</h2>
              <p className={styles.sectionSub}>
                Real reviews and heartfelt feedback from clients who trusted Sri Sankaraa Catering.
              </p>
            </div>

            <div className={styles.headerRight}>
              <div className={styles.navArrowBtns}>
                <button 
                  className={styles.arrowBtn} 
                  onClick={() => handleManualScroll('left')}
                  title="Previous Review"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className={styles.arrowBtn} 
                  onClick={() => handleManualScroll('right')}
                  title="Next Review"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <button className={styles.addReviewBtn} onClick={() => setShowForm(true)}>
                <Plus size={16} />
                <span>{t('writeReview') || 'Write a Review'}</span>
              </button>
            </div>
          </div>

          {/* Scrolling Reviews Track */}
          <div className={styles.carouselWrapper}>
            <div className={styles.carouselContainer} ref={scrollContainerRef}>
              <div className={styles.track}>
                {duplicated.map((item, index) => (
                  <motion.div 
                    key={`${item.id}-${index}`} 
                    className={styles.testimonialCard}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.cardTopRow}>
                      <div className={styles.cardStars}>
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <div className={styles.verifiedBadge}>
                        <CheckCircle2 size={13} color="#25d366" />
                        <span>Verified Host</span>
                      </div>
                    </div>

                    <p className={styles.testimonialText}>
                      &ldquo;{item.text}&rdquo;
                    </p>

                    <div className={styles.authorRow}>
                      <div className={styles.avatarCircle}>
                        {(item.name || 'C').charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.authorMeta}>
                        <h4 className={styles.authorName}>{item.name}</h4>
                        <span className={styles.authorEventTag}>{item.event || 'Catering Client'}</span>
                      </div>
                      <Quote className={styles.quoteIcon} size={28} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ===== Video Showcase Section ===== */}
        <div className={styles.videoSection}>
          <div className={styles.videoHeader}>
            <div>
              <span className={styles.preTitle}>{t('realStoriesTag') || 'LIVE CELEBRATIONS'}</span>
              <h3 className={styles.videoSectionTitle}>{t('videoShowcaseTitle') || 'Event Video Showcase'}</h3>
            </div>
            <p className={styles.videoSubText}>
              Watch live clips of our banana leaf sadhya feasts, buffet arrangements, and live cooking counters.
            </p>
          </div>

          <div className={styles.videoGrid}>
            {videos.map((v, i) => (
              <motion.div
                key={v.id || i}
                className={styles.reelCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => setSelectedVideo(v)}
              >
                <div className={styles.reelThumb}>
                  {v.src && (v.src.endsWith('.mp4') || v.src.endsWith('.webm') || v.src.endsWith('.mov') || v.src.startsWith('data:video')) ? (
                    <video src={v.src} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={v.thumb || v.src} alt={v.title || 'Catering Video Highlight'} loading="lazy" />
                  )}
                  <div className={styles.reelOverlay}>
                    <div className={styles.playBtn}>
                      <Play size={22} fill="white" color="white" />
                    </div>
                  </div>
                  <div className={styles.reelMeta}>
                    <h4 className={styles.reelTitle}>
                      {(!v.title || /\.(mp4|webm|mov|png|jpg|jpeg|webp)$/i.test(v.title) || /^\d{5,}/.test(v.title)) ? 'Event Highlight' : v.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ===== Write Review Modal ===== */}
      <AnimatePresence>
        {showForm && (
          <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
              
              <div className={styles.modalHeader}>
                <div className={styles.modalBadge}>
                  <Star size={14} color="#f59e0b" fill="#f59e0b" />
                  <span>SHARE YOUR FEEDBACK</span>
                </div>
                <h3 className={styles.modalTitle}>{t('writeReview') || 'Write a Review'}</h3>
                <p className={styles.modalDesc}>Share your catering experience with Sri Sankaraa Catering Services.</p>
              </div>
              
              <form className={styles.reviewModalForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Anand V."
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    required
                    className={styles.input}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Event Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Wedding Sadhya, Corporate Lunch, Birthday"
                    value={formData.event}
                    onChange={e => setFormData(p => ({ ...p, event: e.target.value }))}
                    className={styles.input}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Your Review *</label>
                  <textarea
                    placeholder="Describe the taste, service quality, and overall experience..."
                    rows={4}
                    value={formData.text}
                    onChange={e => setFormData(p => ({ ...p, text: e.target.value }))}
                    required
                    className={styles.textarea}
                  />
                </div>
                
                <div className={styles.ratingGroup}>
                  <label>Overall Rating</label>
                  <StarRating value={formData.rating} onChange={r => setFormData(p => ({ ...p, rating: r }))} />
                </div>
                
                <button type="submit" className={styles.submitBtn}>
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== Fullscreen Video Lightbox ===== */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className={styles.videoModalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <button className={styles.closeVideoBtn} onClick={() => setSelectedVideo(null)}>
              ✕
            </button>

            <motion.div
              className={styles.videoModalCard}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.videoContainer}>
                {selectedVideo.src && (selectedVideo.src.endsWith('.mp4') || selectedVideo.src.endsWith('.webm') || selectedVideo.src.endsWith('.mov') || selectedVideo.src.startsWith('data:video')) ? (
                  <video 
                    src={selectedVideo.src} 
                    controls 
                    autoPlay 
                    playsInline
                    className={styles.fullMedia} 
                  />
                ) : (
                  <img 
                    src={selectedVideo.thumb || selectedVideo.src} 
                    alt={selectedVideo.title || 'Video Showcase'} 
                    className={styles.fullMedia} 
                  />
                )}
              </div>

              <div className={styles.videoMetaBar}>
                <div>
                  <span className={styles.videoBadge}>Catering Reel Highlight</span>
                  <h3 className={styles.videoTitle}>
                    {(!selectedVideo.title || /\.(mp4|webm|mov|png|jpg|jpeg|webp)$/i.test(selectedVideo.title) || /^\d{5,}/.test(selectedVideo.title)) 
                      ? 'Sri Sankaraa Catering Event' 
                      : selectedVideo.title}
                  </h3>
                </div>
                <a 
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9962548644'}?text=${encodeURIComponent(`Hi, I saw your video showcase on the website and would like to inquire about booking!`)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.videoBookBtn}
                >
                  Book Similar Event
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
