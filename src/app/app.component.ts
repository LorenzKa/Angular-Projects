import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
interface IContact {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Angular Demo';
  contacts: IContact[] = [];
  customerId: number = 1;
  inputName = ""
  formFirstName = ""
  formLastName = ""
  formEmail = ""
  deleteId = 0
  constructor(private http: HttpClient) {}
  getAllContacts(): void {
    this.http
      .get<IContact[]>('http://localhost:5000/contacts')
      .subscribe((result) => (this.contacts = result));
  }
  getContactsWithName() : void {
    this.http
    .get<IContact[]>('http://localhost:5000/contacts/findByName?name='+this.inputName)
    .subscribe((result) => (this.contacts = result))
  }
  deleteContact() : void{
    this.http.delete<IContact[]>('http://localhost:5000/contacts/'+this.deleteId)
    .subscribe((result) => (this.contacts = result))
    this.getAllContacts()
  }
  
}
