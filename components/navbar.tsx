import { Navbar, Button } from "flowbite-react";
import Link from "next/link";

function MainNavbar() {
  return (
    <>
      <Navbar className="sticky !bg-transparent !text-white drop-shadow-md">
        <Link
          href="/"
          className="self-center whitespace-nowrap text-3xl font-semibold "
        >
          PoemPT
        </Link>
        <div className="flex md:order-2">
          <Link href="/generate">
            <Button color="green">Generate a poem</Button>
          </Link>
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
    </>
  );
}

export default MainNavbar;
