/* eslint-disable @next/next/no-img-element */
import { Navbar, Button, Tooltip } from 'flowbite-react';
import Link from 'next/link';
import { useSetAtom } from 'jotai';
import { poemShowAtom, showLoginModalAtom } from '../lib/atoms';
import { useSession, signOut } from 'next-auth/react';
import { Icon } from '@iconify/react';

function MainNavbar() {
  const setShowLoginModal = useSetAtom(showLoginModalAtom);
  const setPoemShow = useSetAtom(poemShowAtom);

  const { data: session, status } = useSession();

  return (
    <>
      <Navbar className="sticky !bg-transparent !text-white drop-shadow-md">
        <Link
          href="/"
          className="self-center whitespace-nowrap text-3xl font-semibold md:w-1/6"
        >
          PoemPT
        </Link>
        <div className="flex md:order-2 gap-2 items-center justify-end md:w-1/6">
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

              <Tooltip content="Sign out" style="light" placement="bottom">
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 rounded-full  transition-colors"
                >
                  <Icon icon="fluent:sign-out-20-regular" width="36" />
                </button>
              </Tooltip>
            </>
          ) : (
            <Tooltip content="Sign in" style="light" placement="bottom">
              <Button
                color="ga"
                size="xs"
                className="opacity-80 hover:opacity-100 transition-all"
                onClick={() => setShowLoginModal(true)}
              >
                <Icon icon="fluent:door-arrow-right-28-regular" width="24" />
              </Button>
            </Tooltip>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="gap-2">
          <Link href="/" className="!text-white py-2">
            Home
          </Link>
          <Link
            href="/generate"
            className="py-2"
            onClick={() => setPoemShow(false)}
          >
            Generate a poem
          </Link>
          <Link href="/publicLibrary" className="!text-white py-2">
            Public library
          </Link>
          <Link href="/library" className="!text-white py-2">
            My library
          </Link>
          <Link href="/bookmarks" className="!text-white py-2">
            Bookmarks
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MainNavbar;
