import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import PortalAudioPlayer from './PortalAudioPlayer';

interface PortalProps {
  onEnter: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const Portal: React.FC<PortalProps> = ({ onEnter, isMusicPlaying, toggleMusic }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [portalMusicPlaying, setPortalMusicPlaying] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePortalMusicToggle = () => {
    console.log('Portal music toggle:', !portalMusicPlaying);
    setPortalMusicPlaying(!portalMusicPlaying);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/IMAGE (1).JPG')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta-900/30 via-terracotta-800/20 to-terracotta-700/40"></div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-white/20 animate-float
              ${i % 2 === 0 ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-4 h-4 sm:w-6 sm:h-6'}
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

      {/* Portal Audio Player */}
      <PortalAudioPlayer
        isPlaying={portalMusicPlaying}
        onToggle={handlePortalMusicToggle}
      />

      {/* Music Control */}
      <button
        onClick={handlePortalMusicToggle}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 shadow-lg hover:shadow-xl transition-all duration-300 z-20 border border-white/30"
        title={portalMusicPlaying ? 'Arrêter la musique' : 'Jouer la musique'}
      >
        {portalMusicPlaying ? <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white fill-current" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            Audrey <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-300">&</span> Stéphane
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-px bg-white/50 w-8 sm:w-12 lg:w-16"></div>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white fill-current" />
            <div className="h-px bg-white/50 w-8 sm:w-12 lg:w-16"></div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-3 sm:mb-4 drop-shadow-lg">
            💒 Nous nous marions !
          </p>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 drop-shadow-lg">
            Samedi 16 août 2025
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <button
            onClick={onEnter}
            className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-full text-lg sm:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 animate-scale-in"
          >
            ✨ Entrer sur le site ✨
          </button>

          <div className="text-center mt-4">
            <p className="text-white/60 text-xs sm:text-sm px-4">
              🎵 La musique démarrera automatiquement
            </p>
            <p className="text-white/40 text-xs px-4 mt-1">
              Ou utilisez le bouton 🔊 en haut à droite
            </p>
          </div>

          <button
            onClick={() => window.close()}
            className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-6 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/30"
          >
            🚪 Sortir du site
          </button>

          <p className="text-white/70 text-xs sm:text-sm px-4">
            Cliquez pour découvrir tous les détails de notre mariage
          </p>
        </div>
      </div>


    </div>
  );
};

export default Portal;