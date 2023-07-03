import { RoverInfo } from "@/interfaces/roverInfo";

export const rovers: RoverInfo[] = [
  {
    name: "Curiosity",
    apiEndpoint: "curiosity",
    cameras: [
      "FHAZ",
      "RHAZ",
      "MAST",
      "CHEMCAM",
      "MAHLI",
      "MARDI",
      "NAVCAM",
      "all",
    ],
  },
  {
    name: "Opportunity",
    apiEndpoint: "opportunity",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES", "all"],
  },
  {
    name: "Spirit",
    apiEndpoint: "spirit",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES", "all"],
  },
];
