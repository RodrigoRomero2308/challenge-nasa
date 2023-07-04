import FloatingBackButton from "@/components/FloatingBackButton";
import FavoritesList from "@/components/favorites/FavoritesList";
import React from "react";

const page = () => {
  return (
    <div>
      <FavoritesList />
      <FloatingBackButton />
    </div>
  );
};

export default page;
