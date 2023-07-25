import type { NextPage } from "next";
import MainNavbar from "../components/navbar";
import MainPage from "../components/page";
import Waves from "../waves";
import HeroBanner from "../components/herobanner";
import MainFooter from "../components/footer";
import { useMemo, useState, useEffect } from "react";
import LibraryCard from "../components/librarycard";
import { useRouter } from "next/router";
import Pagination from "../components/pagination";
import { useSession } from "next-auth/react";
import { Poem } from "../types/index";
import { Spinner } from "flowbite-react";

const SharedPoem: NextPage = () => {
  const [poem, setPoem] = useState<Poem>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const poemId = useMemo(
    () => String(router.query.id) || "unknown",
    [router.query]
  );

  useEffect(() => {
    // if the function runs on the server, the router will be undefined
    if (poemId == undefined || poemId == "unknown") return;
    // console.log(poemId);
    setLoading(true);
    fetch(`/api/share/${poemId}`, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data.poem);
        setPoem(data.poem);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [poemId]);

  return (
    <>
      <Waves hue={280} height="500px" animate={loading} />
      <MainNavbar />
      <MainPage>
        <HeroBanner>
          <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
            Shared poem
          </h1>
        </HeroBanner>
        {loading && (
          <div className="bg-white shadow-md p-3 flex flex-col gap-4 rounded-lg w-[200px] text-center mx-auto mb-6">
            <p>Loading poem...</p>
            <Spinner aria-label="Loading poems" color="success" size="xl" />
          </div>
        )}
        <div>
          {!loading && poem && (
            <LibraryCard
              title={poem.title}
              text={poem.poem}
              bookmark={false}
              key={poem.id}
              poemId={poem.id}
              userName={poem.creator.name}
              userImage={poem.creator.image}
              sessionId={session ? session.id : undefined}
              poemImage={poem.image}
            ></LibraryCard>
          )}
        </div>
      </MainPage>
      <MainFooter />
    </>
  );
};

export default SharedPoem;
