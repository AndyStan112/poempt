import type { NextPage } from "next";
import { Alert, Button } from "flowbite-react";
import MainNavbar from "../components/navbar";
import MainPage from "../components/page";
import InputCard from "../components/inputcard";
import PoemCard from "../components/poemcard";
import { useAtomValue } from "jotai";
import { poemImageAtom, poemTextAtom, requestErrorAtom } from "../utils/atoms";
import HeroBanner from "../components/herobanner";
import { useState } from "react";
import MainFooter from "../components/footer";

const Home: NextPage = () => {
  const requestError = useAtomValue(requestErrorAtom);
  const poemText = useAtomValue(poemTextAtom);
  const poemImage = useAtomValue(poemImageAtom);

  const [showInputCard, setShowInputCard] = useState(false);

  return (
    <>
      <MainNavbar />
      <MainPage>
        <HeroBanner />
        <InputCard />
        {requestError && (
          <Alert color="failure" className="mb-4 mx-auto shadow-md">
            <span>
              <span className="font-medium">Info alert!</span> Change a few
              things up and try submitting again.
            </span>
          </Alert>
        )}
        {!requestError && poemText.length > 0 && (
          <>
            <PoemCard title="My poem" image={poemImage}>
              {poemText}
            </PoemCard>
            <div className="flex flex-row gap-2 justify-center">
              <Button color="gray" size="xs">
                Generate another poem
              </Button>
            </div>
          </>
        )}
      </MainPage>
      <MainFooter />
    </>
  );
};

export default Home;
