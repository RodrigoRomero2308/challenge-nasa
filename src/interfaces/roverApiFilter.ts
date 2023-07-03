import { RoverCamera } from "./roverCameraInfo";

export type RoverApiFilter = RoverApiFilterBySOL | RoverApiFilterByEarthDate;

interface RoverBaseApiFilter {
  camera?: RoverCamera;
  page?: number;
}

export interface RoverApiFilterBySOL extends RoverBaseApiFilter {
  earthDate?: string;
  sol?: never;
}

export interface RoverApiFilterByEarthDate extends RoverBaseApiFilter {
  sol?: number;
  earthDate?: never;
}
