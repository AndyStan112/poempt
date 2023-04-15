import MainNavbar from '../components/navbar';
import MainPage from '../components/page';
import Waves from '../waves';
import { useAtom, useSetAtom } from 'jotai';
import { loadingPoemAtom, showLoginModalAtom } from '../lib/atoms';
import HeroBanner from '../components/herobanner';
import MainFooter from '../components/footer';
import { useState, useEffect, useMemo } from 'react';
import LibraryCard from '../components/librarycard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Pagination from '../components/pagination';
import { Bookmark } from '../types';
import { GLOBAL_TAKE } from '../lib/constants';
const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [total, setTotal] = useState(2);
  const [loadingPoem, setLoadingPoem] = useAtom(loadingPoemAtom);
  const router = useRouter();
  const skip = useMemo(() => Number(router.query.skip) || 0, [router.query]);
  const { data: session } = useSession();
  const openLoginModal = useSetAtom(showLoginModalAtom);

  useEffect(() => {
    if (!session) return;
    setLoadingPoem(true);
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
        setLoadingPoem(false);
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
            Your Bookmarks
          </h1>
          <p className="text-white text-center drop-shadow-lg">
            Your bookmarked poems go here
          </p>
        </HeroBanner>
        <Pagination
          take={GLOBAL_TAKE}
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
                  creatorId={poem.creatorId}
                  poemId={poem.id}
                ></LibraryCard>
              );
            })}
        </div>
        <Pagination
          take={GLOBAL_TAKE}
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
