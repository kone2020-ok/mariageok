import React from 'react';
import { MapPin, Car, Plane, Hotel, Info, Clock, Phone } from 'lucide-react';

const PracticalInfo: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            ℹ️ Informations Pratiques
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-rose-300 w-16"></div>
            <Info className="w-5 h-5 text-rose-500" />
            <div className="h-px bg-rose-300 w-16"></div>
          </div>
          <p className="text-lg text-rose-700">Tout ce qu'il faut savoir pour bien préparer votre venue</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transport & Accès */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Transport & Accès</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <Car className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">En voiture</h4>
                  <p className="text-gray-600 mb-2">
                    Bingerville est accessible depuis Abidjan par l'autoroute du Nord.
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    Parking disponible sur les deux sites
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <Plane className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Aéroport</h4>
                  <p className="text-gray-600 mb-2">
                    Aéroport Félix Houphouët-Boigny (ABJ)
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    À environ 45 minutes de Bingerville
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-300">
                <p className="text-blue-800 font-medium text-sm">
                  💡 Conseil : Prévoyez du temps supplémentaire pour le trajet le jour J
                </p>
              </div>
            </div>
          </div>

          {/* Hébergement */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Hotel className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Hébergement</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <Hotel className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Hôtels recommandés</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Hôtel Président (Yamoussoukro)</li>
                    <li>• Résidence Eburnéa (Bingerville)</li>
                    <li>• Hôtel Golf (Abidjan)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Proximité</h4>
                  <p className="text-gray-600">
                    Nous recommandons de réserver à l'avance, surtout pour le weekend du mariage.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-4 border-l-4 border-green-300">
                <p className="text-green-800 font-medium text-sm">
                  💡 Conseil : Contactez-nous pour des recommandations personnalisées
                </p>
              </div>
            </div>
          </div>

          {/* Dress Code */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👗</span>
                </div>
                <h3 className="text-2xl font-bold">Dress Code</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-lg">👔</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tenue de cérémonie</h4>
                  <p className="text-gray-600 mb-2">
                    Tenue élégante souhaitée pour la cérémonie religieuse.
                  </p>
                  <p className="text-sm text-purple-600 font-medium">
                    Costume/robe de cocktail recommandé
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-lg">🎉</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Soirée</h4>
                  <p className="text-gray-600 mb-2">
                    Tenue plus décontractée acceptée pour la soirée dansante.
                  </p>
                  <p className="text-sm text-purple-600 font-medium">
                    Chaussures confortables pour danser !
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-4 border-l-4 border-purple-300">
                <p className="text-purple-800 font-medium text-sm">
                  🌈 Couleurs à éviter : blanc (réservé à la mariée) et noir total
                </p>
              </div>
            </div>
          </div>

          {/* Météo & Conseils */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
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
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Contact d'urgence</h3>
          </div>
          
          <div className="p-8 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Pour toute question ou urgence le jour J, n'hésitez pas à nous contacter :
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
                <h4 className="font-semibold text-rose-800 mb-2">Audrey</h4>
                <p className="text-rose-600 font-medium">+225 07 88 68 75 87</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200">
                <h4 className="font-semibold text-pink-800 mb-2">Stéphane</h4>
                <p className="text-pink-600 font-medium">+225 01 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalInfo;