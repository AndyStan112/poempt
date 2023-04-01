import type { NextPage } from "next";
import { Alert, Button } from "flowbite-react";
import MainNavbar from "../components/navbar";
import MainPage from "../components/page";
import InputCard from "../components/inputcard";
import PoemCard from "../components/poemcard";
import LogInCard from "../components/LogInCard";
import Waves from "../components/waves";
import { useAtomValue, useAtom } from "jotai";
import {
  loadingPoemAtom,
  poemShowAtom,
  poemImageAtom,
  poemTextAtom,
  requestErrorAtom,
} from "../lib/atoms";
import HeroBanner from "../components/herobanner";
import MainFooter from "../components/footer";

const Home: NextPage = () => {
  const requestError = useAtomValue(requestErrorAtom);
  const [poemShow, setPoemShow] = useAtom(poemShowAtom);
  const poemText = useAtomValue(poemTextAtom);
  const poemImage = useAtomValue(poemImageAtom);
  const loadingPoem = useAtomValue(loadingPoemAtom);

  return (
    <>
      <LogInCard></LogInCard>
      <Waves hue={280} height="500px" animate={loadingPoem} />
      <MainNavbar />
      <MainPage>
        <HeroBanner>
          <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
            AI Based Poem Generator
          </h1>
          <p className="text-white text-center drop-shadow-lg">
            Unleash the power of words with AI: <br />
            Let our poetry generator paint your world with verse.
          </p>
        </HeroBanner>
        <InputCard />
        {requestError && (
          <Alert color="failure" className="mb-4 mx-auto shadow-md">
            <span>
              <span className="font-medium">Info alert!</span> Change a few
              things up and try submitting again.
            </span>
          </Alert>
        )}
        {!requestError && poemShow && (
          <div
            className={
              !poemShow
                ? "transition duration-700 scale-y-0 opacity-0 -translate-y-1/2 h-0"
                : "transition duration-700"
            }
          >
            <PoemCard
              title="My poem"
              image={poemImage}
              showOptions={true}
              text={poemText}
            />
            <div className="flex flex-row gap-2 justify-center">
              <Button color="gray" size="xs" onClick={() => setPoemShow(false)}>
                Generate another poem
              </Button>
            </div>
          </div>
        )}
      </MainPage>
      <MainFooter />
    </>
  );
};

export default Home;
