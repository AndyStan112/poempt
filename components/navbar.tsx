import { Navbar, Button } from "flowbite-react";
import Link from "next/link";
import LoginModal from "./loginmodal";
import { useSetAtom } from "jotai";
import { showLoginModalAtom } from "../lib/atoms";

function MainNavbar() {
  const setShowLoginModal = useSetAtom(showLoginModalAtom);

  return (
    <>
      <Navbar className="sticky !bg-transparent !text-white drop-shadow-md">
        <Link
          href="/"
          className="self-center whitespace-nowrap text-3xl font-semibold "
        >
          PoemPT
        </Link>
        <div className="flex md:order-2 gap-2">
          <Link href="/generate">
            <Button color="gray" size="sm">
              Generate a poem
            </Button>
          </Link>
          <Button
            color="gray"
            size="sm"
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link href="/" className="!text-white">
            Home
          </Link>
          <Link href="/library" className="!text-white">
            Public library
          </Link>
          <Link href="/mylibrary" className="!text-white">
            My library
          </Link>
          <Link href="/about" className="!text-white">
            About
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <LoginModal />
    </>
  );
}

export default MainNavbar;
