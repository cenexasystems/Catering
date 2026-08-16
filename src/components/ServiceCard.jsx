"use client";

import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, onOpenDetails, t }) {
  return (
    <div className={styles.card} onClick={onOpenDetails}>
      <div className={styles.imageWrapper}>
        <img 
          src={service.image} 
          alt={service.imageAlt || `${service.title} - Sri Sankaraa Catering Services Chennai`} 
          className={styles.cardImage} 
          loading="lazy"
        />
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        
        <button 
          type="button" 
          className={styles.viewBtn} 
          onClick={(e) => { 
            e.stopPropagation(); 
            onOpenDetails(); 
          }}
        >
          <span>Explore Catering Menu</span>
          <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
