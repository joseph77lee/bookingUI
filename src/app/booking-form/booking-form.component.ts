import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  @Output() bookingCreated = new EventEmitter<void>();

  timeZones: string[] = [
    // Canada
    'America/St_Johns', 'America/Halifax', 'America/Glace_Bay', 'America/Moncton',
    'America/Goose_Bay', 'America/Blanc-Sablon', 'America/Toronto', 'America/Nipigon',
    'America/Thunder_Bay', 'America/Iqaluit', 'America/Pangnirtung', 'America/Atikokan',
    'America/Winnipeg', 'America/Rainy_River', 'America/Resolute', 'America/Rankin_Inlet',
    'America/Regina', 'America/Swift_Current', 'America/Edmonton', 'America/Cambridge_Bay',
    'America/Yellowknife', 'America/Inuvik', 'America/Creston', 'America/Dawson_Creek',
    'America/Fort_Nelson', 'America/Vancouver', 'America/Whitehorse', 'America/Dawson',

    // USA
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'America/Anchorage', 'America/Phoenix', 'America/Adak', 'America/Honolulu',

    // Korea
    'Asia/Seoul', 'Asia/Pyongyang',
  ];

  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.bookingForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      customerName: ['', Validators.required],
      customerAddress: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      paymentType: ['', Validators.required],
      timeZone: ['America/Edmonton', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.bookingService.addBooking(this.bookingForm.value).subscribe({
        next: (result) => {
          this.successMessage = 'Booking successfully added!';
          this.errorMessage = '';
          this.bookingForm.reset();
          this.bookingCreated.emit(); // Notify parent component
        },
        error: (error) => {
          this.errorMessage = error;
          this.successMessage = '';
        }
      });
    }
  }
}
