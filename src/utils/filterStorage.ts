import { LOCAL_STORAGE_FILTER_KEY } from "@/constants/constants";
import { RoverApiFilter } from "@/interfaces/roverApiFilter";

interface StoredFilter {
  rover: string;
  filter: RoverApiFilter;
}

export const getFilterByRover = (rover: string) => {
  console.log("obteniendo");
  let filtersStored = localStorage.getItem(LOCAL_STORAGE_FILTER_KEY);

  if (!filtersStored) return;

  const filters: StoredFilter[] = JSON.parse(filtersStored);

  return filters.find((item) => item.rover === rover);
};

export const saveFilterByRover = (filter: RoverApiFilter, rover: string) => {
  console.log("guardando");
  let filtersStored = localStorage.getItem(LOCAL_STORAGE_FILTER_KEY);

  if (!filtersStored) {
    localStorage.setItem(
      LOCAL_STORAGE_FILTER_KEY,
      JSON.stringify([
        {
          rover,
          filter,
        },
      ])
    );

    return;
  }

  const filters: StoredFilter[] = JSON.parse(filtersStored);

  const roverFilter = filters.find((item) => item.rover === rover);

  if (roverFilter) {
    roverFilter.filter = filter;

    localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(filters));

    return;
  }

  filters.push({
    rover,
    filter,
  });

  localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(filters));
};
