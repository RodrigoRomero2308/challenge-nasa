"use client";

import {
  MARS_ROVER_API_BASE_URL,
  MARS_ROVER_PHOTOS_PAGE_SIZE,
} from "@/constants/constants";
import { RoverPhotoDTO } from "@/interfaces/roverPhotoDTO";
import {
  getFilterFromQueryParams,
  getRoverApiQueryStringsByFilter,
} from "@/utils/roverApiUtils";
import {
  CircularProgress,
  Container,
  ImageList,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import RoverPhoto from "./RoverPhoto";
import { rovers } from "@/constants/rovers";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { RoverApiFilter } from "@/interfaces/roverApiFilter";

async function getRoverData({
  rover,
  abortSignal,
  filter,
}: {
  rover?: string;
  abortSignal?: AbortSignal;
  filter?: RoverApiFilter;
} = {}): Promise<{ photos: RoverPhotoDTO[] }> {
  const roverEndpoint = rover || "curiosity";

  const searchParams = getRoverApiQueryStringsByFilter(filter || {});

  const res = await fetch(
    `${MARS_ROVER_API_BASE_URL}/rovers/${roverEndpoint}/photos?${searchParams.toString()}`,
    {
      signal: abortSignal,
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching data from NASA API");
  }

  return res.json();
}

const RoverPhotoList = ({ rover }: { rover: string }) => {
  const [imageData, setImageData] = useState<RoverPhotoDTO[]>([]);
  const currentPageRef = useRef(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const searchParams = useSearchParams();

  const filters = getFilterFromQueryParams(searchParams);

  const theme = useTheme();
  const smActive = useMediaQuery(theme.breakpoints.up("sm"));

  let listCols = 3;

  let getColAndRowSpanByIndex = (
    index: number
  ): {
    row: number;
    col: number;
  } => {
    const value = (index + 1) % 25;

    switch (value) {
      case 4:
      case 18:
        return {
          row: 2,
          col: 1,
        };
      case 13:
        return {
          row: 2,
          col: 2,
        };
      default:
        return {
          row: 1,
          col: 1,
        };
    }
  };

  switch (true) {
    case smActive:
      listCols = 4;
      getColAndRowSpanByIndex = (index) => {
        const value = (index + 1) % 25;

        switch (value) {
          case 5:
          case 17:
            return {
              row: 2,
              col: 2,
            };
          case 13:
            return {
              row: 2,
              col: 1,
            };
          default:
            return {
              row: 1,
              col: 1,
            };
        }
      };
      break;
    default:
      break;
  }

  async function fetchMorePhotos({
    abortSignal,
  }: { abortSignal?: AbortSignal } = {}) {
    setLoadingPhotos(true);

    getRoverData({
      abortSignal: abortSignal,
      filter: {
        ...filters,
        page: currentPageRef.current,
      },
      rover,
    })
      .then(({ photos }) => {
        if (photos.length < MARS_ROVER_PHOTOS_PAGE_SIZE) {
          setHasMoreData(false);
        }
        currentPageRef.current++;
        setImageData((oldPhotos) => oldPhotos.concat(...photos));
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      })
      .finally(() => {
        setLoadingPhotos(false);
      });
  }

  const resetList = ({ abortSignal }: { abortSignal?: AbortSignal } = {}) => {
    currentPageRef.current = 1;
    setImageData([]);
    setHasMoreData(true);
    return fetchMorePhotos({ abortSignal });
  };

  useEffect(() => {
    const getRoverAbortController = new AbortController();
    let fetched = false;

    resetList({ abortSignal: getRoverAbortController.signal }).then(() => {
      fetched = true;
    });

    return () => {
      if (!fetched) {
        getRoverAbortController.abort();
      }
    };
  }, [searchParams]);

  const [fetchDiv, setFetchDiv] = useState<Element | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((item) => item.isIntersecting)) {
          fetchMorePhotos();
        }
      },
      {
        rootMargin: "0px 0px -200px 0px",
        threshold: 0.25,
      }
    );
    if (fetchDiv && hasMoreData) {
      observer.observe(fetchDiv);
    }

    return () => {
      if (fetchDiv) {
        observer.unobserve(fetchDiv);
      }
    };
  }, [fetchDiv, hasMoreData]);

  let imageListComponent = (
    <ImageList variant="quilted" cols={listCols} rowHeight={"auto"} gap={4}>
      {imageData.map((item, index) => {
        const spans = getColAndRowSpanByIndex(index);
        return (
          <RoverPhoto
            image={item}
            key={item.id}
            ref={index === imageData.length - 1 ? setFetchDiv : undefined}
            rows={spans.row}
            cols={spans.col}
          />
        );
      })}
    </ImageList>
  );

  if (!loadingPhotos && !imageData.length) {
    imageListComponent = (
      <div>
        <Typography variant="body1">
          No hay imágenes disponibles. Prueba modificar los filtros de búsqueda
        </Typography>
      </div>
    );
  }

  return (
    <Container
      sx={{
        padding: 2,
      }}
    >
      <div key="list">{imageListComponent}</div>
      {loadingPhotos && (
        <Stack
          key="loading"
          style={{
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Stack>
      )}
    </Container>
  );
};

export default RoverPhotoList;
