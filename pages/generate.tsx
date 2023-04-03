import type { NextPage } from 'next';
import { Alert, Button, Select } from 'flowbite-react';
import MainNavbar from '../components/navbar';
import MainPage from '../components/page';
import InputCard from '../components/inputcard';
import PoemCard from '../components/poemcard';
import Waves from '../components/waves';
import { useAtomValue, useAtom } from 'jotai';
import {
  loadingPoemAtom,
  loadingImageAtom,
  poemShowAtom,
  poemImageAtom,
  poemTextAtom,
  requestErrorAtom,
  poemTitleAtom,
  poemIdAtom,
} from '../lib/atoms';
import HeroBanner from '../components/herobanner';
import MainFooter from '../components/footer';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';

const Generate: NextPage = () => {
  const requestError = useAtomValue(requestErrorAtom);
  const [poemShow, setPoemShow] = useAtom(poemShowAtom);
  const poemId = useAtomValue(poemIdAtom);
  const poemTitle = useAtomValue(poemTitleAtom);
  const poemText = useAtomValue(poemTextAtom);
  const poemImage = useAtomValue(poemImageAtom);
  const loadingPoem = useAtomValue(loadingPoemAtom);
  const loadingImage = useAtomValue(loadingImageAtom);

  const [selectedVoice, setSelectedVoice] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  let ttsVoices: any[] = [];

  function getTtsVoices() {
    ttsVoices = speechSynthesis.getVoices();
    return true;
  }

  function speak() {
    if (isSpeaking) {
      speechSynthesis.cancel();
    } else {
      const utt = new SpeechSynthesisUtterance(poemText);
      utt.voice = ttsVoices[selectedVoice];
      speechSynthesis.speak(utt);
    }
    setIsSpeaking(speechSynthesis.speaking);
  }

  const { data: session, status } = useSession();

  function bookmark() {
    if (status === 'authenticated' && poemId) {
      console.log('bookmark poemId: ' + poemId);
      console.log(session.id);
      fetch('/api/bookmarks/post/' + session.id, {
        body: JSON.stringify({
          userId: session.id,
          poemId: poemId,
        }),
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
      }).then(() => setBookmarked(true));
    }
  }

  return (
    <>
      <Waves hue={280} height="500px" animate={loadingPoem} />
      <MainNavbar />
      <MainPage>
        {!poemShow && (
          <>
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
            <InputCard />
          </>
        )}
        {requestError && (
          <Alert color="failure" className="mb-4 mx-auto shadow-md">
            <span>
              <span className="font-medium">Info alert!</span> Change a few
              things up and try submitting again.
            </span>
          </Alert>
        )}
        {poemShow &&
          (loadingPoem ? (
            loadingImage ? (
              <HeroBanner>
                <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
                  Almost there, we&apos;re making the finishing touches...
                </h1>
                <p className="text-white text-center drop-shadow-lg">
                  See your poetry come to life: <br /> Watch as our AI artist
                  paints a picture worth a thousand words.
                </p>
              </HeroBanner>
            ) : (
              <HeroBanner>
                <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
                  Hang on, we&apos;re generating a poem...
                </h1>
                <p className="text-white text-center drop-shadow-lg">
                  Unleashing the power of AI to create a masterpiece for you.
                  <br />
                  Sit tight and watch the magic unfold.
                </p>
              </HeroBanner>
            )
          ) : (
            <HeroBanner>
              <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
                Your generated poem is here!
              </h1>
              <p className="text-white text-center drop-shadow-lg">
                Words that stir the soul, crafted by AI: <br />
                Enjoy the fruits of technology&apos;s poetic algorithms.
              </p>
            </HeroBanner>
          ))}
        {!requestError && poemShow && (
          <div
            className={
              !poemShow
                ? 'transition duration-700 scale-y-0 opacity-0 -translate-y-1/2 h-0'
                : 'transition duration-700'
            }
          >
            <PoemCard
              title={poemTitle}
              image={poemImage}
              text={poemText}
              userName={
                status === 'authenticated' && session.user?.name
                  ? session.user?.name
                  : 'Anonymous'
              }
              userImage={
                status === 'authenticated' && session.user?.image
                  ? session.user?.image
                  : ''
              }
            />
            <div className="flex h-full p-2 mb-4 flex-row gap-2 rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto w-fit">
              <Select
                value={selectedVoice}
                disabled={isSpeaking}
                onChange={(e) => setSelectedVoice(Number(e.target.value))}
              >
                {getTtsVoices() && ttsVoices.length
                  ? ttsVoices.map((voice, index) => (
                      <option key={index} value={index}>
                        {voice.name}
                      </option>
                    ))
                  : ''}
              </Select>
              <Button size="sm" color="light" onClick={speak}>
                {isSpeaking ? (
                  <Icon icon="fluent:stop-20-regular" fontSize="22px" />
                ) : (
                  <Icon
                    icon="fluent:immersive-reader-20-regular"
                    fontSize="22px"
                  />
                )}
              </Button>
              <Button
                size="sm"
                color="success"
                onClick={() => setPoemShow(false)}
              >
                <Icon
                  icon="fluent:code-text-edit-20-regular"
                  fontSize="22px"
                  className="mr-1"
                />
                Generate another poem
              </Button>
              <Button
                size="sm"
                color="light"
                onClick={bookmark}
                disabled={bookmarked}
              >
                <Icon
                  icon="fluent:bookmark-add-20-regular"
                  fontSize="22px"
                  className="mr-1"
                />
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </div>
          </div>
        )}
      </MainPage>
      <MainFooter />
    </>
  );
};

export default Generate;
