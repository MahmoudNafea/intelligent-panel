import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterService {
  get router() {
    return inject(Router);
  }
}
