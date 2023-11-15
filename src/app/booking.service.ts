import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/bookings';

  bookingAdded = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  getBookings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addBooking(bookingData: any): Observable<any> {
    return this.http.post(this.apiUrl, bookingData).pipe(
      tap(() => this.bookingAdded.emit()),
      catchError(this.handleError)  // Implement error handling logic
    );
  }

  updateBooking(id: number, bookingData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bookingData);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 409) {
        errorMessage = 'A booking conflict occurred. Please choose different dates.';
      } else {
        console.log(error);
        errorMessage = error.error || `Error Status: ${error.status}\nMessage: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
