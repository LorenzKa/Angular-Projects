import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Regex } from '../regex';
import { PersonDto } from '../personDto';
import { AdressDto } from '../adressDto';
import { CityDto } from '../cityDto';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  firstname : string = "";
  lastname : string = "";
  birthday : string = "";
  tel : string = "";
  countryCode : string = "";
  postalCode: string = "";
  cityName: string = "";
  streetName: string = "";
  streetNr: string = "";
  personResponse: string = "";
  regex : Regex = {} as Regex;
  firstnameControl = new FormControl();
  lastnameControl = new FormControl();
  birthdayControl = new FormControl();
  telControl = new FormControl();
  adressStreetNameControl = new FormControl();
  adressStreetNrControl = new FormControl();
  cityCountryCodeControl = new FormControl();
  cityPostalCodeControl = new FormControl();
  cityNameControl = new FormControl();
  constructor( private backendService: BackendService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.backendService.getRegex().subscribe(regex => {this.regex = regex
      this.firstnameControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.firstname)]);
      this.lastnameControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.lastname)]);
      this.birthdayControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.birthday)]);
      this.telControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.tel)]);
      this.adressStreetNameControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.adressStreetName)]);
      this.adressStreetNrControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.adressStreetNr)]);
      this.cityCountryCodeControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.cityCountryCode)]);
      this.cityPostalCodeControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.cityPostalCode)]);
      this.cityNameControl = new FormControl('', [Validators.required, Validators.pattern(this.regex.cityStreetName)]);
    });

  }
  addPerson() {
    let person : PersonDto = {firstname: this.firstname, lastname: this.lastname, born: this.birthday, tel: this.tel, adress: {StreetName: this.streetName, StreetNr: this.streetNr, City: {countryCode: this.countryCode, postalCode: this.postalCode, Name: this.cityName}}} as PersonDto;
    this.backendService.addPerson(person).subscribe(res => this.personResponse = "Saved person successfully", err => this.personResponse = "Failed to save Person", () => this.notifierService.notify(1));
  }
  allValid(): boolean {
    if(this.firstnameControl.valid && this.lastnameControl.valid && this.birthdayControl.valid && this.telControl.valid && this.adressStreetNameControl.valid && this.adressStreetNrControl.valid && this.cityCountryCodeControl.valid && this.cityPostalCodeControl.valid && this.cityNameControl.valid) {
      return true;
    }
    return true;
  }

}
