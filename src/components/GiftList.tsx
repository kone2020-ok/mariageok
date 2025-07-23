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
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300'
    },
    {
      name: 'Orca Déco',
      icon: '🎨',
      description: 'Décoration et mobilier',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300'
    },
    {
      name: 'Samsung - Marcory',
      icon: '📱',
      description: 'Électronique et électroménager',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🎁 Liste de Cadeaux
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-rose-300 w-16"></div>
            <Gift className="w-5 h-5 text-rose-500" />
            <div className="h-px bg-rose-300 w-16"></div>
          </div>
          <p className="text-lg text-rose-700">Votre présence est notre plus beau cadeau, mais si vous souhaitez nous gâter...</p>
        </div>

        {/* Boutiques */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
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
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-2">Participation Numérique</h3>
            <p className="text-rose-100">Pour ceux qui préfèrent contribuer directement</p>
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
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-200">
            <p className="text-lg text-rose-800 font-medium italic">
              "Que vous choisissiez de nous offrir un cadeau ou simplement votre présence, 
              votre amour et votre soutien sont ce qui compte le plus pour nous. Merci du fond du cœur !"
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-rose-600">
              <span className="text-xl">💕</span>
              <span className="font-semibold">Audrey & Stéphane</span>
              <span className="text-xl">💕</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftList;