import { Guest, RSVPFormData, GuestStats } from '../types/guest';
import { FirestoreGuestService } from './firestoreGuestService';
import { GuestService } from './guestService';

// Service hybride qui utilise Firestore si disponible, sinon localStorage
export class HybridGuestService {
  private static useFirestore = true;

  // Test if Firestore is available
  static async testFirestore(): Promise<boolean> {
    try {


      // Simple test to see if Firestore is accessible
      const testResult = await Promise.race([
        FirestoreGuestService.getGuestStats(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout after 3 seconds')), 3000))
      ]);


      return true;
    } catch (error: any) {


      return false;
    }
  }

  // Initialize and determine which service to use
  static async initialize(): Promise<void> {
    // Test if Firebase is available
    this.useFirestore = await this.testFirestore();
  }

  // Add guest
  static async addGuest(formData: RSVPFormData): Promise<{ guest: Guest; token: string }> {
    if (this.useFirestore) {
      try {
        return await FirestoreGuestService.addGuest(formData);
      } catch (error) {
        this.useFirestore = false;
        return GuestService.addGuest(formData);
      }
    } else {
      return GuestService.addGuest(formData);
    }
  }

  // Get all guests
  static async getAllGuests(): Promise<Guest[]> {
    if (this.useFirestore) {
      try {
        return await FirestoreGuestService.getAllGuests();
      } catch (error) {
        this.useFirestore = false;
        return GuestService.getAllGuests();
      }
    } else {
      return GuestService.getAllGuests();
    }
  }

  // Find guest by token
  static async findGuestByToken(token: string): Promise<Guest | null> {
    if (this.useFirestore) {
      try {
        return await FirestoreGuestService.findGuestByToken(token);
      } catch (error) {
        this.useFirestore = false;
        return GuestService.findGuestByToken(token);
      }
    } else {
      return GuestService.findGuestByToken(token);
    }
  }

  // Update guest confirmation
  static async updateGuestConfirmation(guestId: string, attending: boolean): Promise<boolean> {
    if (this.useFirestore) {
      try {
        return await FirestoreGuestService.updateGuestConfirmation(guestId, attending);
      } catch (error) {
        this.useFirestore = false;
        return GuestService.updateGuestConfirmation(guestId, attending);
      }
    } else {
      return GuestService.updateGuestConfirmation(guestId, attending);
    }
  }

  // Get guests with current status
  static async getGuestsWithCurrentStatus(): Promise<Guest[]> {
    if (this.useFirestore) {
      try {
        return await FirestoreGuestService.getGuestsWithCurrentStatus();
      } catch (error) {
        this.useFirestore = false;
        return GuestService.getGuestsWithCurrentStatus();
      }
    } else {
      return GuestService.getGuestsWithCurrentStatus();
    }
  }

  // Get guest stats
  static async getGuestStats(): Promise<GuestStats> {
    if (this.useFirestore) {
      try {
        return await FirestoreGuestService.getGuestStats();
      } catch (error) {
        console.warn('Firestore failed, falling back to localStorage');
        this.useFirestore = false;
        return GuestService.getGuestStats();
      }
    } else {
      return GuestService.getGuestStats();
    }
  }

  // Update expired guests
  static async updateExpiredGuests(): Promise<number> {
    if (this.useFirestore) {
      try {
        return await FirestoreGuestService.updateExpiredGuests();
      } catch (error) {
        console.warn('Firestore failed, falling back to localStorage');
        this.useFirestore = false;
        return GuestService.updateExpiredGuests();
      }
    } else {
      return GuestService.updateExpiredGuests();
    }
  }

  // Static methods that don't need async
  static isDeadlinePassed(): boolean {
    return this.useFirestore ? FirestoreGuestService.isDeadlinePassed() : GuestService.isDeadlinePassed();
  }

  static getDeadline(): number {
    return this.useFirestore ? FirestoreGuestService.getDeadline() : GuestService.getDeadline();
  }

  static generateReturnUrl(token: string): string {
    return this.useFirestore ? FirestoreGuestService.generateReturnUrl(token) : GuestService.generateReturnUrl(token);
  }

  // Get current service type
  static getCurrentServiceType(): string {
    return this.useFirestore ? 'Firestore' : 'localStorage';
  }
}
