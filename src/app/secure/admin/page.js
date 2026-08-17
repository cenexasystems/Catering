"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import { 
  getGalleryImages, 
  saveGalleryImage, 
  deleteGalleryImage, 
  getCustomerReviews,
  deleteCustomerReview,
  uploadFileToSupabase,
  isSupabaseConfigured 
} from '../../../lib/supabase';
import styles from './Admin.module.css';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('photos'); // 'photos', 'videos', 'reviews', 'all'

  // Upload progress state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  // Check existing session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      loadImages();
    }
  }, []);

  const loadImages = async () => {
    setLoading(true);
    const data = await getGalleryImages();
    const revs = await getCustomerReviews();
    setImages(data || []);
    setReviews(revs || []);
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    if (passwordInput === envPassword) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
      loadImages();
    } else {
      setLoginError('Incorrect Admin Password. Please check .env.local');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to remove this item?')) {
      await deleteGalleryImage(id);
      loadImages();
    }
  };

  const handleDeleteReview = async (id) => {
    if (confirm('Are you sure you want to delete this customer review?')) {
      await deleteCustomerReview(id);
      loadImages();
    }
  };

  // Upload file (Image or Video) with distinct size limits
  const handleFileUpload = async (e, category = 'General') => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;  // 10 MB limit for Photos
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB limit for Videos

    const isVideo = category === 'Video' || file.type.startsWith('video/');

    // Check size limit according to file type
    if (isVideo && file.size > MAX_VIDEO_SIZE) {
      alert(`Video size exceeds the maximum limit of 100MB (Selected: ${(file.size / (1024 * 1024)).toFixed(1)}MB). Please select a video under 100MB.`);
      return;
    }

    if (!isVideo && file.size > MAX_IMAGE_SIZE) {
      alert(`Image size exceeds the maximum limit of 10MB (Selected: ${(file.size / (1024 * 1024)).toFixed(1)}MB). Please select an image under 10MB.`);
      return;
    }

    setIsUploading(true);
    setUploadMsg(`Uploading ${isVideo ? 'Video Reel' : 'Image'} (${(file.size / (1024 * 1024)).toFixed(1)} MB)... Please wait.`);

    try {
      let fileUrl = '';

      if (isSupabaseConfigured) {
        // Direct upload to Supabase Storage Bucket ('gallery')
        fileUrl = await uploadFileToSupabase(file, 'gallery');
      } else {
        // Local fallback via Base64 Data URL (warn if large)
        if (file.size > 4000000) {
          alert('Local storage mode fallback supports files under 4MB. To upload larger images & videos, please configure your Supabase URL & Key in .env.local.');
          return;
        }

        fileUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      const finalCategory = isVideo ? 'Video' : category;

      // Format clean title and remove raw camera/code filenames
      let cleanTitle = file.name.replace(/\.(mp4|webm|mov|png|jpg|jpeg|gif|webp)$/i, '');
      if (/^\d{5,}/.test(cleanTitle) || /fps/i.test(cleanTitle) || /^[\d_a-z-]+$/i.test(cleanTitle)) {
        cleanTitle = isVideo ? 'Catering Reel Highlight' : 'Sri Sankaraa Event';
      }

      const newImg = { title: cleanTitle, category: finalCategory, src: fileUrl };
      await saveGalleryImage(newImg);
      await loadImages();
    } catch (err) {
      console.error('File upload failed:', err);
      alert(`Upload failed: ${err.message || 'Check bucket permissions in Supabase dashboard'}`);
    } finally {
      setIsUploading(false);
      setUploadMsg('');
      e.target.value = '';
    }
  };

  // 1. Password Login View
  if (!isAuthenticated) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div className={styles.lockHeader}>
            <span className={styles.lockIcon}>🔐</span>
            <h1 className={styles.loginTitle}>Admin Portal</h1>
            <p className={styles.loginSubtitle}>Sri Sankaraa Catering Services Management</p>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Enter Admin Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Password (default: admin123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeToggleBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loginError && <p className={styles.errorText}>{loginError}</p>}

            <button type="submit" className={styles.loginBtn}>
              Unlock Dashboard →
            </button>
          </form>

          <div className={styles.loginFooter}>
            <Link href="/" className={styles.backHome}>← Back to Catering Website</Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter items
  const galleryItems = images.filter(img => img.category !== 'Video');
  const videoItems = images.filter(img => img.category === 'Video');

  // Fill up to 20 slots for gallery
  const gallerySlots = Array.from({ length: 20 }, (_, i) => galleryItems[i] || null);
  
  // Fill up to 6 slots for video
  const videoSlots = Array.from({ length: 6 }, (_, i) => videoItems[i] || null);

  return (
    <div className={styles.adminWrap}>
      {/* Header Bar */}
      <header className={styles.adminHeader}>
        <div className={styles.brandGroup}>
          <h1 className={styles.brandTitle}>Sri Sankaraa Catering Services Admin</h1>
          <span className={styles.badge}>
            {isSupabaseConfigured ? '🟢 Supabase Active' : '🟡 Local Storage Sync'}
          </span>
        </div>

        {/* Navbar Navigation Tabs */}
        <nav className={styles.adminNavTabs}>
          <button 
            type="button"
            className={`${styles.navTab} ${activeTab === 'photos' ? styles.activeNavTab : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            <span>Photo Gallery</span>
            <span className={styles.tabBadge}>{galleryItems.length}</span>
          </button>

          <button 
            type="button"
            className={`${styles.navTab} ${activeTab === 'videos' ? styles.activeNavTab : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <span>Video Showcase</span>
            <span className={styles.tabBadge}>{videoItems.length}</span>
          </button>

          <button 
            type="button"
            className={`${styles.navTab} ${activeTab === 'reviews' ? styles.activeNavTab : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <span>Reviews</span>
            <span className={styles.tabBadge}>{reviews.length}</span>
          </button>
        </nav>

        <div className={styles.navActions}>
          <Link href="/gallery" className={styles.previewBtn} target="_blank">
            View Live Gallery
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <main className={styles.mainContainer}>

        {/* Live Gallery Editor Section */}
        {activeTab === 'photos' && (
          <div className={styles.managerSection}>
            <div className={styles.sectionHeaderWrap}>
              <div className={styles.sectionIconWrap} style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <div>
                <h2 className={styles.sectionHeading}>Live Gallery Editor</h2>
                <p className={styles.sectionSub}>This layout matches the homepage portfolio grid exactly. Upload any photo directly onto a slot to update it in real-time on the live site!</p>
              </div>
            </div>

            <div className={styles.slotsCard}>
              <h3 className={styles.slotsLabel}>GALLERY SLOTS (1 - 20)</h3>
              <div className={styles.slotsGrid}>
                {gallerySlots.map((item, index) => (
                  <div key={item?.id || `empty-${index}`} className={styles.slotBox}>
                    <div className={styles.slotHeader}>
                      <span className={styles.slotName}>Slot {index + 1}</span>
                      {item && <span className={styles.slotActive}>ACTIVE</span>}
                    </div>
                    
                    {item ? (
                      <div className={styles.slotFilled}>
                        <img src={item.src} alt={item.title} className={styles.slotImg} />
                        <div className={styles.slotOverlay}>
                          <button onClick={() => handleDelete(item.id)} className={styles.slotDeleteBtn}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className={styles.slotEmpty}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className={styles.hiddenFileInput} 
                          onChange={(e) => handleFileUpload(e, 'Sadhya')}
                        />
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2" className={styles.uploadIcon}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span className={styles.uploadText}>Drag photo here</span>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Video Showcase Manager Section */}
        {activeTab === 'videos' && (
          <div className={styles.managerSection}>
            <div className={styles.sectionHeaderWrap}>
              <div className={styles.sectionIconWrap} style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>
              </div>
              <div>
                <h2 className={styles.sectionHeading}>Video Showcase Manager</h2>
                <p className={styles.sectionSub}>Upload up to 6 videos to be displayed in the horizontal showcase section. Use vertical/portrait (9:16) videos for best results!</p>
              </div>
            </div>

            <div className={styles.slotsCard}>
              <div className={styles.videoSlotsGrid}>
                {videoSlots.map((item, index) => (
                  <div key={item?.id || `empty-vid-${index}`} className={styles.videoSlotBox}>
                    <div className={styles.slotHeader}>
                      <span className={styles.slotName}>Video {index + 1}</span>
                      {item && <span className={styles.slotActive}>ACTIVE</span>}
                    </div>
                    
                    {item ? (
                      <div className={styles.slotFilled}>
                        <video src={item.src} className={styles.slotImg} muted loop autoPlay playsInline />
                        <div className={styles.slotOverlay}>
                          <button onClick={() => handleDelete(item.id)} className={styles.slotDeleteBtn}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className={styles.slotEmpty}>
                        <input 
                          type="file" 
                          accept="video/*" 
                          className={styles.hiddenFileInput} 
                          onChange={(e) => handleFileUpload(e, 'Video')}
                        />
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className={styles.uploadIcon}>
                          <polygon points="23 7 16 12 23 17 23 7"></polygon>
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                        <span className={styles.uploadText} style={{ color: '#9ca3af' }}>Upload Video</span>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customer Reviews Moderation Section */}
        {activeTab === 'reviews' && (
          <div className={styles.managerSection}>
            <div className={styles.sectionHeaderWrap}>
              <div className={styles.sectionIconWrap} style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <div>
                <h2 className={styles.sectionHeading}>Customer Reviews Moderation</h2>
                <p className={styles.sectionSub}>View and moderate live reviews submitted by customers on the website.</p>
              </div>
            </div>

            <div className={styles.slotsCard}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {reviews.map((rev) => (
                  <div key={rev.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '700', color: '#1e293b' }}>{rev.name}</span>
                      <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>{'★'.repeat(rev.rating || 5)}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem', fontWeight: '600' }}>{rev.event || 'Special Event'}</div>
                    <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: '1.5', marginBottom: '1rem' }}>"{rev.text}"</p>
                    <button 
                      onClick={() => handleDeleteReview(rev.id)} 
                      style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Delete Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Uploading Progress Spinner Modal */}
        {isUploading && (
          <div className={styles.uploadOverlay}>
            <div className={styles.uploadCard}>
              <div className={styles.spinner} />
              <h3 className={styles.uploadTitle}>Uploading File...</h3>
              <p className={styles.uploadSub}>{uploadMsg}</p>
            </div>
          </div>
        )}

      </main>
      <Footer isAdmin={true} />
    </div>
  );
}
