import { Case } from "./Case";
import { GraphicsCard } from "./GraphicsCard";
import { MotherBoard } from "./MotherBoard";
import { PC } from "./Pc";
import { Processor } from "./Processor";
import { PSU } from "./PSU";
import { RAM } from "./RAM";

export interface Products {
    processors: Processor[];
    graphicsCards: GraphicsCard[];
    raMs: RAM[];
    cases: Case[];
    psUs: PSU[];
    motherBoards: MotherBoard[];
}