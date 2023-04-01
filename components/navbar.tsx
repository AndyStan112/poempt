import { Navbar, Button, DarkThemeToggle, Flowbite } from "flowbite-react";
import Waves from "./waves";
import { useAtomValue } from "jotai";
import { loadingPoemAtom } from "../utils/atoms";

function MainNavbar() {
  const loadingPoem = useAtomValue(loadingPoemAtom);
  return (
    <>
      <Navbar className="sticky dark !bg-transparent !text-white drop-shadow-md">
        <Navbar.Brand href="/" className="pr-16">
          <span className="self-center whitespace-nowrap text-xl font-semibold ">
            PoemPT
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button>Generate a poem</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className="!text-white" href="/">
            Home
          </Navbar.Link>
          <Navbar.Link className="!text-white" href="/about">
            About
          </Navbar.Link>
          <Navbar.Link className="!text-white" href="/test">
            Testing
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <Waves hue="20" animate={loadingPoem} />
    </>
  );
}

export default MainNavbar;
