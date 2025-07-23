import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';

interface PortalProps {
  onEnter: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const Portal: React.FC<PortalProps> = ({ onEnter, isMusicPlaying, toggleMusic }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 via-pink-900/20 to-rose-800/40"></div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-white/20 animate-float
              ${i % 2 === 0 ? 'w-4 h-4' : 'w-6 h-6'}
              ${i === 0 ? 'top-1/4 left-1/4 animation-delay-0' : ''}
              ${i === 1 ? 'top-1/3 right-1/4 animation-delay-1000' : ''}
              ${i === 2 ? 'bottom-1/3 left-1/3 animation-delay-2000' : ''}
              ${i === 3 ? 'top-1/2 right-1/3 animation-delay-3000' : ''}
              ${i === 4 ? 'bottom-1/4 right-1/4 animation-delay-4000' : ''}
              ${i === 5 ? 'top-2/3 left-1/2 animation-delay-5000' : ''}
              ${i === 6 ? 'top-1/5 right-1/2 animation-delay-6000' : ''}
              ${i === 7 ? 'bottom-1/5 left-1/5 animation-delay-7000' : ''}
            `}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
        title={isMusicPlaying ? 'Arrêter la musique' : 'Jouer la musique'}
      >
        {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="mb-8">
          <div className="mb-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Heart className="w-12 h-12 text-white fill-current" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Audrey <span className="text-3xl md:text-5xl text-amber-300">&</span> Stéphane
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-white/50 w-16"></div>
            <Heart className="w-6 h-6 text-white fill-current" />
            <div className="h-px bg-white/50 w-16"></div>
          </div>
          
          <p className="text-2xl md:text-3xl text-white/90 font-light mb-4 drop-shadow-lg">
            💒 Nous nous marions !
          </p>
          
          <p className="text-xl text-white/80 mb-12 drop-shadow-lg">
            Samedi 16 août 2025 • Bingerville, Côte d'Ivoire
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={onEnter}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            ✨ Entrer sur le site ✨
          </button>
          
          <p className="text-white/70 text-sm">
            Cliquez pour découvrir tous les détails de notre mariage
          </p>
        </div>
      </div>

      <style jsx>{`
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
        .animation-delay-6000 { animation-delay: 6s; }
        .animation-delay-7000 { animation-delay: 7s; }
      `}</style>
    </div>
  );
};

export default Portal;