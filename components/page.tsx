import { ReactNode } from 'react';

function MainPage(props: { children: ReactNode }) {
  return (
    <div className="mx-auto px-3 container min-h-fullpage">
      {props.children}
    </div>
  );
}

export default MainPage;
