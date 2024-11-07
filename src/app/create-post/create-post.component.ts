import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apartment, ApartmentService } from '../apartment.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  amenitiesList: string[] = ['Gym/Fitness Center', 'Swimming Pool', 'Car Parking', 'Vistors Parking', 'Power Backup', 'Garbage Disposal', 'Private Lawn', 'Water Heater', 'Plant Security System', 'Laundry Service', 'Elevator', 'Club House']; // Define all available amenities

  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      buildingType: ['', Validators.required],
      buildingName: ['', Validators.required],
      sharedProperty: ['', Validators.required],
      streetAddress: ['', Validators.required],
      squareFeet: ['', Validators.required],
      leaseType: ['', Validators.required],
      expectedRent: ['', Validators.required],
      negotiable: [false],
      priceMode: ['', Validators.required],
      furnished: ['', Validators.required],
      amenities: this.fb.array(this.amenitiesList.map(() => this.fb.control(false))), // Create a FormArray of checkboxes
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1400)]]
    });
  }
  get amenities(): FormArray {
    return this.postForm.get('amenities') as FormArray;
  }
  postListing() {
    if (this.postForm.valid) {
      const formData = { ...this.postForm.value };

      // Convert amenities array to an object
      const amenitiesObject = {
        gym: formData.amenities[0],
        swimmingPool: formData.amenities[1],
        carPark: formData.amenities[2],
        visitorsParking: formData.amenities[3],
        powerBackup: formData.amenities[4],
        garbageDisposal: formData.amenities[5],
        privateLawn: formData.amenities[6],
        waterHeater: formData.amenities[7],
        securitySystem: formData.amenities[8], 
        laundryService: formData.amenities[9],
        elevator: formData.amenities[10], 
        clubHouse: formData.amenities[11]
      };
      formData.amenities = amenitiesObject;

      const newApartment: Apartment = formData;
      this.apartmentService.addApartment(newApartment);
      alert('Listing created successfully!');
      this.router.navigate(['/home']);
    } else {
      alert('Please fill out all required fields');
    }
  }

}
