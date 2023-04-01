import { Navbar, Button } from "flowbite-react";

function MainNavbar() {
  return (
    <>
      <Navbar className="bg-transparent">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold ">
            PoemPT
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button>Generate a poem</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/test">Testing</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MainNavbar;
