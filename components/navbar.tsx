/* eslint-disable @next/next/no-img-element */
import { Navbar, Button, Tooltip } from 'flowbite-react';
import Link from 'next/link';
import { useSetAtom } from 'jotai';
import { showLoginModalAtom } from '../lib/atoms';
import { useSession, signOut } from 'next-auth/react';
import { Icon } from '@iconify/react';

function MainNavbar() {
  const setShowLoginModal = useSetAtom(showLoginModalAtom);

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
          <div className="flex flex-row gap-2 items-center">
            {status === 'authenticated' ? (
              <>
                <span>{session.user?.name}</span>
                <img
                  className="w-10 h-10 rounded-full border-gray-100 border-2"
                  src={
                    session.user?.image
                      ? session.user?.image
                      : 'generic_user.png'
                  }
                  alt="PFP"
                />
                <Tooltip content="Sign out" style="light" placement="bottom">
                  <Button
                    color="undefined"
                    size="undefined"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <Icon icon="fluent:sign-out-20-regular" width="36" />
                  </Button>
                </Tooltip>
              </>
            ) : (
              <Tooltip content="Sign in" style="light" placement="bottom">
                <Button
                  color="undefined"
                  size="undefined"
                  onClick={() => setShowLoginModal(true)}
                >
                  <Icon icon="fluent:door-arrow-right-20-regular" width="36" />
                </Button>
              </Tooltip>
            )}
          </div>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="gap-2">
          <Link href="/" className="!text-white py-2">
            Home
          </Link>
          <Link href="/generate" className="py-2">
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
