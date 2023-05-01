import CardGallery from "../components/CardGallery";
import Search from "../components/Search";
import UseApi from "../hooks/UseApi";

function HomePage() {
  const { data } = UseApi("https://api.noroff.dev/api/v1/holidaze/venues", { method: "GET" });

  let recommendedData = [];

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

  console.log(recommendedData);

  return (
    <>
      <Search />
      <CardGallery heading="Recommended" data={recommendedData} />
    </>
  );
}

export default HomePage;
