import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { transactionDto } from 'src/app/model/transactionDto';

@Injectable({
  providedIn: 'root'
})
export class StockHubService {

  constructor() { }
  private hubConnection!: HubConnection;
  connect(): Observable<boolean> {
    const subject = new Subject<boolean>();

    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5174/stock")
      .build();
    this.hubConnection.start().then(x => subject.next(true)).catch(err => {
      console.log(err)
      subject.next(false)
    });
    return subject.asObservable();
  }
  onBuy(): Observable<transactionDto> {
    const subject = new Subject<transactionDto>();
    this.hubConnection.on('buy', (transaction: transactionDto) => subject.next(transaction));
    return subject.asObservable();
  }
  onLogin(): Observable<string> {
    const subject = new Subject<string>();
    this.hubConnection.on('loggedIn', string => subject.next(string));
    return subject.asObservable();
  }
  sendLogin(name: string): void {
    this.hubConnection.invoke('loggedIn', { name }).catch(err => console.error(err));
  }

}
