import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  isOpen = signal<boolean>(false)
  isClose = signal<boolean>(false)

  isLoginModelOpen = signal<boolean>(false)
  isRegisterModalOpen = signal<boolean>(false)
  isEditModelOpen = signal<boolean>(false)
}
