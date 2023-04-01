import type { NextPage } from "next";
import MainNavbar from "../components/navbar";
import MainPage from "../components/page";
import InputCard from "../components/inputcard";
import PoemCard from "../components/poemcard";

const Home: NextPage = () => {
  return (
    <>
      <MainNavbar />
      <MainPage>
        <InputCard />
        <PoemCard
          title="My poem"
          image="https://flowbite.com/docs/images/blog/image-4.jpg"
        >
          Here is my poem <br />A very bad poem
        </PoemCard>
      </MainPage>
    </>
  );
};

export default Home;
