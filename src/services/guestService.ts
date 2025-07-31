import { Guest, RSVPFormData, generateConfirmationToken, getGuestStatus, GuestStats, calculateStats } from '../types/guest';

const STORAGE_KEY = 'wedding-guests';
const DEADLINE = new Date('2025-08-03T23:59:59').getTime();

export class GuestService {
  static saveGuests(guests: Guest[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
  }

  static loadGuests(): Guest[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    
    const guests = JSON.parse(saved);
    // Convertir les dates string en objets Date
    return guests.map((guest: any) => ({
      ...guest,
      submittedAt: new Date(guest.submittedAt),
      lastUpdated: guest.lastUpdated ? new Date(guest.lastUpdated) : undefined
    }));
  }

  static addGuest(formData: RSVPFormData): { guest: Guest; token: string } {
    const guests = this.loadGuests();
    const token = generateConfirmationToken();
    
    const guest: Guest = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date(),
      status: formData.confirmLater ? 'pending' : (formData.attending ? 'confirmed' : 'absent'),
      confirmationToken: token
    };

    guests.push(guest);
    this.saveGuests(guests);
    
    return { guest, token };
  }

  static findGuestByToken(token: string): Guest | null {
    const guests = this.loadGuests();
    return guests.find(guest => guest.confirmationToken === token) || null;
  }

  static findGuestByName(firstName: string, lastName: string): Guest | null {
    const guests = this.loadGuests();
    return guests.find(guest => 
      guest.firstName.toLowerCase() === firstName.toLowerCase() && 
      guest.lastName.toLowerCase() === lastName.toLowerCase()
    ) || null;
  }

  static updateGuestConfirmation(guestId: string, attending: boolean): boolean {
    const guests = this.loadGuests();
    const guestIndex = guests.findIndex(guest => guest.id === guestId);
    
    if (guestIndex === -1) return false;
    
    const now = new Date().getTime();
    if (now > DEADLINE) return false; // Délai dépassé
    
    guests[guestIndex] = {
      ...guests[guestIndex],
      attending,
      status: attending ? 'confirmed' : 'absent',
      lastUpdated: new Date()
    };
    
    this.saveGuests(guests);
    return true;
  }

  static updateExpiredGuests(): number {
    const guests = this.loadGuests();
    const now = new Date().getTime();
    let updatedCount = 0;
    
    const updatedGuests = guests.map(guest => {
      if (guest.status === 'pending' && now > DEADLINE) {
        updatedCount++;
        return {
          ...guest,
          status: 'expired' as const,
          attending: false,
          lastUpdated: new Date()
        };
      }
      return guest;
    });
    
    if (updatedCount > 0) {
      this.saveGuests(updatedGuests);
    }
    
    return updatedCount;
  }

  static getGuestsWithCurrentStatus(): Guest[] {
    const guests = this.loadGuests();
    return guests.map(guest => ({
      ...guest,
      status: getGuestStatus(guest, DEADLINE)
    }));
  }

  static isDeadlinePassed(): boolean {
    return new Date().getTime() > DEADLINE;
  }

  static getDeadline(): number {
    return DEADLINE;
  }

  static generateReturnUrl(token: string): string {
    return `${window.location.origin}${window.location.pathname}?confirm=${token}`;
  }

  static getAllGuests(): Guest[] {
    return this.loadGuests();
  }

  static getGuestStats(): GuestStats {
    const guests = this.getGuestsWithCurrentStatus();
    return calculateStats(guests, DEADLINE);
  }
}
