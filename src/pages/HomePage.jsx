import CardGallery from "../components/CardGallery";
import Search from "../components/Search";
import UseApi from "../hooks/UseApi";

function HomePage() {
  const { data } = UseApi("https://api.noroff.dev/api/v1/holidaze/venues", { method: "GET" });

  let recommendedData = [];
  let allowPetsData = [];

  const filterByMedia = data.filter((item) => {
    if (item.media.length > 0) {
      return item;
    }
  });

  for (let i = 0; i < filterByMedia.length; i++) {
    if (i <= 3) {
      recommendedData.push(filterByMedia[i]);
    }
  }

  const filterByPets = data.filter((item) => {
    if (item.meta.pets) {
      return item;
    }
  });

  for (let i = 0; i < filterByPets.length; i++) {
    if (i <= 3) {
      allowPetsData.push(filterByPets[i]);
    }
  }

  return (
    <>
      <Search />
      <CardGallery heading="Recommended" data={recommendedData} />
      <CardGallery heading="Bring your furry friends!" data={allowPetsData} />
    </>
  );
}

export default HomePage;
