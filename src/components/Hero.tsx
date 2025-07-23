import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-rose-300 animate-float opacity-20
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

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent mb-4 leading-tight">
            Audrey <span className="text-4xl md:text-6xl text-amber-500">&</span> Stéphane
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-rose-300 w-16"></div>
            <Heart className="w-6 h-6 text-rose-500 fill-current" />
            <div className="h-px bg-rose-300 w-16"></div>
          </div>
          <p className="text-xl md:text-2xl text-rose-700 font-light">
            💒 Nous nous marions !
          </p>
        </div>

        {/* Date */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-rose-600" />
            <span className="text-lg font-semibold text-rose-800">Samedi 16 août 2025</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="text-rose-600">Bingerville, Côte d'Ivoire</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-rose-800 mb-6">Plus que...</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-rose-100">
              <div className="text-3xl font-bold text-rose-600">{timeLeft.days}</div>
              <div className="text-sm text-rose-500 font-medium">Jours</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-rose-100">
              <div className="text-3xl font-bold text-rose-600">{timeLeft.hours}</div>
              <div className="text-sm text-rose-500 font-medium">Heures</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-rose-100">
              <div className="text-3xl font-bold text-rose-600">{timeLeft.minutes}</div>
              <div className="text-sm text-rose-500 font-medium">Minutes</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-rose-100">
              <div className="text-3xl font-bold text-rose-600">{timeLeft.seconds}</div>
              <div className="text-sm text-rose-500 font-medium">Secondes</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          🎉 Je participe !
        </button>
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
      `}</style>
    </section>
  );
};

export default Hero;