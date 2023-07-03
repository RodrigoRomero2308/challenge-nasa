import { RoverCameraInfo } from "./roverCameraInfo";

export interface RoverInfo {
  name: string;
  apiEndpoint: string;
  cameras: RoverCameraInfo;
}
