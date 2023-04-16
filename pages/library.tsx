import type { NextPage } from "next";
import MainNavbar from "../components/navbar";
import MainPage from "../components/page";
import Waves from "../components/waves";
import { useSetAtom } from "jotai";
import { showLoginModalAtom } from "../lib/atoms";
import HeroBanner from "../components/herobanner";
import MainFooter from "../components/footer";
import { useState } from "react";
import { useEffect } from "react";
import LibraryCard from "../components/librarycard";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Poem } from "../types";
import { Spinner } from "flowbite-react";

const PublicLibrary: NextPage = () => {
  const openLoginModal = useSetAtom(showLoginModalAtom);

  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();
  console.log(router);

  useEffect(() => {
    if (session === null) openLoginModal(true);
  });

  useEffect(() => {
    if (status !== "authenticated" || !session) return;
    setLoading(true);
    fetch("/api/poems/get/u/" + session.id, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        //console.log(data.poems);
        setPoems(data.poems);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [session, status]);

  return (
    <>
      <Waves height="500px" animate={loading} />
      <MainNavbar />
      <MainPage>
        <HeroBanner>
          <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
            Your Library
          </h1>
          <p className="text-white text-center drop-shadow-lg">
            Here are your last 5 generated poems
            <br />
            Bookmark the ones you like, otherwise they&apos;ll be gone soon
          </p>
        </HeroBanner>
        {session && loading && (
          <div className="bg-white shadow-md p-3 flex flex-col gap-4 rounded-lg w-[200px] text-center mx-auto mb-6">
            <p>Loading poems...</p>
            <Spinner aria-label="Loading poems" color="success" size="xl" />
          </div>
        )}
        <div>
          {session &&
            !loading &&
            poems &&
            poems.map((poem, i) => {
              console.log(poem);
              return (
                <LibraryCard
                  title={poem.title}
                  text={poem.poem}
                  bookmark={undefined}
                  key={poem.id}
                  userName={poem.creator.name}
                  userImage={poem.creator.image}
                  poemImage={poem.image}
                  sessionId={session.id}
                  poemId={poem.id}
                ></LibraryCard>
              );
            })}
        </div>
      </MainPage>
      <MainFooter />
    </>
  );
};

export default PublicLibrary;
