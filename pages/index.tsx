/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { Button, Card } from "flowbite-react";
import MainNavbar from "../components/navbar";
import MainPage from "../components/page";
import Waves from "../components/waves";
import HeroBanner from "../components/herobanner";
import MainFooter from "../components/footer";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Waves height="700px" />
      <MainNavbar />
      <MainPage>
        <HeroBanner>
          <div className="flex flex-col md:flex-row gap-8 mb-[150px] h-[500px]">
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
            <div className="flex-1 flex flex-col gap-4 justify-center text-center md:text-left">
              <h1 className="text-white text-3xl md:text-5xl drop-shadow-lg">
                AI Based Poem Generator
              </h1>
              <p className="text-white drop-shadow-lg text-lg md:text-xl">
                Experience the magic of poetry in every line: <br />
                Let our AI poet captivate your imagination.
              </p>
              <div className="flex flex-row justify-center md:justify-start">
                <Link href="/generate">
                  <Button color="gray" size="lg">
                    Generate a poem now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </HeroBanner>

        <div className="flex flex-col gap-16">
          <div className="flex flex-col md:flex-row gap-16 md:mx-24">
            <div className="flex-1 md:w-1/2 flex flex-col justify-center gap-2">
              <h1 className="text-3xl">Using the latest generative models</h1>
              <p className="mt-2">
                PoemPT is an AI-powered poetry generator that brings together
                the magic of words and technology. With the click of a button,
                our platform can craft unique and captivating poems, each one
                inspired by your chosen topic or theme.
              </p>
              <p className="mt-2">
                Not only does our AI poet generate words, but it can also create
                a stunning visual representation of the poem, giving it a whole
                new dimension. Whether you&apos;re looking to find inspiration
                or simply want to enjoy the beauty of language, our platform is
                the perfect place to unlock your creativity and explore the
                power of AI-generated poetry.
              </p>
            </div>
            <div className="flex-1 md:w-1/2 flex justify-center items-center">
              <img
                src="hero_image_2.png"
                alt="Robot"
                className="sm:h-[300px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-center text-4xl mb-20">Meet the team</h1>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <Card className="flex flex-col justify-center mb-20 min-w-[300px]">
                <div className="flex justify-center">
                  <img
                    className="-mt-24 h-36 w-36 rounded-full shadow-lg"
                    src="https://cdn.discordapp.com/attachments/1045767749655351406/1091956098858242178/IMG_5684.jpg"
                    alt="Profile Image"
                  />
                </div>
                <div>
                  <h1 className="text-2xl text-center">Andy</h1>
                  <h2 className="text-gray-600 text-center">Stănică</h2>
                  <h3 className="text-gray-600 text-sm text-center">
                    Lead Backend Developer
                  </h3>
                </div>
              </Card>
              <Card className="flex flex-col justify-center mb-20 min-w-[300px]">
                <div className="flex justify-center">
                  <img
                    className="-mt-24 h-36 w-36 rounded-full shadow-lg"
                    src="https://cdn.discordapp.com/avatars/551803495057981465/ae1d2139a0d001071d2b525d30ecb38c.webp?size=240"
                    alt="Profile Image"
                  />
                </div>
                <div>
                  <h1 className="text-2xl text-center">Radu</h1>
                  <h2 className="text-gray-600 text-center">Mîrzoca</h2>
                  <h3 className="text-gray-600 text-sm text-center">
                    Lead Frontent and UX Developer
                  </h3>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </MainPage>
      <MainFooter />
    </>
  );
};

export default Home;
