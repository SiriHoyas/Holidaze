import { useDispatch, useSelector } from "react-redux";

import Button from "../components/Button";
import CardGallery from "../components/CardGallery";
import Search from "../components/Search";
import { setUserInfo } from "../store/UserSlice";

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
