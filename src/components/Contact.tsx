import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, MapPin, Heart } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Configuration EmailJS depuis les variables d'environnement
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Initialiser EmailJS avec la clé publique
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Préparer les données du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: EMAILJS_TO_EMAIL,
        reply_to: formData.email
      };

      // Envoyer l'email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );


      setSubmitted(true);

    } catch (error: any) {

      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="flex items-center justify-center gap-2 text-terracotta-600 mb-6">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-semibold">Audrey & Stéphane</span>
                <Heart className="w-5 h-5 fill-current" />
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                  setError(null);
                }}
                className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300"
              >
                Envoyer un autre message
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="contact-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            📞 Nous Contacter
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
          <p className="text-base sm:text-lg text-terracotta-700 px-4">Une question ? Besoin d'informations ? N'hésitez pas à nous écrire !</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-terracotta-800 mb-4 sm:mb-6 text-center">Nos Coordonnées & Liens Utiles</h3>
              
              <div className="space-y-6">
                <div className="bg-terracotta-50 rounded-2xl p-4 border border-terracotta-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-terracotta-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Yann-Cedrick Kouadio</h4>
                      <p className="text-terracotta-600 font-medium text-sm sm:text-base">+225 07 77 119 421</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="tel:+22507771194211"
                      className="flex-1 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                    >
                      📞 Appeler
                    </a>
                    <a
                      href="sms:+22507771194211"
                      className="flex-1 bg-terracotta-400 hover:bg-terracotta-500 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                    >
                      💬 SMS
                    </a>
                  </div>
                </div>

                <div className="bg-terracotta-warm-50 rounded-2xl p-4 border border-terracotta-warm-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-terracotta-warm-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Borris Trazie</h4>
                      <p className="text-terracotta-warm-600 font-medium text-sm sm:text-base">+225 07 87 036 831</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="tel:+22507870368311"
                      className="flex-1 bg-terracotta-warm-500 hover:bg-terracotta-warm-600 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                    >
                      📞 Appeler
                    </a>
                    <a
                      href="sms:+22507870368311"
                      className="flex-1 bg-terracotta-warm-400 hover:bg-terracotta-warm-500 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                    >
                      💬 SMS
                    </a>
                  </div>
                </div>

                {/* Email - Commenté temporairement
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Email</h4>
                      <p className="text-emerald-600 font-medium text-sm sm:text-base">audrey.stephane.mariage@gmail.com</p>
                    </div>
                  </div>
                  <a
                    href="mailto:audrey.stephane.mariage@gmail.com"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                  >
                    ✉️ Envoyer un email
                  </a>
                </div>
                */}

                {/* Adresse - Commenté temporairement
                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Adresse</h4>
                    <p className="text-emerald-600 font-medium">Bingerville</p>
                    <p className="text-sm text-emerald-500">Côte d'Ivoire</p>
                  </div>
                </div>
                */}

                {/* Nouveaux liens - Paroisse */}
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 text-white text-center">⛪</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Cérémonie Religieuse</h4>
                      <p className="text-purple-600 font-medium text-sm sm:text-base">Paroisse de Bingerville</p>
                    </div>
                  </div>
                  <a
                    href="https://share.google/qm6hlZFPhuhkHXHVy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                  >
                    🗺️ Localiser & Itinéraire
                  </a>
                </div>

                {/* Nouveaux liens - O'Turquoise */}
                <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 text-white text-center">🏨</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Réception</h4>
                      <p className="text-cyan-600 font-medium text-sm sm:text-base">O'Turquoise - Bingerville</p>
                    </div>
                  </div>
                  <a
                    href="https://share.google/PuwaMc8IBnPDd9EkS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                  >
                    🗺️ Localiser & Itinéraire
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Formulaire de contact */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
            <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 p-6 sm:p-8 text-white text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Envoyez-nous un message</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Affichage des erreurs */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all duration-200"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all duration-200"
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
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Écrivez votre message ici..."
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                  className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 mx-auto"
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