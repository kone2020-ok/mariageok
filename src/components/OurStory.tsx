import React from 'react';
import { Heart, Smile, Calendar, ArrowRight } from 'lucide-react';

const OurStory: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            💕 Notre Histoire
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-rose-300 w-16"></div>
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <div className="h-px bg-rose-300 w-16"></div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
          {/* Section 1: Le début */}
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="lg:order-2">
              <img
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Notre première rencontre"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="lg:order-1 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-8 h-8 text-rose-600" />
                <h3 className="text-3xl font-bold text-rose-800">Un avril pas comme les autres...</h3>
              </div>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Tout a commencé un jour d'avril, avec un simple <strong className="text-rose-600">poisson d'avril</strong>.
                </p>
                <p>
                  Une blague anodine, un sourire échangé… Et ce qui aurait pu rester un jeu s'est transformé en la <strong className="text-pink-600">plus belle des aventures</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mx-8"></div>

          {/* Section 2: L'étincelle */}
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div>
              <img
                src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="L'étincelle de l'amour"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Smile className="w-8 h-8 text-rose-600" />
                <h3 className="text-3xl font-bold text-rose-800">L'étincelle</h3>
              </div>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  De cette étincelle est née une <strong className="text-rose-600">complicité</strong>.
                </p>
                <p>
                  D'amis à confidents, de confidents à <strong className="text-pink-600">partenaires de vie</strong>.
                </p>
                <p>
                  Chaque jour depuis ce moment, notre amour s'est renforcé — dans les <strong className="text-rose-600">rires</strong>, les <strong className="text-pink-600">défis</strong>, les <strong className="text-rose-600">rêves partagés</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mx-8"></div>

          {/* Section 3: Aujourd'hui */}
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="lg:order-2">
              <img
                src="https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Notre engagement"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
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
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-2xl font-semibold text-rose-800 mb-6">
                C'est plus qu'un mariage, c'est l'aboutissement d'un <strong className="text-rose-600">chemin fait à deux</strong>.
              </p>
              <div className="flex items-center justify-center gap-3 text-xl text-pink-700">
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