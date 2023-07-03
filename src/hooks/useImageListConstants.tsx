"use client";

import { useMediaQuery, useTheme } from "@mui/material";

const useImageListConstants = () => {
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
  return {
    listCols,
    getColAndRowSpanByIndex,
  };
};

export default useImageListConstants;
