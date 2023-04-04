import type { NextPage } from 'next';
import MainNavbar from '../components/navbar';
import MainPage from '../components/page';
import Waves from '../components/waves';
import { useAtomValue, useAtom } from 'jotai';
import {
  loadingPoemAtom,
  loadingImageAtom,
  requestErrorAtom,
} from '../lib/atoms';
import HeroBanner from '../components/herobanner';
import MainFooter from '../components/footer';
import { useState } from 'react';
import { useEffect } from 'react';
import LibraryCard from '../components/librarycard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
const Bookmarks: NextPage = () => {
  const requestError = useAtomValue(requestErrorAtom);
  const [bookmarks, setBookmarks] = useState([]);
  const loadingPoem = useAtomValue(loadingPoemAtom);
  const loadingImage = useAtomValue(loadingImageAtom);
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== 'authenticated') return () => {};
    fetch('/api/bookmarks/get/' + session.id, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        //console.log(data.poems);
        setBookmarks(data.bookmarks);
      })
      .catch((e) => console.log(e));
  }, [status]);
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
          {bookmarks.map(({ poem }, i) => {
            console.log(poem);
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
      </MainPage>
      <MainFooter />
    </>
  );
};

export default Bookmarks;
