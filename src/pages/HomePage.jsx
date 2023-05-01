import { useDispatch, useSelector } from "react-redux";

import Button from "../components/Button";
import CardGallery from "../components/CardGallery";
import Search from "../components/Search";
import getBookedDates from "../js/getBookedDates";
import { setUserInfo } from "../store/UserSlice";

function HomePage() {
  getBookedDates("2023-04-30T00:00:00.000Z", "2023-05-02T00:00:00.000Z");

  return (
    <>
      <Search />
      <CardGallery heading="Recommended" />
      <CardGallery heading="Bring your furry friends" />
    </>
  );
}

export default HomePage;
