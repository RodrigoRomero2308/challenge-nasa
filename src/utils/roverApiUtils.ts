import { RoverApiFilter } from "@/interfaces/roverApiFilter";
import { RoverCamera } from "@/interfaces/roverCameraInfo";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getDefaultEarthDateFilter = () => {
  const now = new Date();

  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
};

export const getRoverFilterQueryStringsByFilter = (filter: RoverApiFilter) => {
  const params = new URLSearchParams();
  if (filter.camera && filter.camera !== "all")
    params.append("camera", filter.camera);
  if (filter.earthDate) params.append("earth_date", filter.earthDate);
  else if (filter.sol) params.append("sol", filter.sol.toString());
  else params.append("earth_date", getDefaultEarthDateFilter());

  return params;
};

export const getRoverApiQueryStringsByFilter = (filter: RoverApiFilter) => {
  const params = getRoverFilterQueryStringsByFilter(filter);

  params.append("page", filter.page?.toString() || "1");
  params.append("api_key", process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY");

  return params;
};

export const getFilterFromQueryParams = (
  queryParams: ReadonlyURLSearchParams
) => {
  const filter: RoverApiFilter = {};

  const cameraQueryParam = queryParams.get("camera");
  if (cameraQueryParam) filter.camera = cameraQueryParam as RoverCamera;

  const pageQueryParam = queryParams.get("page");
  filter.page = pageQueryParam ? Number(pageQueryParam) : 1;

  const solDateParam = queryParams.get("sol");
  if (solDateParam && !Number.isNaN(solDateParam))
    filter.sol = Number(solDateParam);
  else {
    const earthDateParam = queryParams.get("earth_date");
    filter.earthDate = earthDateParam || getDefaultEarthDateFilter();
  }

  return filter;
};
