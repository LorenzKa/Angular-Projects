import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { TransactionDto } from 'src/app/model/transactionDto';
import { NameDto } from 'src/app/model/nameDto';

@Injectable({
  providedIn: 'root'
})
export class StockHubService {

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
  onBuy(): Observable<TransactionDto> {
    const subject = new Subject<TransactionDto>();
    this.hubConnection.on('buy', (transaction: TransactionDto) => subject.next(transaction));
    return subject.asObservable();
  }
  onLogin(): Observable<NameDto> {
    const subject = new Subject<NameDto>();
    this.hubConnection.on('loggedIn', (nameDto: NameDto) => subject.next(nameDto));
    return subject.asObservable();
  }
  onLogout(): Observable<NameDto> {
    const subject = new Subject<NameDto>();
    this.hubConnection.on('loggedOut', (nameDto: NameDto) => subject.next(nameDto));
    return subject.asObservable();
  }
  sendLogin(name: string): void {
    this.hubConnection.invoke('loggedIn', { name }).catch(err => console.error(err));
  }
  sendLogout(name: string): void {
    this.hubConnection.invoke('loggedOut', { name }).catch(err => console.error(err));
    this.hubConnection.stop();
  }
}
