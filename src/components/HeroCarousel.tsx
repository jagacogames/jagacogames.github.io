'use client';

import { useState, useEffect } from 'react';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: 'BLOKJE OM', color: '#4A90E2', image: '/images/hero/blokje-om.png', subtitle: 'TRAFFIC TRAINING GAME' },
    { title: 'ALPHA', color: '#E91E63', image: '/images/hero/alpha.png', subtitle: 'SECURITY AWARENESS SIMULATION' },
    { title: 'UNGOVERNED LANDS', color: '#7FBA00', image: '/images/hero/ungoverned-lands.png', subtitle: 'REAL-TIME STRATEGY' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}

      {/* Bottom Overlay Bar - Dark gradient for better text contrast */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 via-black/30 to-transparent z-10"></div>

      {/* Game Title Overlay - Positioned lower like in the design */}
      <div className="absolute bottom-16 left-4 md:left-12 z-20 max-w-2xl">
        <h1 className="text-[48px] md:text-[72px] lg:text-[90px] font-bold text-white drop-shadow-2xl leading-none mb-3 animate-fade-in-up tracking-tight">
          {slides[currentSlide].title}
        </h1>
        {/* Red subtitle bar - matching the design */}
        <div className="bg-[#E91E63] inline-block px-6 py-2 animate-fade-in-up stagger-1">
          <p className="text-[16px] md:text-[20px] text-white uppercase leading-tight font-medium tracking-wide">
            {slides[currentSlide].subtitle}
          </p>
        </div>
      </div>

      {/* Carousel Dots - Positioned at bottom center */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Social Icons - Bottom left, smaller and closer to edge */}
      <div className="absolute bottom-6 left-4 md:left-8 flex gap-3 z-20">
        <a href="https://www.linkedin.com/company/jagaco" className="text-white hover:text-[#FDB614] transition-colors" aria-label="LinkedIn">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a href="https://www.facebook.com/jagacogames" className="text-white hover:text-[#FDB614] transition-colors" aria-label="Facebook">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a href="https://twitter.com/JagacoGames" className="text-white hover:text-[#FDB614] transition-colors" aria-label="Twitter">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
      </div>
    </section>
  );
}
