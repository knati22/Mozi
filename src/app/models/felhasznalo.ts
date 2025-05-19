import { Jegy } from "./jegy";
export interface Felhasznalo {
    id: string;
    nev: {
        vezeteknev: string;
        keresztnev: string;
      };
      email: string;
      jelszo: string;
      jegyei: Jegy[];
}
