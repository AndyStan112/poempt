import type { NextPage } from 'next';
import MainNavbar from '../components/navbar';
import MainPage from '../components/page';
import Waves from '../waves';
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
import { Poem } from '../types';

const PublicLibrary: NextPage = () => {
  const requestError = useAtomValue(requestErrorAtom);
  const [poems, setPoems] = useState<Poem[]>([]);
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
            Your Library
          </h1>
          <p className="text-white text-center drop-shadow-lg">
            Here are your last 5 generated poems: <br />
            Make sure to bookmark the ones you like! <br />
            Otherwise they will be lost forever
          </p>
        </HeroBanner>
        <div>
          {session &&
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
