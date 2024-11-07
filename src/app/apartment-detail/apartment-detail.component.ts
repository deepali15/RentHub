import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { Apartment, ApartmentService } from '../apartment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apartment-detail',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './apartment-detail.component.html',
  styleUrl: './apartment-detail.component.css'
})

export class ApartmentDetailComponent implements OnInit {
  apartment: Apartment | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private apartmentService: ApartmentService
  ) { }
  router = inject(Router);
  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.apartmentService.getApartment(id).subscribe(apartment => {
    //   apartment = apartment;
    // });
    this.activeRoute.params.subscribe(params => {
      const id = +params['id'];
      this.apartmentService.getApartment(id).subscribe(apartment => {
        this.apartment = apartment;
        console.log('Fetched apartment:', apartment);
      });
    });
}
backHome(): void {
  this.router.navigate(['/home']);
}
getAmenities(): string[] {
  if (!this.apartment || !this.apartment.amenities) return [];

  const amenityMap = {
    gym: 'Gym',
    swimmingPool: 'Swimming Pool',
    carPark: 'Car Park',
    visitorsParking: 'Visitors Parking',
    powerBackup: 'Power Backup',
    garbageDisposal: 'Garbage Disposal',
    privateLawn: 'Private Lawn',
    waterHeater: 'Water Heater',
    securitySystem: 'Security System',
    laundryService: 'Laundry Service',
    elevator: 'Elevator',
    clubHouse: 'Club House'
  };
  var key =Object.entries(this.apartment.amenities)
      .filter(([key, value]) => value === true)
      .map(([key]) => amenityMap[key as keyof typeof amenityMap] || key);
  return key
  }
}
