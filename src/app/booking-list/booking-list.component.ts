import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: any = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loadBookings();

    this.bookingService.bookingAdded.subscribe(() => {
      this.loadBookings();
    });
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe(data => {
      this.bookings = data;
    });
  }

  deleteBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe(() => {
      this.loadBookings();
    });
  }
}
