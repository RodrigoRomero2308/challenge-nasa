import LandingTitle from "@/components/LandingTitle";
import RoversButtons from "@/components/RoversButtons";

export default async function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#000 url(https://mars.nasa.gov/assets/footer_bg.png) center bottom no-repeat",
        backgroundSize: "cover",
      }}
    >
      <LandingTitle />

      <RoversButtons showFavoritesButton />
    </div>
  );
}
