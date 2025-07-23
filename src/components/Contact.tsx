import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, MapPin, Heart } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Message envoyé !</h2>
              <p className="text-green-100">Nous vous répondrons dans les plus brefs délais</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-lg text-gray-700 mb-6">
                Merci pour votre message. Nous sommes ravis de votre intérêt pour notre mariage !
              </p>
              <div className="flex items-center justify-center gap-2 text-rose-600">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-semibold">Audrey & Stéphane</span>
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            📞 Nous Contacter
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-rose-300 w-16"></div>
            <MessageCircle className="w-5 h-5 text-rose-500" />
            <div className="h-px bg-rose-300 w-16"></div>
          </div>
          <p className="text-lg text-rose-700">Une question ? Besoin d'informations ? N'hésitez pas à nous écrire !</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 p-8">
              <h3 className="text-2xl font-bold text-rose-800 mb-6 text-center">Nos Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-200">
                  <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Téléphone</h4>
                    <p className="text-rose-600 font-medium">+225 07 88 68 75 87</p>
                    <p className="text-sm text-gray-600">Audrey (de 9h à 18h)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-2xl border border-pink-200">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-pink-600 font-medium">audrey.stephane.mariage@gmail.com</p>
                    <p className="text-sm text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Adresse</h4>
                    <p className="text-blue-600 font-medium">Bingerville</p>
                    <p className="text-sm text-gray-600">Côte d'Ivoire</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ rapide */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 p-8">
              <h3 className="text-2xl font-bold text-rose-800 mb-6 text-center">Questions Fréquentes</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border-l-4 border-rose-300">
                  <h4 className="font-semibold text-gray-800 mb-2">Puis-je venir accompagné(e) ?</h4>
                  <p className="text-sm text-gray-600">Merci de nous préciser lors de votre confirmation si vous venez accompagné(e).</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-300">
                  <h4 className="font-semibold text-gray-800 mb-2">Y a-t-il un menu spécial ?</h4>
                  <p className="text-sm text-gray-600">Oui ! Menu ivoirien et international. Précisez vos allergies lors de la confirmation.</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-300">
                  <h4 className="font-semibold text-gray-800 mb-2">Puis-je prendre des photos ?</h4>
                  <p className="text-sm text-gray-600">Bien sûr ! Nous encourageons les photos souvenirs pendant la soirée.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Envoyez-nous un message</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre nom et prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="confirmation">Question sur la confirmation</option>
                  <option value="transport">Transport et hébergement</option>
                  <option value="programme">Programme de la journée</option>
                  <option value="cadeaux">Liste de cadeaux</option>
                  <option value="dress-code">Dress code</option>
                  <option value="autre">Autre question</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Écrivez votre message ici..."
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;