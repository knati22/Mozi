import { Felhasznalo } from "./felhasznalo";
import { Filmrol } from "./filmrol";
export interface Jegy {
    id: number;
    vevo: Felhasznalo;
    film: Filmrol;
}
