/* eslint-disable @next/next/no-img-element */
import { Navbar, Button } from 'flowbite-react';
import Link from 'next/link';
import { useSetAtom } from 'jotai';
import { poemShowAtom, showLoginModalAtom } from '../lib/atoms';
import { useSession, signOut } from 'next-auth/react';

function MainNavbar() {
  const setShowLoginModal = useSetAtom(showLoginModalAtom);
  const setPoemShow = useSetAtom(poemShowAtom);

  const { data: session, status } = useSession();

  return (
    <>
      <Navbar className="sticky !bg-transparent !text-white drop-shadow-md">
        <Link
          href="/"
          className="self-center whitespace-nowrap text-3xl font-semibold w-[20%]"
        >
          PoemPT
        </Link>
        <div className="flex md:order-2 gap-2">
          {status === 'authenticated' ? (
            <>
              <div className="flex flex-row gap-2">
                <span className="pt-2 pr-2">{session.user?.name}</span>
                <img
                  className="w-10 h-10 rounded-full border-gray-100 border-2"
                  src={
                    session.user?.image
                      ? session.user?.image
                      : 'generic_user.png'
                  }
                  alt="PFP"
                />
              </div>
              <Button color="gray" size="sm" onClick={() => signOut()}>
                Log out
              </Button>
            </>
          ) : (
            <Button
              color="gray"
              size="sm"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </Button>
          )}

          <Link href="/generate">
            <Button color="gray" size="sm" onClick={() => setPoemShow(false)}>
              Generate a poem
            </Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link href="/" className="!text-white">
            Home
          </Link>
          <Link href="/publicLibrary" className="!text-white">
            Public library
          </Link>
          <Link href="/library" className="!text-white">
            My library
          </Link>
          <Link href="/bookmarks" className="!text-white">
            Bookmarks
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MainNavbar;
