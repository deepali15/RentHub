import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Apartment {
  id: number;
  buildingType: string;
  buildingName: string;
  sharedProperty: boolean;
  streetAddress: string;
  squareFeet: number;
  leaseType: {
    longTerm: boolean;
    shortTerm: boolean;
    both: boolean;
  };
  expectedRent: number;
  negotiable: boolean;
  priceMode: {
    perMonth: boolean;
    utilitiesIncluded: boolean;
  };
  furnished: boolean;
  location: string;
  image: string;
  amenities: {
    gym: boolean;
    swimmingPool: boolean;
    carPark: boolean;
    visitorsParking: boolean;
    powerBackup: boolean;
    garbageDisposal: boolean;
    privateLawn: boolean;
    waterHeater: boolean;
    securitySystem: boolean;
    laundryService: boolean;
    elevator: boolean;
    clubHouse: boolean;
  };
  title: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})

export class ApartmentService {
  private apartments: Apartment[] = [];

  private apartmentsSubject = new BehaviorSubject<Apartment[]>(this.apartments);
  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadApartments();
    }
  }

  private loadApartments() {
    if (this.isBrowser) {
      const savedApartments = localStorage.getItem('apartments');
      if (savedApartments) {
        this.apartments = JSON.parse(savedApartments);
        this.apartmentsSubject.next(this.apartments);
      }
    }
  }
  private saveApartments() {
    if (this.isBrowser) {
      localStorage.setItem('apartments', JSON.stringify(this.apartments));
    }
  }
  getApartments(): Observable<Apartment[]> {
    console.log(this.apartments)
    return of(this.apartments);
  }

  getApartment(id: number): Observable<Apartment | undefined> {
    return new Observable(observer => {
      const apartment = this.apartments.find(a => a.id === id);
      observer.next(apartment);
      observer.complete();
    });
  }

  addApartment(apartment: Apartment): void {
    apartment.id = this.apartments.length + 1;
    this.apartments.push(apartment);
    if (this.isBrowser) {
      this.saveApartments();
    }
    this.apartmentsSubject.next(this.apartments);
  }
}
