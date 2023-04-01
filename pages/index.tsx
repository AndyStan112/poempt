/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { Alert, Button } from "flowbite-react";
import MainNavbar from "../components/navbar";
import MainPage from "../components/page";
import Waves from "../components/waves";
import HeroBanner from "../components/herobanner";
import MainFooter from "../components/footer";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Waves hue={280} height="700px" />
      <MainNavbar />
      <MainPage>
        <HeroBanner>
          <div className="flex flex-row h-[450px]">
            <div
              className="flex-1 flex items-center justify-center bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: "url(hero_bg.png)" }}
            >
              <img
                src="hero_image.png"
                alt="Hero Image"
                className="w-1/2 mt-14"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 justify-center">
              <h1 className="text-white text-5xl drop-shadow-lg">
                AI Based Poem Generator
              </h1>
              <p className="text-white drop-shadow-lg text-xl">
                Experience the magic of poetry in every line: <br />
                Let our AI poet captivate your imagination.
              </p>
              <div>
                <Link href="/generate">
                  <Button color="green" size="lg">
                    Generate a poem now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </HeroBanner>
      </MainPage>
      <MainFooter />
    </>
  );
};

export default Home;
