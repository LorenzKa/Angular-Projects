import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private message = new Subject<string>();
    constructor() { }
    public notify(msg: string): void{
      this.message.next(msg);
    }
    public listen(): Observable<string>{
      return this.message.asObservable();
    }
}
