import { Navbar, Button, DarkThemeToggle, Flowbite } from "flowbite-react";
import Link from "next/link";

function MainNavbar() {
  return (
    <>
      <Navbar className="sticky !bg-transparent !text-white drop-shadow-md">
        <Navbar.Brand className="pr-8">
          <Link
            href="/"
            className="self-center whitespace-nowrap text-3xl font-semibold "
          >
            PoemPT
          </Link>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Link href="/generate">
            <Button color="green">Generate a poem</Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className="!text-white">
            <Link href="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link className="!text-white">
            <Link href="/library">Public library</Link>
          </Navbar.Link>
          <Navbar.Link className="!text-white">
            <Link href="/mylibrary">My library</Link>
          </Navbar.Link>
          <Navbar.Link className="!text-white">
            <Link href="/about">About</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MainNavbar;
