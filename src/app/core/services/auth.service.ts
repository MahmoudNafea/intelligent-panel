import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: any) {
    return this.http.post<any>(environment.basicUrl + 'login', user);
  }

  logout(): void {
    localStorage.removeItem('intelligent-token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('intelligent-token');
  }
}
