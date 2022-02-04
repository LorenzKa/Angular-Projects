import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { TransactionDto } from 'src/app/model/transactionDto';
import { NameDto } from 'src/app/model/nameDto';
import { ShareTickDto } from '../model/shareTickDto';

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
  onSell(): Observable<TransactionDto> {
    const subject = new Subject<TransactionDto>();
    this.hubConnection.on('sell', (transaction: TransactionDto) => subject.next(transaction));
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
  onStockUpdate(): Observable<ShareTickDto[]> {
    const subject = new Subject<ShareTickDto[]>();
    this.hubConnection.on('stockUpdate', (shareTickDto: ShareTickDto[]) => subject.next(shareTickDto));
    return subject.asObservable();
  }
  sendLogin(name: string): void {
    this.hubConnection.invoke('loggedIn', { name }).catch(err => console.error(err));
  }
  sendLogout(name: string): void {
    this.hubConnection.invoke('loggedOut', { name }).catch(err => this.hubConnection.stop()).then(x => this.hubConnection.stop());
  }
  sendTransaction(transaction: TransactionDto): Promise<any> {
    return this.hubConnection.invoke('transaction', transaction);
  }
}
