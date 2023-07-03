import { RoverApiFilter } from "@/interfaces/roverApiFilter";
import { Dispatch, SetStateAction, createContext } from "react";

interface RoverFilterContext {
  filter?: RoverApiFilter;
  setFilter: Dispatch<SetStateAction<RoverApiFilter | undefined>>;
}

export const roverFilterContext = createContext<RoverFilterContext>({
  setFilter: () => undefined,
});

export const RoverFilterProvider = roverFilterContext.Provider;
