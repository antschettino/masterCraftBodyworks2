import React, { useState, useEffect } from 'react';

const Header = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo">
          <img 
            src="https://www.mastercraftbodyworks.co.uk/static/media/MasterCraftwhite.13454544.png" 
            alt="Mastercraft Bodyworks" 
            className="logo-img"
          />
        </div>
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {['hero', 'about', 'services', 'contact'].map((id) => (
            <button key={id} className={`nav-link ${activeSection === id ? 'active' : ''}`} onClick={() => scrollTo(id)}>
              {id === 'hero' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>
        <button 
          className={`menu-toggle ${mobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <img 
        className="hero-image" 
        src="/hero-bg.jpg"
        alt="Porsche Carrera in workshop"
      />
      <div className="hero-overlay"/>
      <div className="hero-bg">
        <div className="hero-accent-line"/>
      </div>
      <div className="hero-content">
        <div className="hero-badge">ESTABLISHED 2020</div>
        <h1 className="hero-title">
          <span className="hero-title-main">Precision in Every Detail</span>
        </h1>
        <p className="hero-description">
          Where traditional craftsmanship meets modern precision. We restore, repair, and perfect vehicles with uncompromising attention to detail.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Enquire Now</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className="btn btn-secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Our Services</button>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line"/>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { value: '15', suffix: '+', label: 'Years Experience' },
    { type: 'rating', value: '5.0', stars: 5, label: 'Google Rating' }
  ];
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-image">
          <div className="about-image-frame">
            <img src="/gallery/DSC_1899.jpg" alt="MasterCraft Bodyworks" />
          </div>
          <div className="about-image-label">Since 2020</div>
        </div>
        <div className="about-content">
          <div className="section-label">About Us</div>
          <h2 className="about-title">Craftsmanship <span className="text-accent">Perfected</span></h2>
          <p className="about-text">
            Founded with a philosophy inspired by Japanese craftsmanship, Mastercraft Bodyworks delivers uncompromising quality in automotive restoration. Our master technicians combine time-honoured techniques with cutting-edge technology.
          </p>
          <p className="about-text">
            From precision dent repairs to complete collision restoration, every vehicle receives the same meticulous attention to detail. Our commitment to excellence has made us the trusted choice for discerning car owners.
          </p>
          <div className="about-stats">
            {stats.map((s, i) => (
              <div key={i} className="stat">
                {s.type === 'rating' ? (
                  <>
                    <span className="stat-value">{s.value}</span>
                    <div className="stat-stars">
                      {[...Array(s.stars)].map((_, j) => (
                        <svg key={j} viewBox="0 0 24 24" fill="currentColor" className="star-icon">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="stat-label">{s.label}</span>
                  </>
                ) : (
                  <>
                    <span className="stat-value">{s.value}<span>{s.suffix}</span></span>
                    <span className="stat-label">{s.label}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    { src: '/gallery/IMG_7502.jpeg', alt: 'Jaguar E-Type in paint booth' },
    { src: '/gallery/IMG_7185.jpeg', alt: 'Car preparation for paint' },
    { src: '/gallery/IMG_7110.jpeg', alt: 'Detailing products' },
    { src: '/gallery/IMG_7068.jpeg', alt: 'Metal panel work' },
    { src: '/gallery/IMG_6826.jpeg', alt: 'Custom wheel and bodywork' },
    { src: '/gallery/minorScratches.jpg', alt: 'Paint finish work' },
  ];

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-close" onClick={onClose}>×</button>
        <button className="gallery-nav gallery-prev" onClick={prevImage}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="gallery-image-container">
          <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
        </div>
        <button className="gallery-nav gallery-next" onClick={nextImage}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <div className="gallery-dots">
          {images.map((_, i) => (
            <button key={i} className={`gallery-dot ${i === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(i)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const services = [
    { image: '/gallery/IMG_7185.jpeg', title: 'Collision Repair', description: 'Complete restoration of collision damage using advanced techniques and manufacturer-approved parts and methods.', features: ['Minor Scuffs', 'Panel dings', 'Structural repairs'] },
    { image: '/gallery/DSC_1687.jpg', title: 'Paint Services', description: 'From spot repairs to complete resprays, our climate-controlled booth ensures factory-quality finishes.', features: ['Colour matching', 'Custom finishes'] },    
    { image: '/gallery/IMG_7110.jpeg', title: 'Detailing', description: 'Professional detailing and Ceramic Coating to protect and enhance your vehicle\'s appearance.', features: ['Paint correction', 'Ceramic coating', 'Protection film'] },
    { image: '/gallery/IMG_6826.jpg', title: 'Wheel Refurbishing', description: 'Expert restoration of damaged alloy wheels to factory-fresh condition, from kerb damage to full refinishing', features: ['Kerb damage', 'Custom finishes'] },
    { image: '/gallery/DSC_1674.jpg', title: 'Fabrication Work', description: 'Metalwork and fabrication for custom builds, classic restorations, and unique modifications.', features: ['Rust repair', 'Chassis work', 'Panel Replacement'] },
    { image: '/gallery/IMG_7502.jpeg', title: 'Custom Restorations', description: 'Bespoke restoration services crafted to your exact specifications.', features: ['Restorations', 'Modifications'], }
  ];
  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="section-header">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Our <span className="text-accent">Services</span></h2>
          <p className="section-subtitle">Comprehensive automotive body services delivered with precision and care</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-image">
                <img src={s.image} alt={s.title} />
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-description">{s.description}</p>
              <ul className="service-features">{s.features.map((f, j) => (<li key={j}>{f}</li>))}</ul>
            </div>
          ))}
        </div>
        <div className="services-cta">
          <button className="btn btn-primary" onClick={() => setGalleryOpen(true)}>
            <span>See Examples of Our Work</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          </button>
        </div>
        <Gallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const data = new FormData();
    data.append('access_key', '7f367e6b-e64e-4df7-8e9b-e52134e86b07');
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('message', formData.message);
    data.append('subject', 'New enquiry from Mastercraft Bodyworks website');
    
    files.forEach((file, index) => {
      data.append(`attachment_${index + 1}`, file);
    });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setFiles([]);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isUnderLimit = file.size <= 5 * 1024 * 1024;
      return isImage && isUnderLimit;
    });
    setFiles(validFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Contact <span className="text-accent">Us</span></h2>
          <p className="section-subtitle">Ready to restore your vehicle to perfection? Get in touch for a free consultation</p>
        </div>
        <div className="contact-grid">
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="form-success">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="32" cy="32" r="28"/><path d="M20 32L28 40L44 24"/></svg>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}><span>Send Another</span></button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="7f367e6b-e64e-4df7-8e9b-e52134e86b07" />
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  <div className="form-line"/>
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                  <div className="form-line"/>
                </div>
                <div className="form-group">
                  <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                  <div className="form-line"/>
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Tell us about your vehicle..." rows="4" value={formData.message} onChange={handleChange} required />
                  <div className="form-line"/>
                </div>
                <div className="form-group file-upload-group">
                  <label className="file-upload-label">
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} className="file-input" />
                    <div className="file-upload-content">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span>Upload images of your vehicle (optional)</span>
                      <small>Max 5MB per image</small>
                    </div>
                  </label>
                  {files.length > 0 && (
                    <div className="file-preview">
                      {files.map((file, index) => (
                        <div key={index} className="file-item">
                          <span>{file.name}</span>
                          <button type="button" onClick={() => removeFile(index)} className="file-remove">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {error && <div className="form-error">{error}</div>}
                <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"/></svg>}
                </button>
              </form>
            )}
          </div>
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="info-content"><h4>Visit Us</h4><p>Unit 8, Enstone Airfield North<br/>Banbury Road, Enstone<br/>Chipping Norton, OX7 4NS</p></div>
            </div>
            <div className="info-card">
              <div className="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
              <div className="info-content"><h4>Call Us</h4><p>07961 916558</p></div>
            </div>
            <div className="info-card">
              <div className="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
              <div className="info-content"><h4>Opening Hours</h4><p>Mon - Fri: 8:30am - 5:30pm<br/>Sat - Sun: Closed</p></div>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2460.067934080136!2d-1.4401426381177276!3d51.932714413967936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876d72cebfdc145%3A0x1e3e7465098674c9!2sMASTERCRAFT%20BODYWORKS%20LTD!5e0!3m2!1sen!2suk!4v1692048062564!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mastercraft Bodyworks Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <div className="logo">
          <img 
            src="https://www.mastercraftbodyworks.co.uk/static/media/MasterCraftwhite.13454544.png" 
            alt="Mastercraft Bodyworks" 
            className="logo-img"
          />
        </div>
        <p>Excellence in automotive bodywork since 2020. Precision, quality, and craftsmanship in every project.</p>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>Quick Links</h4>
          <a onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>Home</a>
          <a onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About</a>
          <a onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Services</a>
          <a onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</a>
        </div>
        <div className="footer-column">
          <h4>Services</h4>
          <a onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Collision Repair</a>
          <a onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Paint Services</a>
          <a onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Detailing</a>
          <a onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Wheel Refurbishing</a>
          <a onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Fabrication Work</a>
          <a onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Custom Restorations</a>
        </div>
      </div>
      <div className="footer-social">
        <a aria-label="Instagram" href="https://www.instagram.com/mastercraftbw/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
      </div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} MasterCraft Bodyworks. All rights reserved.</p></div>
  </footer>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { threshold: 0.3 });
    ['hero', 'about', 'services', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
