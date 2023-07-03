import { RoverPhotoDTO } from "@/interfaces/roverPhotoDTO";
import Dexie, { Table } from "dexie";

export class MarsRoverDatabase extends Dexie {
  favorites!: Table<RoverPhotoDTO>;

  constructor() {
    super("marsRoverDatabase");
    this.version(1).stores({
      favorites: "id",
    });
  }
}

export const db = new MarsRoverDatabase();
