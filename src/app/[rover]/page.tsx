import FloatingFilterButton from "@/components/FloatingFilterButton";
import FormAside from "@/components/FilterFormAside";
import RoverPageTitle from "@/components/RoverPageTitle";
import RoverPhotoList from "@/components/RoverPhotoList";
import React from "react";

const page = ({
  params,
}: {
  params: {
    rover: string;
  };
}) => {
  return (
    <div key={params.rover}>
      <RoverPageTitle />
      <div
        style={{
          display: "flex",
        }}
      >
        <RoverPhotoList rover={params.rover} />
        <FormAside />
      </div>
      <FloatingFilterButton />
    </div>
  );
};

export default page;
