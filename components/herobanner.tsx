import { ReactNode } from "react";

function HeroBanner(props: { children: ReactNode }) {
  return <div className="mx-auto my-10 container">{props.children}</div>;
}

export default HeroBanner;
