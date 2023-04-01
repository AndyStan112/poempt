import { Footer } from "flowbite-react";

function MainFooter() {
  return (
    <Footer className="mt-10" container={true}>
      <Footer.Copyright href="#" by="PoemPT" year={2023} />
      <Footer.LinkGroup>
        {/* <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link> */}
      </Footer.LinkGroup>
    </Footer>
  );
}

export default MainFooter;
