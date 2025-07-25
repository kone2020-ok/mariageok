import React from 'react';
import { Car, Plane, Info, Clock, Phone } from 'lucide-react';

const PracticalInfo: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="info-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            ℹ️ Informations Pratiques
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
          <p className="text-base sm:text-lg text-terracotta-700 px-4">Tout ce qu'il faut savoir pour bien préparer votre venue</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Transport & Accès */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
            <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Transport & Accès</h3>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center mt-1">
                  <Car className="w-5 h-5 text-terracotta-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">En voiture</h4>
                  <p className="text-gray-600 mb-2">
                    Bingerville est accessible depuis Abidjan par l'autoroute du Nord.
                  </p>
                  <p className="text-sm text-terracotta-600 font-medium">
                    Parking disponible sur les deux sites
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center mt-1">
                  <Plane className="w-5 h-5 text-terracotta-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Aéroport</h4>
                  <p className="text-gray-600 mb-2">
                    Aéroport Félix Houphouët-Boigny (ABJ)
                  </p>
                  <p className="text-sm text-terracotta-600 font-medium">
                    À environ 45 minutes de Bingerville
                  </p>
                </div>
              </div>

              <div className="bg-terracotta-50 rounded-2xl p-4 border-l-4 border-terracotta-300">
                <p className="text-terracotta-800 font-medium text-sm">
                  💡 Conseil : Prévoyez du temps supplémentaire pour le trajet le jour J
                </p>
              </div>
            </div>
          </div>

          {/* Conseils Mariage */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💍</span>
                </div>
                <h3 className="text-2xl font-bold">Conseils Mariage</h3>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-lg">📸</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Photos & Souvenirs</h4>
                  <p className="text-gray-600 mb-2">
                    N'hésitez pas à prendre des photos et à les partager avec nous !
                  </p>
                  <p className="text-sm text-emerald-600 font-medium">
                    Utilisez le hashtag #AudreyStephane2025
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-lg">🎵</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Musique & Ambiance</h4>
                  <p className="text-gray-600 mb-2">
                    Soirée dansante garantie ! Préparez-vous à danser toute la nuit.
                  </p>
                  <p className="text-sm text-emerald-600 font-medium">
                    DJ professionnel et playlist variée
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 border-l-4 border-emerald-300">
                <p className="text-emerald-800 font-medium text-sm">
                  � Votre présence est le plus beau des cadeaux !
                </p>
              </div>
            </div>
          </div>

          {/* Dress Code */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👗</span>
                </div>
                <h3 className="text-2xl font-bold">Dress Code</h3>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-lg">👔</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tenue de cérémonie</h4>
                  <p className="text-gray-600 mb-2">
                    Tenue élégante souhaitée pour la cérémonie religieuse.
                  </p>
                  <p className="text-sm text-emerald-600 font-medium">
                    Costume/robe de cocktail recommandé
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-lg">🎉</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Soirée</h4>
                  <p className="text-gray-600 mb-2">
                    Tenue plus décontractée acceptée pour la soirée dansante.
                  </p>
                  <p className="text-sm text-emerald-600 font-medium">
                    Chaussures confortables pour danser !
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 border-l-4 border-emerald-300">
                <p className="text-emerald-800 font-medium text-sm">
                  🌈 Couleurs à éviter : blanc (réservé à la mariée) et noir total
                </p>
              </div>
            </div>
          </div>

          {/* Météo & Conseils */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-2xl font-bold">Météo & Conseils</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-lg">🌡️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Juillet en Côte d'Ivoire</h4>
                  <p className="text-gray-600 mb-2">
                    Saison des pluies : température douce (24-28°C)
                  </p>
                  <p className="text-sm text-orange-600 font-medium">
                    Prévoyez un parapluie ou imperméable
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Horaires</h4>
                  <p className="text-gray-600 mb-2">
                    Arrivée recommandée 30 minutes avant chaque événement.
                  </p>
                  <p className="text-sm text-orange-600 font-medium">
                    La ponctualité est appréciée !
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-4 border-l-4 border-orange-300">
                <p className="text-orange-800 font-medium text-sm">
                  📱 Gardez vos téléphones chargés pour les photos souvenirs !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact d'urgence */}
        <div className="mt-6 sm:mt-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
          <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 p-4 sm:p-6 text-white text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">Contact d'urgence</h3>
          </div>
          
          <div className="p-8 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Pour toute question ou urgence le jour J, n'hésitez pas à nous contacter :
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <div className="bg-terracotta-50 rounded-2xl p-4 sm:p-6 border border-terracotta-200">
                <h4 className="font-semibold text-terracotta-800 mb-2 text-sm sm:text-base">Yann-Cedrick Kouadio</h4>
                <p className="text-terracotta-600 font-medium text-sm sm:text-base mb-3">+225 07 77 119 421</p>
                <div className="flex gap-2">
                  <a
                    href="tel:+22507771194211"
                    className="flex-1 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                  >
                    📞 Appeler
                  </a>
                  <a
                    href="sms:+22507771194211"
                    className="flex-1 bg-terracotta-400 hover:bg-terracotta-500 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                  >
                    💬 SMS
                  </a>
                </div>
              </div>
              <div className="bg-terracotta-warm-50 rounded-2xl p-4 sm:p-6 border border-terracotta-warm-200">
                <h4 className="font-semibold text-terracotta-warm-800 mb-2 text-sm sm:text-base">Borris Trazie</h4>
                <p className="text-terracotta-warm-600 font-medium text-sm sm:text-base mb-3">+225 07 87 036 831</p>
                <div className="flex gap-2">
                  <a
                    href="tel:+22507870368311"
                    className="flex-1 bg-terracotta-warm-500 hover:bg-terracotta-warm-600 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                  >
                    📞 Appeler
                  </a>
                  <a
                    href="sms:+22507870368311"
                    className="flex-1 bg-terracotta-warm-400 hover:bg-terracotta-warm-500 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                  >
                    💬 SMS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalInfo;