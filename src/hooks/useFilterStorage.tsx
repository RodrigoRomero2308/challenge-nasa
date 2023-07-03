"use client";

import React from "react";
import { LOCAL_STORAGE_FILTER_KEY } from "@/constants/constants";
import { RoverApiFilter } from "@/interfaces/roverApiFilter";

interface StoredFilter {
  rover: string;
  filter: RoverApiFilter;
}

const useFilterStorage = () => {
  const getFilterByRover = (rover: string) => {
    if (typeof window === "undefined" || !window.localStorage) return;
    let filtersStored = localStorage.getItem(LOCAL_STORAGE_FILTER_KEY);

    if (!filtersStored) return;

    const filters: StoredFilter[] = JSON.parse(filtersStored);

    return filters.find((item) => item.rover === rover);
  };

  const saveFilterByRover = (filter: RoverApiFilter, rover: string) => {
    if (typeof window === "undefined" || !window.localStorage) return;
    console.log("guardando");
    let filtersStored = window.localStorage.getItem(LOCAL_STORAGE_FILTER_KEY);

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

  return {
    getFilterByRover,
    saveFilterByRover,
  };
};

export default useFilterStorage;
