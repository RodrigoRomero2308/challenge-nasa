import FloatingFilterButton from "@/components/FloatingFilterButton";
import FormAside from "@/components/FilterFormAside";
import RoverPageTitle from "@/components/RoverPageTitle";
import RoverPhotoList from "@/components/RoverPhotoList";
import React from "react";
import FloatingBackButton from "@/components/FloatingBackButton";

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
      <FloatingBackButton />
      <FloatingFilterButton />
    </div>
  );
};

export default page;
