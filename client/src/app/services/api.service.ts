import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'http://localhost:3000'; // Replace with your server URL

  constructor(private http: HttpClient) {}

  signUp(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.API_URL}/signup`, body);
  }

  signIn(email: string, password: string): Observable<{ token: string }> {
    const body = { email, password };
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, body);
  }

  getCampsites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/campsites`);
  }

  getCampsite(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/campsites/${id}`);
  }

  createReservation(
    userId: number,
    campingSiteId: number,
    startDate: Date,
    endDate: Date
  ): Observable<any> {
    const body = { userId, campingSiteId, startDate, endDate };
    return this.http.post(`${this.API_URL}/reservations`, body);
  }

  getReservations(userId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/reservations/${userId}`);
  }
}