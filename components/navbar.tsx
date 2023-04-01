import { Navbar, Button, DarkThemeToggle, Flowbite } from "flowbite-react";

function MainNavbar() {
  return (
    <>
      <Navbar className="sticky !bg-transparent !text-white drop-shadow-md">
        <Navbar.Brand href="/" className="pr-16">
          <span className="self-center whitespace-nowrap text-xl font-semibold ">
            PoemPT
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button color="green">Generate a poem</Button>
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
    </>
  );
}

export default MainNavbar;
