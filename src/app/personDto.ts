import { AdressDto } from "./adressDto";

export interface PersonDto {
    firstname: string,
    lastname: string,
    born: string,
    tel: string,
    adress: AdressDto
}