import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons';
import { useForm } from 'react-hook-form';
import { signIn, signOut, useSession } from 'next-auth/react';

const style = {
  height: '10%',
  margin: 'inherit',
  display: 'inherit',
  width: '75%',
};
const redirectUrl = 'http://localhost:3000/';
const logIn = (provider, email = undefined) => {
  email
    ? signIn(provider, { callbackUrl: redirectUrl }, email)
    : signIn(provider, { callbackUrl: redirectUrl });
};
const LogInCard = () => {
  const { data: session, status } = useSession();

  const { register, handleSubmit } = useForm();
  return (
    <div className="h-screen w-screen fixed flex justify-center items-center bg-gray-400/90 z-20 ">
      <form
        onSubmit={handleSubmit(({ email }) => {
          signIn('email', { email, callbackUrl: redirectUrl });
        })}
        className="w-80 h-[27rem]  flex flex-col bg-slate-200 rounded-xl shadow-md justify-center gap-2 items-center"
      >
        <button
          onClick={() => {
            console.log(session);
            signOut({ redirect: false, callbackUrl: redirectUrl });
            console.log(session);
          }}
          className=" p-1 absolute self-end w-8 bg-white rounded-full -translate-y-48 mr-2 hover:bg-slate-200 focus:bg-slate-300 focus:border"
        >
          <img src="./close.png" alt="" />
        </button>
        <h1>Sign in</h1>
        <input
          className="w-3/4 h-[8%] rounded-md pl-1.5 shadow-md"
          type="email"
          {...register('email')}
          placeholder="email"
        />
        <input
          className="w-1/4 h-[7%] rounded-xl bg-white shadow-md hover:bg-slate-200 focus:bg-slate-300 focus:border "
          type="submit"
          value="Log in"
        />
        {/* @ts-ignore */}
        <FacebookLoginButton
          style={style}
          onClick={() => {
            logIn('facebook');
          }}
        >
          <span>Sign in with Facebook</span>
        </FacebookLoginButton>
        {/* @ts-ignore */}
        <GoogleLoginButton
          style={style}
          onClick={() => {
            logIn('google');
          }}
        >
          <span>Sign in with Google</span>
        </GoogleLoginButton>
        {/* @ts-ignore */}
        <GithubLoginButton
          style={style}
          onClick={() => {
            logIn('github');
          }}
        >
          <span>Sign in with Github</span>
        </GithubLoginButton>
      </form>
    </div>
  );
};
export default LogInCard;
