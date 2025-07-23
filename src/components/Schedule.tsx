import React from 'react';
import { Clock, MapPin, Calendar, Plus } from 'lucide-react';

const Schedule: React.FC = () => {
  const addToCalendar = (event: string, time: string, location: string) => {
    const date = '20250816';
    const startTime = time.replace(':', '') + '00';
    const endTime = time === '15:00' ? '170000' : '230000';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event)}&dates=${date}T${startTime}/${date}T${endTime}&details=${encodeURIComponent(`Mariage d'Audrey et Stéphane`)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🗓️ Programme du Jour
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-rose-300 w-16"></div>
            <Calendar className="w-5 h-5 text-rose-500" />
            <div className="h-px bg-rose-300 w-16"></div>
          </div>
          <p className="text-lg text-rose-700">Samedi 16 juillet 2025</p>
          <p className="text-lg text-rose-700">Samedi 16 août 2025</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Cérémonie religieuse */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden hover:shadow-3xl transition-all duration-300">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-2xl font-bold">Cérémonie Religieuse</h3>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Heure</div>
                    <div className="text-2xl font-bold text-rose-600">15h00</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Lieu</div>
                    <div className="text-lg text-gray-700 leading-tight">
                      Paroisse Christ Roi de l'univers de Kessé<br />
                      <span className="text-rose-600 font-medium">Bingerville</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-6 mb-6 border-l-4 border-rose-300">
                <p className="text-rose-800 font-medium text-center italic">
                  "Une alliance bénie, un amour sanctifié... Venez partager notre joie !"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => addToCalendar('Cérémonie - Mariage Audrey & Stéphane', '15:00', 'Paroisse Christ Roi de l\'univers de Kessé, Bingerville')}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Calendrier
                </button>
                <button 
                  onClick={() => window.open('https://maps.google.com/?q=Paroisse+Christ+Roi+Kessé+Bingerville', '_blank')}
                  className="flex-1 bg-white hover:bg-gray-50 text-rose-600 font-semibold py-3 px-4 rounded-xl border-2 border-rose-500 flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <MapPin className="w-4 h-4" />
                  Itinéraire
                </button>
              </div>
            </div>
          </div>

          {/* Soirée & Dîner */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden hover:shadow-3xl transition-all duration-300">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold">Soirée & Dîner</h3>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Heure</div>
                    <div className="text-2xl font-bold text-amber-600">19h30</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Lieu</div>
                    <div className="text-2xl font-bold text-amber-600">O'Turquoise</div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 mb-6 border-l-4 border-amber-300">
                <p className="text-amber-800 font-medium text-center italic">
                  "Après la messe, place à la fête : dîner, rires et danse jusqu'au bout de la nuit !"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => addToCalendar('Soirée - Mariage Audrey & Stéphane', '19:30', 'O\'Turquoise')}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Calendrier
                </button>
                <button 
                  onClick={() => window.open('https://maps.google.com/?q=O\'Turquoise+Bingerville', '_blank')}
                  className="flex-1 bg-white hover:bg-gray-50 text-amber-600 font-semibold py-3 px-4 rounded-xl border-2 border-amber-500 flex items-center justify-center gap-2 transition-colors duration-200"
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