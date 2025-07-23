import React, { useState, useEffect } from 'react';
import { Users, Download, Calendar, MessageSquare, CheckCircle, XCircle, MapPin } from 'lucide-react';

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  message: string;
  attending: boolean | null;
  submittedAt: Date;
  status: 'confirmed' | 'pending' | 'rejected';
}

interface AdminProps {
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filter, setFilter] = useState<'all' | 'attending' | 'not-attending'>('all');

  useEffect(() => {
    const loadGuests = () => {
      const savedGuests = JSON.parse(localStorage.getItem('wedding-guests') || '[]');
      // Convert submittedAt back to Date object
      const guestsWithDates = savedGuests.map((guest: any) => ({
        ...guest,
        submittedAt: new Date(guest.submittedAt)
      }));
      setGuests(guestsWithDates);
    };

    loadGuests();
    // Refresh every 30 seconds
    const interval = setInterval(loadGuests, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredGuests = guests.filter(guest => {
    if (filter === 'attending') return guest.attending === true;
    if (filter === 'not-attending') return guest.attending === false;
    return true;
  });

  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.status === 'confirmed').length,
    pending: guests.filter(g => g.status === 'pending').length,
    rejected: guests.filter(g => g.status === 'rejected').length
  };

  const exportToCSV = () => {
    const headers = ['Prénom', 'Nom', 'Ville', 'Présence', 'Message', 'Date de soumission'];
    const csvContent = [
      headers.join(','),
      ...filteredGuests.map(guest => [
        guest.firstName,
        guest.lastName,
        guest.city,
        guest.status === 'confirmed' ? 'Confirmé' : guest.status === 'rejected' ? 'Rejeté' : 'En attente',
        `"${guest.message.replace(/"/g, '""')}"`,
        guest.submittedAt.toLocaleDateString('fr-FR')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `invites-mariage-audrey-stephane-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getAttendingBadge = (attending: boolean | null) => {
  };
  
  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4" />
          Confirmé
        </span>
      );
    } else if (status === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <XCircle className="w-4 h-4" />
          Rejeté
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
          <Calendar className="w-4 h-4" />
          En attente
        </span>
      );
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-4">
            👑 Espace Administrateur
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
            >
              Déconnexion
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-slate-300 w-16"></div>
            <Users className="w-5 h-5 text-slate-500" />
            <div className="h-px bg-slate-300 w-16"></div>
          </div>
          <p className="text-lg text-slate-700">Gestion des invités et confirmations</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Présents</div>
                <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Absents</div>
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">En attente</div>
                <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Filtrer :</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              >
                <option value="all">Tous les invités ({stats.total})</option>
                <option value="confirmed">Confirmés ({stats.confirmed})</option>
                <option value="pending">En attente ({stats.pending})</option>
                <option value="rejected">Rejetés ({stats.rejected})</option>
              </select>
            </div>
            
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Exporter CSV ({filteredGuests.length})
            </button>
          </div>
        </div>

        {/* Guests Table */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-600 to-gray-600 p-6 text-white">
            <h3 className="text-xl font-bold">Liste des Invités</h3>
            <p className="text-slate-200 mt-1">
              {filteredGuests.length} invité{filteredGuests.length !== 1 ? 's' : ''} affiché{filteredGuests.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="overflow-x-auto">
            {filteredGuests.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">Aucun invité</h4>
                <p className="text-gray-500">
                  {filter === 'all' 
                    ? "Aucune confirmation reçue pour le moment."
                    : `Aucun invité dans la catégorie "${filter === 'attending' ? 'Présents' : 'Absents'}".`
                  }
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom complet</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ville</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredGuests.map((guest, index) => (
                    <tr key={guest.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {guest.firstName} {guest.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          {guest.city && <MapPin className="w-4 h-4" />}
                          <span>{guest.city || '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(guest.status)}
                      </td>
                      <td className="px-6 py-4">
                        {guest.message ? (
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                            <div className="text-sm text-gray-600 max-w-xs">
                              {guest.message.length > 50 
                                ? `${guest.message.substring(0, 50)}...` 
                                : guest.message
                              }
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Aucun message</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {guest.submittedAt.toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;