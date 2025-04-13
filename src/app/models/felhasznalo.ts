import { Jegy } from "./jegy";
export interface Felhasznalo {
    nev: {
        vezeteknev: string;
        keresztnev: string;
      };
      email: string;
      jelszo: string;
      jegyei: Jegy[];
}
