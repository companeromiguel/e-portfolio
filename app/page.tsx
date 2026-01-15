'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const [baseRotationY, setBaseRotationY] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const lastMouseX = useRef<number | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Continuous sliding animation - slower and smoother
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 200) return 0; // Reset after sliding completely off
        return prev + 0.5; // Slower increment for smoother movement
      });
    }, 30); // Slower interval

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Force video to play
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err);
      });
    }
  }, []);

  useEffect(() => {
    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFrozen) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerY = rect.height / 2;
    
    // Tilt effect based on vertical position - reduced sensitivity
    const rotateX = ((y - centerY) / centerY) * -8;
    
    // Accumulate rotation based on mouse movement - increased sensitivity for easier rotation
    if (lastMouseX.current !== null) {
      const deltaX = x - lastMouseX.current;
      const rotationChange = deltaX * 1.5; // Increased from 0.6 to 1.5
      setBaseRotationY(prev => prev + rotationChange);
    }
    
    lastMouseX.current = x;
    setCardRotation({ x: rotateX, y: 0 });
  };

  const handleCardMouseLeave = () => {
    if (isFrozen) return;
    lastMouseX.current = null;
    setCardRotation({ x: 0, y: 0 });
  };

  const handleCardTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFrozen) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const centerY = rect.height / 2;
    
    // Tilt effect based on vertical position - reduced sensitivity
    const rotateX = ((y - centerY) / centerY) * -8;
    
    // Accumulate rotation based on touch movement - increased sensitivity for easier rotation
    if (lastMouseX.current !== null) {
      const deltaX = x - lastMouseX.current;
      const rotationChange = deltaX * 1.5; // Increased from 0.6 to 1.5
      setBaseRotationY(prev => prev + rotationChange);
    }
    
    lastMouseX.current = x;
    setCardRotation({ x: rotateX, y: 0 });
  };

  const handleCardTouchEnd = () => {
    if (isFrozen) return;
    lastMouseX.current = null;
    setCardRotation({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    setIsFrozen(!isFrozen);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div 
        ref={parallaxRef}
        className="fixed inset-0 -z-10 bg-gradient-mesh"
        style={{
          willChange: 'transform',
        }}
      >
        {/* Floating Elements */}
        <div className="floating-element" />
        <div className="floating-element" />
        <div className="floating-element" />
        <div className="floating-element" />
        <div className="floating-element" />
      </div>

      {/* Content Sections */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-start lg:items-start justify-between gap-2 lg:gap-4 px-4 sm:px-6 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-12">
        <div className="max-w-4xl text-left flex flex-col items-start gap-0">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/90 tracking-tight leading-none whitespace-nowrap"
            style={{
              textShadow: '2px 4px 8px rgba(0, 0, 0, 0.6), 4px 8px 16px rgba(0, 0, 0, 0.4), 6px 12px 24px rgba(0, 0, 0, 0.3)'
            }}
          >
            Miguel Compañero
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300/80 font-light leading-none mt-6"
            style={{
              textShadow: '2px 3px 6px rgba(0, 0, 0, 0.5), 3px 6px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            Web Developer & Designer
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-400/70 max-w-xl leading-relaxed mt-4 mb-8">
            BS Information Technology student at Cavite State University. 
            Specializing in web development, database management, and UI/UX design.
          </p>

          {/* About and Skills inline */}
          <div className="w-full max-w-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="glass-card p-5 sm:p-6 space-y-2 sm:space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white/90">About</h2>
                <p className="text-sm sm:text-base text-slate-300/70 leading-relaxed">
                  Dean's Lister at Cavite State University pursuing BS Information Technology. 
                  Experienced in building web-based systems, prototyping healthcare apps, and leading development teams.
                </p>
              </div>
              <div className="glass-card p-5 sm:p-6 space-y-2 sm:space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white/90">Skills</h2>
                <ul className="text-sm sm:text-base text-slate-300/70 space-y-1.5">
                  <li>• Web Development (HTML, CSS, JavaScript, PHP)</li>
                  <li>• Database Management (MySQL, SQL)</li>
                  <li>• UI/UX Design (Figma, Adobe XD)</li>
                  <li>• Adobe Creative Suite & Video Editing</li>
                </ul>
              </div>
            </div>
            
            {/* Resume Button */}
            <Link 
              href="/resume"
              className="glass-card px-8 py-4 text-base sm:text-lg text-white/90 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Resume
            </Link>
          </div>
        </div>

        {/* Interactive 3D Card */}
        <div 
          ref={cardRef}
          className="card-3d relative w-full max-w-[400px] h-[480px] sm:w-[450px] sm:h-[540px] lg:w-[500px] lg:h-[600px] perspective-1000 cursor-pointer mx-auto lg:mx-0"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          onTouchMove={handleCardTouchMove}
          onTouchEnd={handleCardTouchEnd}
          onClick={handleCardClick}
          style={{
            perspective: '1000px',
          }}
        >
          <div
            className="w-full h-full relative transition-all duration-500 ease-out"
            style={{
              transform: `rotateX(${cardRotation.x}deg) rotateY(${baseRotationY + cardRotation.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Card Front */}
            <div 
              className="absolute inset-0 glass-card overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.1) inset',
              }}
            >
              <div className="w-full h-full relative overflow-hidden">
                <Image 
                  src="/portfolio.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              {/* Shine effect */}
              <div 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(${cardRotation.y * 0.5 + 45}deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Card Back */}
            <div 
              className="absolute inset-0 glass-card overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.1) inset',
              }}
            >
              {/* Video Background */}
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                onLoadedData={(e) => {
                  const video = e.currentTarget;
                  video.play().catch(err => console.log('Play failed:', err));
                }}
              >
                <source src="/vidvid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Shine effect */}
              <div 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(${cardRotation.y * 0.5 + 225}deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="max-w-6xl w-full" id="projects" data-animate>
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-12"></div>
          
          <div className={`space-y-8 sm:space-y-12 transition-all duration-1000 ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white/90 text-center">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div 
              className="glass-card p-5 sm:p-6 space-y-3 sm:space-y-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setShowVideoModal(true)}
            >
              <div className="aspect-video bg-slate-800/50 rounded-lg flex items-center justify-center overflow-hidden relative">
                <Image 
                  src="/v3611.png"
                  alt="v361 Health Companion"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white/90">v361 Health Companion</h3>
              <p className="text-sm sm:text-base text-slate-300/60">Healthcare tracking mobile app prototype designed with Adobe XD & Figma. Led team development.</p>
            </div>
            <a 
              href="https://vcm-cavite.online/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-5 sm:p-6 space-y-3 sm:space-y-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="aspect-video bg-slate-800/50 rounded-lg flex items-center justify-center overflow-hidden relative">
                <Image 
                  src="/vcm.png"
                  alt="VCM HRIS System"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white/90">HRIS System</h3>
              <p className="text-sm sm:text-base text-slate-300/60">Web-based HR system for Victorious Christian Montessori using PHP & SQL. Capstone project.</p>
            </a>
            <a 
              href="https://www.figma.com/proto/TilqjD1yKkhB9dgmREhmyB/Inventory-Management-Dashboard--Community-?node-id=433-129&t=5S14dDrlkFQ7cn2b-1"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 sm:p-6 space-y-3 sm:space-y-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="aspect-video bg-slate-800/50 rounded-lg flex items-center justify-center overflow-hidden relative">
                <Image 
                  src="/takipsilim.png"
                  alt="Takipsilim Inventory System"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white/90">Takipsilim Inventory System</h3>
              <p className="text-sm sm:text-base text-slate-300/60">Inventory management system for a coffee shop and food store. Streamlines stock tracking and sales.</p>
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900/90 rounded-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold text-white/90 mb-4">v361 Health Companion Demo</h3>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                controls 
                autoPlay
                className="w-full h-full"
              >
                <source src="/v361-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      <section className="relative min-h-[50vh] flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="max-w-2xl text-center space-y-4 sm:space-y-6" id="contact" data-animate>
          <div className={`transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white/90">Get in Touch</h2>
            <p className="text-lg sm:text-xl text-slate-300/70">Let's collaborate on your next project.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="mailto:companeromiguel5@gmail.com" className="glass-card px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-white/90 hover:bg-white/10 transition-all duration-300">
                Email Me
              </a>
              <a href="https://www.linkedin.com/in/companero-migs-23469vc" target="_blank" rel="noopener noreferrer" className="glass-card px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-white/90 hover:bg-white/10 transition-all duration-300">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400/70 text-sm">
              © {new Date().getFullYear()} Miguel Compañero. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a 
                href="https://github.com/companeromiguel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400/70 hover:text-white/90 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/companero-migs-23469vc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400/70 hover:text-white/90 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
