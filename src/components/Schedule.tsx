import React from 'react';
import { Clock, MapPin, Calendar, Plus } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation, fadeInUpClasses, fadeInLeftClasses, fadeInRightClasses } from '../hooks/useScrollAnimation';

const Schedule: React.FC = () => {
  const addToCalendar = (event: string, time: string, location: string) => {
    const date = '20250816';
    const startTime = time.replace(':', '') + '00';
    const endTime = time === '15:00' ? '170000' : '230000';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event)}&dates=${date}T${startTime}/${date}T${endTime}&details=${encodeURIComponent(`Mariage d'Audrey et Stéphane`)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="schedule-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            🗓️ Programme du Jour
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
          <p className="text-base sm:text-lg text-terracotta-700">Samedi 16 août 2025</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Cérémonie religieuse */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden hover:shadow-3xl transition-all duration-300">
            <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-2xl font-bold">Cérémonie Religieuse</h3>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-terracotta-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">Heure</div>
                    <div className="text-xl sm:text-2xl font-bold text-terracotta-600">15h00</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-terracotta-100 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">Lieu</div>
                    <div className="text-base sm:text-lg text-gray-700 leading-tight">
                      Paroisse Christ Roi de l'univers de Kessé<br />
                      <span className="text-terracotta-600 font-medium">Bingerville</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-terracotta-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-l-4 border-terracotta-300">
                <p className="text-terracotta-800 font-medium text-center italic text-sm sm:text-base">
                  "Une alliance bénie, un amour sanctifié... Venez partager notre joie !"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCalendar('Cérémonie - Mariage Audrey & Stéphane', '15:00', 'Paroisse Christ Roi de l\'univers de Kessé, Bingerville')}
                  className="flex-1 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Calendrier
                </button>
                <button
                  onClick={() => window.open('https://maps.google.com/?q=Paroisse+Christ+Roi+Kessé+Bingerville', '_blank')}
                  className="flex-1 bg-white hover:bg-gray-50 text-terracotta-600 font-semibold py-3 px-4 rounded-xl border-2 border-terracotta-500 flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <MapPin className="w-4 h-4" />
                  Itinéraire
                </button>
              </div>
            </div>
          </div>

          {/* Soirée & Dîner */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden hover:shadow-3xl transition-all duration-300">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">🎉</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Soirée & Dîner</h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">Heure</div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-600">19h00</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">Lieu</div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-600">O'Turquoise</div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-l-4 border-emerald-300">
                <p className="text-emerald-800 font-medium text-center italic text-sm sm:text-base">
                  "Après la messe, place à la fête : dîner, rires et danse jusqu'au bout de la nuit !"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCalendar('Soirée - Mariage Audrey & Stéphane', '19:00', 'O\'Turquoise')}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Calendrier
                </button>
                <button
                  onClick={() => window.open('https://maps.google.com/?q=O\'Turquoise+Bingerville', '_blank')}
                  className="flex-1 bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-3 px-4 rounded-xl border-2 border-emerald-500 flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <MapPin className="w-4 h-4" />
                  Itinéraire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;