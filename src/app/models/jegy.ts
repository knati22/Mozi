import { Felhasznalo } from "./felhasznalo";
import { Filmrol } from "./filmrol";
export interface Jegy {
    azonosito: number;
    vevo: Felhasznalo;
    film: Filmrol;
}
