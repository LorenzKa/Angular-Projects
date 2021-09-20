import { Component } from '@angular/core';

interface Animal {
  name: string;
  legs: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Angular Demo';
  showErrors = true;
  errorMessage = 'Bitte Vorname eintragen';
  userInput = '';
  userSelection = 'A';
  animals: Animal[] = [
    {
      name: 'Dog',
      legs: 4,
    },
    {
      name: 'Snake',
      legs: 0,
    },
    {
      name: 'Bird',
      legs: 2,
    },
  ];
  selectedAnimal: Animal = this.animals[0];
  options = ['First Entry', 'Second Entry', 'Third Entry'];

  setErrorMsg(msg: string): void {
    this.showErrors = false;
    this.errorMessage = msg;
  }
}
