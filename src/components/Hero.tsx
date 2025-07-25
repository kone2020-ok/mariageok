import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';

interface HeroProps {
  onNavigateToRSVP: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToRSVP }) => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/IMAGE (2).JPG')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta-900/20 via-terracotta-800/10 to-terracotta-700/30"></div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-white/30 animate-float opacity-60
              ${i % 2 === 0 ? 'w-4 h-4' : 'w-6 h-6'}
              ${i === 0 ? 'top-1/4 left-1/4 animation-delay-0' : ''}
              ${i === 1 ? 'top-1/3 right-1/4 animation-delay-1000' : ''}
              ${i === 2 ? 'bottom-1/3 left-1/3 animation-delay-2000' : ''}
              ${i === 3 ? 'top-1/2 right-1/3 animation-delay-3000' : ''}
              ${i === 4 ? 'bottom-1/4 right-1/4 animation-delay-4000' : ''}
              ${i === 5 ? 'top-2/3 left-1/2 animation-delay-5000' : ''}
            `}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main title */}
        <div className="mb-6 sm:mb-8">
          <h1 id="home-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
            Audrey <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-amber-300">&</span> Stéphane
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-white/50 w-8 sm:w-12 lg:w-16"></div>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white fill-current" />
            <div className="h-px bg-white/50 w-8 sm:w-12 lg:w-16"></div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-light drop-shadow-lg">
            💒 Nous nous marions !
          </p>
        </div>

        {/* Date */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-base sm:text-lg font-semibold text-white drop-shadow-lg">Samedi 16 août 2025</span>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
            <span className="text-sm sm:text-base text-white/80 drop-shadow-lg">Bingerville, Côte d'Ivoire</span>
          </div>
        </div>



        {/* CTA Button */}
        <button
          onClick={onNavigateToRSVP}
          className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          🎉 Je participe !
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-5000 { animation-delay: 5s; }
      `}</style>
    </section>
  );
};

export default Hero;