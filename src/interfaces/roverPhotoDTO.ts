export interface RoverPhotoDTO {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}
