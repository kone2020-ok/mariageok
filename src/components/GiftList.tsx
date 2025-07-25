import React from 'react';
import { Gift, Store, Smartphone, Copy } from 'lucide-react';

const GiftList: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Numéro copié dans le presse-papiers !');
  };

  const stores = [
    {
      name: 'Galeries Peyrissac',
      icon: '🏪',
      description: 'Articles de maison et décoration',
      color: 'from-terracotta-500 to-terracotta-600',
      bgColor: 'bg-terracotta-50',
      borderColor: 'border-terracotta-300'
    },
    {
      name: 'Orca Déco',
      icon: '🎨',
      description: 'Décoration et mobilier',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="gifts-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            🎁 Liste de Cadeaux
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
          <p className="text-base sm:text-lg text-terracotta-700 px-4">Votre présence est notre plus beau cadeau, mais si vous souhaitez nous gâter...</p>
        </div>

        {/* Boutiques */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
          {stores.map((store, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className={`bg-gradient-to-r ${store.color} p-6 text-white`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{store.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold">{store.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">{store.description}</p>
                <div className={`${store.bgColor} rounded-2xl p-4 ${store.borderColor} border-l-4`}>
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-800">Disponible en boutique</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Participation numérique */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
          <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 p-6 sm:p-8 text-white text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Participation Numérique</h3>
            <p className="text-terracotta-100 text-sm sm:text-base">Pour ceux qui préfèrent contribuer directement</p>
          </div>
          
          <div className="p-8">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-l-4 border-orange-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">📱</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Orange Money / Wave</div>
                      <div className="text-sm text-gray-600">Mobile Money</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('+225 07 88 68 75 87')}
                    className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                    title="Copier le numéro"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">+225 07 88 68 75 87</div>
                  <p className="text-sm text-gray-600">Cliquez sur l'icône pour copier</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message de remerciement */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-gradient-to-r from-terracotta-50 to-terracotta-warm-50 rounded-2xl p-6 sm:p-8 border border-terracotta-200">
            <p className="text-base sm:text-lg text-terracotta-800 font-medium italic">
              "Que vous choisissiez de nous offrir un cadeau ou simplement votre présence,
              votre amour et votre soutien sont ce qui compte le plus pour nous. Merci du fond du cœur !"
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-terracotta-600">
              <span className="text-lg sm:text-xl">💕</span>
              <span className="font-semibold text-sm sm:text-base">Audrey & Stéphane</span>
              <span className="text-lg sm:text-xl">💕</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftList;