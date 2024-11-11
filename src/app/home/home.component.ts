import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Apartment, ApartmentService } from '../apartment.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  apartments$!: Observable<Apartment[]>;
  filteredApartments: Apartment[] = [];
  searchTerm: string = '';
  isBrowser: any;
  constructor(private apartmentService: ApartmentService, private router: Router,private authService: AuthService) {
    this.apartments$ = this.apartmentService.getApartments();
  }

  ngOnInit() {
  }

  loadApartments(): void {
    this.apartments$ = this.apartmentService.getApartments();
  }
  viewDetails(apartmentId: number): void {
    this.router.navigate(['/apartments', apartmentId]);
  }

  createPost(): void {
    this.router.navigate(['/create-post']);
  }
  private readonly TOKEN_KEY = 'AuthToken';
  loginRedirect(): void {
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Call the isLoggedIn method from AuthService
  }
  filterApartments() {
    this.apartments$.subscribe(apartments => {
      this.filteredApartments = apartments.filter(apartment => {
        const buildingName = apartment.buildingName || ''; // Default to empty string if undefined
        const location = apartment.streetAddress || ''; // Default to empty string if undefined
        return buildingName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
               location.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    });
  }
}

