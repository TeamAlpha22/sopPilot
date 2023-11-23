import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmiterService {
  public fileUpload = new EventEmitter<boolean>();


  constructor() { }
}
