import { DepotDto } from "./depotDto"

export interface UserDto {
    id: number
    name: string
    cash: number
    depots: DepotDto[]
}