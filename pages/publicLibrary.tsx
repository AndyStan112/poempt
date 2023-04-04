import type { NextPage } from 'next';
import { Alert, Button, Select } from 'flowbite-react';
import MainNavbar from '../components/navbar';
import MainPage from '../components/page';
import Waves from '../components/waves';
import { useAtomValue } from 'jotai';
import { loadingPoemAtom } from '../lib/atoms';
import HeroBanner from '../components/herobanner';
import MainFooter from '../components/footer';
import { useMemo, useState, useEffect } from 'react';
import LibraryCard from '../components/librarycard';
import { useRouter } from 'next/router';
import Pagination from '../components/pagination';
const PublicLibrary: NextPage = () => {
  const [poems, setPoems] = useState([]);
  const loadingPoem = useAtomValue(loadingPoemAtom);
  const router = useRouter();
  const skip = useMemo(() => Number(router.query.skip) || 0, [router.query]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // if the function runs on the server, the router will be undefined
    if (skip == undefined) return;
    console.log(skip);
    fetch(`/api/poems/get/all?skip=${skip}`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data.poems);
        setPoems(data.poems);
        setTotal(data.total);
      })
      .catch((e) => console.log(e));
  }, [skip]);

  return (
    <>
      <Waves hue={280} height="500px" animate={loadingPoem} />
      <MainNavbar />
      <MainPage>
        <HeroBanner>
          <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
            AI Based Poem Generator
          </h1>
          <p className="text-white text-center drop-shadow-lg">
            Discover a new way to see the world: <br />
            Let our AI poem generator bring your words to life with stunning
            visuals.
          </p>
        </HeroBanner>
        <div>
          {poems &&
            poems.map((poem, i) => {
              //console.log(poem);
              return (
                <LibraryCard
                  title={poem.title}
                  text={poem.poem}
                  public={true}
                  key={poem.id}
                  userName={poem.creator.name}
                  userImage={poem.creator.image}
                ></LibraryCard>
              );
            })}
        </div>
        <Pagination
          take={2}
          skip={skip}
          total={total}
          router={router}
        ></Pagination>
      </MainPage>
      <MainFooter />
    </>
  );
};

export default PublicLibrary;
