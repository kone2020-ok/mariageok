import React from 'react';
import { Heart, Smile, Calendar } from 'lucide-react';

const OurStory: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="story-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            💕 Notre Histoire
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500 fill-current" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
          <p className="text-base sm:text-lg text-terracotta-700 px-4">Le récit de notre amour, de nos premiers regards à notre engagement</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
          {/* Section 1: Le début */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="lg:order-2 flex justify-center">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-2 max-w-xs sm:max-w-sm">
                <img
                  src="/assets/hist1.jpg"
                  alt="Notre première rencontre"
                  className="w-full h-64 sm:h-72 md:h-80 object-contain bg-terracotta-50 rounded-xl"
                />
              </div>
            </div>
            <div className="lg:order-1 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-terracotta-600" />
                <h3 className="text-2xl sm:text-3xl font-bold text-terracotta-800">Un avril pas comme les autres...</h3>
              </div>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  Tout a commencé un jour d'avril, avec un simple <strong className="text-terracotta-600">poisson d'avril</strong>.
                </p>
                <p>
                  Une blague anodine, un sourire échangé… Et ce qui aurait pu rester un jeu s'est transformé en la <strong className="text-terracotta-700">plus belle des aventures</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent mx-8"></div>

          {/* Section 2: L'étincelle */}
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="flex justify-center">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-2 max-w-xs sm:max-w-sm">
                <img
                  src="/assets/hist2.jpg"
                  alt="L'étincelle de l'amour"
                  className="w-full h-64 sm:h-72 md:h-80 object-contain bg-terracotta-50 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Smile className="w-8 h-8 text-emerald-600" />
                <h3 className="text-3xl font-bold text-emerald-800">✨ L'étincelle</h3>
              </div>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  De cette étincelle est née une <strong className="text-emerald-600">🤝 complicité</strong>.
                </p>
                <p>
                  D'amis à confidents, de confidents à <strong className="text-emerald-600">💑 partenaires de vie</strong>.
                </p>
                <p>
                  Chaque jour depuis ce moment, notre amour s'est renforcé — dans les <strong className="text-emerald-600">😄 rires</strong>, les <strong className="text-emerald-600">💪 défis</strong>, les <strong className="text-emerald-600">🌟 rêves partagés</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent mx-8"></div>

          {/* Section 3: Aujourd'hui */}
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="lg:order-2 flex justify-center">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-2 max-w-xs sm:max-w-sm">
                <img
                  src="/assets/IMAGE (4).JPG"
                  alt="Notre engagement"
                  className="w-full h-64 sm:h-72 md:h-80 object-contain bg-terracotta-50 rounded-xl"
                />
              </div>
            </div>
            <div className="lg:order-1 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-amber-600 fill-current" />
                <h3 className="text-3xl font-bold text-amber-800">Aujourd'hui</h3>
              </div>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Aujourd'hui, nous nous apprêtons à dire <strong className="text-amber-600">"oui" pour la vie</strong>.
                </p>
                <p>
                  Un "oui" né d'une histoire simple, sincère, et <strong className="text-amber-600">profondément belle</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-2xl font-semibold text-emerald-800 mb-6">
                C'est plus qu'un mariage, c'est l'aboutissement d'un <strong className="text-emerald-600">🛤️ chemin fait à deux</strong>.
              </p>
              <div className="flex items-center justify-center gap-3 text-xl text-emerald-700">
                <Heart className="w-6 h-6 fill-current" />
                <span className="font-medium">Et nous avons hâte de le célébrer avec vous.</span>
                <Heart className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;