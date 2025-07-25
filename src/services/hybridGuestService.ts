import { Guest, RSVPFormData, GuestStats } from '../types/guest';
import { FirestoreGuestService } from './firestoreGuestService';
import { GuestService } from './guestService';

// Service hybride qui utilise Firestore si disponible, sinon localStorage
export class HybridGuestService {
  private static useFirestore = true;
  private static isInitialized = false;
  private static initializationPromise: Promise<void> | null = null;

  // Test if Firestore is available
  static async testFirestore(): Promise<boolean> {
    try {
      console.log('Testing Firestore connectivity...');

      // Simple test to see if Firestore is accessible
      await Promise.race([
        FirestoreGuestService.getGuestStats(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout after 5 seconds')), 5000))
      ]);

      console.log('Firestore test successful');
      return true;
    } catch (error: any) {
      console.warn('Firestore test failed:', error.message);
      return false;
    }
  }

  // Initialize and determine which service to use
  static async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this._doInitialize();
    return this.initializationPromise;
  }

  private static async _doInitialize(): Promise<void> {
    try {
      console.log('Initializing HybridGuestService...');
      // Test if Firebase is available
      this.useFirestore = await this.testFirestore();
      this.isInitialized = true;
      console.log(`HybridGuestService initialized. Using: ${this.useFirestore ? 'Firestore' : 'localStorage'}`);
    } catch (error) {
      console.error('Failed to initialize HybridGuestService:', error);
      this.useFirestore = false;
      this.isInitialized = true;
    }
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
    await this.initialize();

    if (this.useFirestore) {
      try {
        const guests = await FirestoreGuestService.getGuestsWithCurrentStatus();
        console.log(`Loaded ${guests.length} guests from Firestore`);
        return guests;
      } catch (error) {
        console.warn('Firestore failed for getGuestsWithCurrentStatus, falling back to localStorage');
        this.useFirestore = false;
        const guests = GuestService.getGuestsWithCurrentStatus();
        console.log(`Loaded ${guests.length} guests from localStorage (fallback)`);
        return guests;
      }
    } else {
      const guests = GuestService.getGuestsWithCurrentStatus();
      console.log(`Loaded ${guests.length} guests from localStorage`);
      return guests;
    }
  }

  // Get guest stats
  static async getGuestStats(): Promise<GuestStats> {
    await this.initialize();

    if (this.useFirestore) {
      try {
        const stats = await FirestoreGuestService.getGuestStats();
        console.log('Stats from Firestore:', stats);
        return stats;
      } catch (error) {
        console.warn('Firestore failed for getGuestStats, falling back to localStorage');
        this.useFirestore = false;
        const stats = GuestService.getGuestStats();
        console.log('Stats from localStorage (fallback):', stats);
        return stats;
      }
    } else {
      const stats = GuestService.getGuestStats();
      console.log('Stats from localStorage:', stats);
      return stats;
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
