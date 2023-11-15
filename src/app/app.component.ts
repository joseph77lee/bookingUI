import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-booking-app';

  onBookingCreated() {
    // Implement logic to refresh the booking list
    // This could involve calling a method in the BookingListComponent
    // or emitting an event that the BookingListComponent listens to
  }
}
