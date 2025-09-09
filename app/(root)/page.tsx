import { Fragment } from "react";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";

const Home = () => {
  return (
    <Fragment>
      <BookOverview />

      <BookList />
    </Fragment>
  );
};

export default Home;
