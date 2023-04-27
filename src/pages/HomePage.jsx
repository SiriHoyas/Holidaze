import CardGallery from "../components/CardGallery";
import Search from "../components/Search";

function HomePage() {
  return (
    <>
      <Search />
      <CardGallery heading="Recommended" />
      <CardGallery heading="Bring your furry friends" />
    </>
  );
}

export default HomePage;
