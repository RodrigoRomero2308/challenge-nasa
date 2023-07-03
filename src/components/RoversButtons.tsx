"use client";

import { rovers } from "@/constants/rovers";
import useFilterStorage from "@/hooks/useFilterStorage";
import { getRoverFilterQueryStringsByFilter } from "@/utils/roverApiUtils";
import { Button, Fade, Link, Stack } from "@mui/material";
import React from "react";

const RoversButtons = () => {
  const { getFilterByRover } = useFilterStorage();
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
            const thisRoverFilters = getFilterByRover(rover.apiEndpoint);
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
        </Stack>
      </div>
    </Fade>
  );
};

export default RoversButtons;
