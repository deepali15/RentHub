import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Apartment, ApartmentService } from '../apartment.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  apartments$!: Observable<Apartment[]>;
  constructor(private apartmentService: ApartmentService, private router: Router) {
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
}
