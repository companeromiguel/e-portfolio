'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function ResumePage() {
  const parallaxRef = useRef<HTMLDivElement>(null);

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

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 py-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>
      </div>

      {/* Resume Viewer */}
      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white/90 mb-8 text-center">
            Resume
          </h1>
          
          {/* Resume Image */}
          <div className="resume-container p-4 sm:p-6 bg-white/10">
            <div className="relative w-full">
              <Image
                src="/resume.png"
                alt="Miguel Compañero Resume"
                width={1200}
                height={1600}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mt-6">
            <a 
              href="/resume.png" 
              download="Miguel_Companero_Resume.png"
              className="glass-card px-8 py-4 text-base sm:text-lg text-white/90 hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
