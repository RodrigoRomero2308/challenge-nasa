"use client";

import { cameras } from "@/constants/cameras";
import { rovers } from "@/constants/rovers";
import { roverFilterContext } from "@/context/RoverFIlterContext";
import { RoverApiFilter } from "@/interfaces/roverApiFilter";
import { RoverCamera } from "@/interfaces/roverCameraInfo";
import { saveFilterByRover } from "@/utils/filterStorage";
import {
  getDefaultEarthDateFilter,
  getRoverFilterQueryStringsByFilter,
} from "@/utils/roverApiUtils";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";

const RoverFilterForm = ({
  initialRover,
  onSubmit,
}: {
  initialRover: string;
  onSubmit?: () => void;
}) => {
  let componentSize: "small" | "medium" = "small";
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchParamSolDate = searchParams.get("sol");
  const searchParamEarthDate = searchParams.get("earth_date");
  const searchParamCamera = searchParams.get("camera");

  const initialFilterMode = searchParamSolDate ? "sol" : "earthDate";

  const [filterMode, setFilterMode] = useState(initialFilterMode);

  const initialRoverValue =
    rovers.find((item) => item.apiEndpoint === initialRover)?.apiEndpoint ||
    rovers[0].apiEndpoint;

  const [rover, setRover] = useState(initialRoverValue);

  const getCamerasByRover = (rover: string) => {
    const roverInfo = rovers.find((item) => item.apiEndpoint === rover);

    if (!roverInfo) return [];

    const thisRoverCameras = [];

    const fromCameraOptions = [
      {
        code: "all",
        name: "Todas",
      },
      ...cameras,
    ];

    for (const camera of fromCameraOptions) {
      if (roverInfo.cameras.findIndex((item) => item === camera.code) !== -1) {
        thisRoverCameras.push(camera);
      }
    }

    return thisRoverCameras;
  };

  const [cameraOptions, setCameraOptions] = useState(
    getCamerasByRover(initialRoverValue)
  );

  let initialCamera = "all";

  if (
    searchParamCamera &&
    cameras.findIndex((item) => item.code === searchParamCamera)
  ) {
    initialCamera = searchParamCamera;
  }

  const [camera, setCamera] = useState<RoverCamera>(
    initialCamera as RoverCamera
  );

  const handleRoverChange = (ev: SelectChangeEvent<string>) => {
    const value = ev.target.value;

    const roverFound = rovers.find((item) => item.apiEndpoint === value);

    if (!roverFound) return;

    const newCameras = getCamerasByRover(rover);

    /* Checkeamos si la camara actual esta en el nuevo rover, sino cambiamos a all */
    const currentCameraIsValidInNewRover =
      newCameras.findIndex((item) => item.code === camera) !== -1;

    setCameraOptions(newCameras);

    setRover(value);

    if (!currentCameraIsValidInNewRover) setCamera("all");
  };

  const handleCameraChange = (ev: SelectChangeEvent<string>) => {
    const value = ev.target.value;

    const cameraFound = cameras.find((item) => item.code === value);

    if (cameraFound) setCamera(value as RoverCamera);
  };

  const handleRadioChange = (
    ev: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setFilterMode(value);
  };

  const [solDate, setSolDate] = useState<string>(searchParamSolDate || "");

  const handleSolDateChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (ev) => {
    const value = ev.target.value;

    if (!value) return setSolDate("");

    const notNumbersRegex = /[^0-9]/g;

    const inputHasInvalidCharacters = notNumbersRegex.test(value);

    if (!inputHasInvalidCharacters) setSolDate(value);
  };

  const [earthDate, setEarthDate] = useState<string>(
    searchParamEarthDate || getDefaultEarthDateFilter()
  );

  const handleEarthDateChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (ev) => {
    setEarthDate(ev.target.value);
  };

  const handleSubmit: FormEventHandler = (ev) => {
    ev.preventDefault();

    const filterObject: RoverApiFilter = {
      camera,
    };

    if (filterMode === "sol") {
      if (solDate) filterObject.sol = Number(solDate);
    } else {
      if (earthDate) filterObject.earthDate = earthDate;
    }

    saveFilterByRover(filterObject, rover);
    const searchParams = getRoverFilterQueryStringsByFilter(filterObject);

    onSubmit?.();

    router.replace(`/${rover}?${searchParams.toString()}`);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
      onSubmit={handleSubmit}
    >
      <FormControl size={componentSize}>
        <FormLabel>Rover</FormLabel>
        <Select value={rover} onChange={handleRoverChange}>
          {rovers.map((item) => (
            <MenuItem key={item.apiEndpoint} value={item.apiEndpoint}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size={componentSize}>
        <FormLabel>Cámara</FormLabel>
        <Select defaultValue="all" value={camera} onChange={handleCameraChange}>
          {cameraOptions.map((item) => (
            <MenuItem key={item.code} value={item.code}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size={componentSize}>
        <FormLabel>Fecha</FormLabel>
        <RadioGroup
          name="date-filter-options"
          defaultValue="earthDate"
          value={filterMode}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="earthDate"
            control={<Radio />}
            label="Dia terrestre"
          />
          <FormControlLabel
            value="sol"
            control={<Radio />}
            label="Día solar de marte"
          />
        </RadioGroup>
      </FormControl>
      {filterMode === "sol" ? (
        <FormControl size={componentSize}>
          <FormLabel>Día solar de marte</FormLabel>
          <Input
            type="number"
            placeholder="Ingrese el número del día"
            value={solDate}
            onChange={handleSolDateChange}
          ></Input>
        </FormControl>
      ) : (
        <FormControl size={componentSize}>
          <FormLabel>Día terrestre</FormLabel>
          <Input
            type="date"
            value={earthDate}
            onChange={handleEarthDateChange}
          ></Input>
        </FormControl>
      )}
      <Button type="submit">Guardar</Button>
    </form>
  );
};

export default RoverFilterForm;
