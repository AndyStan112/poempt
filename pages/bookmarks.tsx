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
import { useState, useEffect, useMemo } from 'react';
import LibraryCard from '../components/librarycard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Pagination from '../components/pagination';
import LoginModal from '../components/loginmodal';
import { Bookmark } from '../types';
const Bookmarks = () => {
  const requestError = useAtomValue(requestErrorAtom);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [total, setTotal] = useState(2);
  const loadingPoem = useAtomValue(loadingPoemAtom);
  const loadingImage = useAtomValue(loadingImageAtom);
  const router = useRouter();
  const skip = useMemo(() => Number(router.query.skip) || 0, [router.query]);
  const { data: session } = useSession();
  const openLoginModal = useSetAtom(showLoginModalAtom);

  useEffect(() => {
    if (!session) return;
    console.log(`/api/bookmarks/get/` + session.id + `?skip=${skip}`);
    fetch(`/api/bookmarks/get/` + session.id + `?skip=${skip}`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        //console.log(data.poems);
        setBookmarks(data.bookmarks);
        setTotal(data.total);
      })
      .catch((e) => console.log(e));
  }, [session, skip]);

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
        <Pagination
          take={5}
          skip={skip}
          total={total}
          router={router}
        ></Pagination>
        <div>
          {session !== null &&
            bookmarks.map(({ poem, id }) => {
              //console.log(poem);
              return (
                <LibraryCard
                  title={poem.title}
                  text={poem.poem}
                  bookmark={true}
                  key={poem.id}
                  userName={poem.creator.name}
                  userImage={poem.creator.image}
                  poemImage={poem.image!}
                  sessionId={session.id}
                  bookmarkId={id}
                ></LibraryCard>
              );
            })}
        </div>
        <Pagination
          take={5}
          skip={skip}
          total={total}
          router={router}
        ></Pagination>
      </MainPage>
      <MainFooter />
    </>
  );
};

export default Bookmarks;
