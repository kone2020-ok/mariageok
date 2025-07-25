import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const FloatingCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-08-16T15:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-20 left-4 z-40">
      {/* Compact View */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
          title="Compte à rebours du mariage"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <div className="text-sm font-bold">
              {timeLeft.days}j {timeLeft.hours}h
            </div>
          </div>
        </button>
      )}

      {/* Expanded View */}
      {isExpanded && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-terracotta-200 p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-terracotta-600" />
              <h3 className="font-semibold text-terracotta-700">Plus que...</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-terracotta-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-terracotta-600">{timeLeft.days}</div>
              <div className="text-xs text-terracotta-500">Jours</div>
            </div>
            <div className="bg-terracotta-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-terracotta-600">{timeLeft.hours}</div>
              <div className="text-xs text-terracotta-500">Heures</div>
            </div>
            <div className="bg-terracotta-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-terracotta-600">{timeLeft.minutes}</div>
              <div className="text-xs text-terracotta-500">Minutes</div>
            </div>
            <div className="bg-terracotta-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-terracotta-600">{timeLeft.seconds}</div>
              <div className="text-xs text-terracotta-500">Secondes</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-terracotta-600 font-medium">
              Jusqu'au grand jour ! 💒
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCountdown;
