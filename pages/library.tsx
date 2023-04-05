import type { NextPage } from 'next';
import MainNavbar from '../components/navbar';
import MainPage from '../components/page';
import Waves from '../components/waves';
import { useAtomValue, useAtom, useSetAtom } from 'jotai';
import {
  loadingPoemAtom,
  loadingImageAtom,
  requestErrorAtom,
  showLoginModalAtom,
} from '../lib/atoms';
import HeroBanner from '../components/herobanner';
import MainFooter from '../components/footer';
import { useState } from 'react';
import { useEffect } from 'react';
import LibraryCard from '../components/librarycard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const PublicLibrary: NextPage = () => {
  const requestError = useAtomValue(requestErrorAtom);
  const [poems, setPoems] = useState([]);
  const loadingPoem = useAtomValue(loadingPoemAtom);
  const loadingImage = useAtomValue(loadingImageAtom);
  const router = useRouter();
  const { data: session, status } = useSession();
  const openLoginModal = useSetAtom(showLoginModalAtom);
  console.log(router);
  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/poems/get/u/' + session.id, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        //console.log(data.poems);
        setPoems(data.poems);
      })
      .catch((e) => console.log(e));
  }, [status]);

  useEffect(() => {
    if (session === null) openLoginModal(true);
  });

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
          {poems.map((poem, i) => {
            console.log(poem);
            return (
              <LibraryCard
                title={poem.title}
                text={poem.poem}
                bookmark={false}
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

export default PublicLibrary;
