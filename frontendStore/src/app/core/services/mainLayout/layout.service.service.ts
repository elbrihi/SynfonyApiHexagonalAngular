import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  collapsed = signal(false); // Shared signal for managing collapsed state
}
