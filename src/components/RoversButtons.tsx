"use client";

import { rovers } from "@/constants/rovers";
import useFilterStorage, { StoredFilter } from "@/hooks/useFilterStorage";
import { getRoverFilterQueryStringsByFilter } from "@/utils/roverApiUtils";
import { Button, Fade, Link, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoritesLinkButton from "./favorites/FavoritesLinkButton";

const RoversButtons = ({
  showFavoritesButton,
}: {
  showFavoritesButton?: boolean;
}) => {
  const { getAllFilters } = useFilterStorage();
  const [filters, setFilters] = useState<StoredFilter[]>([]);

  useEffect(() => {
    setFilters(getAllFilters());
  }, []);

  return (
    <Fade in timeout={2000}>
      <div
        style={{
          padding: "0 16px",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <Stack spacing={2}>
          {rovers.map((rover) => {
            const thisRoverFilters = filters.find(
              (item) => item.rover === rover.apiEndpoint
            );
            let href = `/${rover.apiEndpoint}`;
            if (thisRoverFilters) {
              const searchParams = getRoverFilterQueryStringsByFilter(
                thisRoverFilters.filter
              );
              href = href + `?${searchParams.toString()}`;
            }
            return (
              <Link
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                key={rover.apiEndpoint}
                href={href}
              >
                <Button key={rover.name} variant="contained">
                  {rover.name}
                </Button>
              </Link>
            );
          })}
          {showFavoritesButton && <FavoritesLinkButton />}
        </Stack>
      </div>
    </Fade>
  );
};

export default RoversButtons;
