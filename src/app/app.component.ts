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
  title = 'Worlds Best Turmrechner';
  selectedNumber = 0;
  selectedHeight = 0;
  isDisabled = true;
  stringCalculations : string[] = []
  calculate(number: any, height: any) : void {
    this.stringCalculations = []
    for(var i = 2; i <height+1; i++){
      var newNumber = number * i;
      this.stringCalculations.push(number+" "+"* "+i+" = "+newNumber)
      number = newNumber
    }
    for(var x = 2; x < height+1; x++){
      var newNumber = number / x;
      this.stringCalculations.push(number+" "+"/ "+x+" = "+newNumber)
      number = newNumber
    }
  }
  
}
