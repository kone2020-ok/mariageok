import React from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation, fadeInUpClasses, fadeInLeftClasses, fadeInRightClasses } from '../hooks/useScrollAnimation';

const Invitation: React.FC = () => {
  const titleAnimation = useScrollAnimation();
  const leftCardAnimation = useStaggeredAnimation(200);
  const rightCardAnimation = useStaggeredAnimation(400);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
      <div className="container mx-auto max-w-6xl">
        <div ref={titleAnimation.ref} className={`text-center mb-12 sm:mb-16 ${fadeInUpClasses(titleAnimation.isVisible)}`}>
          <h2 id="invitation-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            💌 Invitation au Mariage
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Première partie avec image */}
          <div ref={leftCardAnimation.ref} className={`lg:order-1 ${fadeInLeftClasses(leftCardAnimation.isVisible)}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden hover:shadow-3xl transition-all duration-300">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-6">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-2 max-w-xs sm:max-w-sm">
                      <img
                        src="/assets/IMAGE (1).JPG"
                        alt="Audrey et Stéphane - Invitation"
                        className="w-full h-64 sm:h-72 md:h-80 object-contain bg-terracotta-50 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-center">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Nous avons l'immense joie de vous annoncer notre union.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Entourés de nos familles et de nos amis les plus chers,
                    </p>
                    
                    <div className="my-6">
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent">
                        Audrey & Stéphane
                      </div>
                    </div>
                    
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      vous invitent à célébrer leur mariage
                    </p>
                    
                    <div className="bg-terracotta-50 rounded-2xl p-4 sm:p-6 border border-terracotta-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-terracotta-600" />
                        <span className="text-lg sm:text-xl font-bold text-terracotta-700">
                          Samedi 16 août 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deuxième partie avec image */}
          <div ref={rightCardAnimation.ref} className={`lg:order-2 ${fadeInRightClasses(rightCardAnimation.isVisible)}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden hover:shadow-3xl transition-all duration-300">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-6">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-2 max-w-xs sm:max-w-sm">
                      <img
                        src="/assets/IMAGE (6).jpg"
                        alt="Célébration du mariage"
                        className="w-full h-64 sm:h-72 md:h-80 object-contain bg-terracotta-50 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-center">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Une journée remplie d'amour, de rires et de souvenirs inoubliables vous attend.
                    </p>
                    
                    <div className="bg-terracotta-warm-50 rounded-2xl p-4 sm:p-6 border border-terracotta-warm-200 my-6">
                      <p className="text-lg sm:text-xl font-semibold text-terracotta-800 mb-2">
                        Votre présence sera le plus beau des cadeaux.
                      </p>
                      <p className="text-base sm:text-lg text-terracotta-700">
                        Merci de partager avec nous ce moment unique de notre vie.
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-base sm:text-lg text-gray-600 italic mb-4">
                        Avec tout notre amour,
                      </p>
                      <div className="flex items-center justify-center gap-2 text-terracotta-600">
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="text-lg sm:text-xl font-bold">Audrey & Stéphane</span>
                        <Heart className="w-5 h-5 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carte Bague - Centrée en dessous des deux cartes */}
        <div className="flex justify-center mt-8 lg:mt-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 p-6 sm:p-8 max-w-sm w-full transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
            <div className="text-center">
              {/* Image de la bague */}
              <div className="relative mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-terracotta-200 bg-gradient-to-br from-terracotta-50 to-terracotta-100">
                  <img
                    src="/assets/IMAGE (1).png"
                    alt="Nos alliances"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Effet de brillance */}
                <div className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>

              {/* Texte animé */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-terracotta-700 animate-bounce">
                  💍 Nos Alliances
                </h3>
                <p className="text-terracotta-600 text-sm sm:text-base font-medium animate-pulse">
                  Symboles de notre amour éternel
                </p>

                {/* Texte qui clignote */}
                <div className="mt-4">
                  <span className="inline-block bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg ring-animation">
                    ✨ Bientôt unis pour la vie ✨
                  </span>
                </div>
              </div>

              {/* Décoration avec cœurs animés */}
              <div className="flex justify-center items-center mt-6 space-x-2">
                <span className="text-terracotta-400 text-lg animate-bounce" style={{animationDelay: '0s'}}>💕</span>
                <span className="text-terracotta-500 text-xl animate-bounce" style={{animationDelay: '0.2s'}}>💖</span>
                <span className="text-terracotta-400 text-lg animate-bounce" style={{animationDelay: '0.4s'}}>💕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Styles CSS personnalisés pour les animations */}
        <style>{`
          .ring-animation {
            animation: ring-pulse 2s infinite;
          }

          @keyframes ring-pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(217, 119, 89, 0.7);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(217, 119, 89, 0);
            }
          }

          .ring-animation:hover {
            animation-play-state: paused;
            transform: scale(1.1);
          }
        `}</style>
      </div>
    </section>
  );
};

export default Invitation;