import type { NextPage } from 'next';
import { Alert, Button, Select } from 'flowbite-react';
import MainNavbar from '../components/navbar';
import MainPage from '../components/page';
import Waves from '../components/waves';
import { useAtomValue, useAtom } from 'jotai';
import {
  loadingPoemAtom,
  loadingImageAtom,
  poemShowAtom,
  poemImageAtom,
  poemTextAtom,
  requestErrorAtom,
} from '../lib/atoms';
import HeroBanner from '../components/herobanner';
import MainFooter from '../components/footer';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import LibraryCard from '../components/librarycard';

const PublicLibrary: NextPage = () => {
  const requestError = useAtomValue(requestErrorAtom);
  const [poems, setPoems] = useState([]);
  const loadingPoem = useAtomValue(loadingPoemAtom);
  const loadingImage = useAtomValue(loadingImageAtom);
  useEffect(() => {
    fetch('/api/poems/get/all', {
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
  }, []);
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

export default PublicLibrary;
