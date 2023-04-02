import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";
import { useForm } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Modal } from "flowbite-react";
import React from "react";
import { useAtom } from "jotai";
import { showLoginModalAtom } from "../lib/atoms";

const redirectUrl = "http://localhost:3000/";
const logIn = (provider, email = undefined) => {
  email
    ? signIn(provider, { callbackUrl: redirectUrl }, email)
    : signIn(provider, { callbackUrl: redirectUrl });
};

const style = { width: "100%" };

function LoginModal() {
  const { data: session, status } = useSession();

  const { register, handleSubmit } = useForm();

  const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom);

  function onClose() {
    setShowLoginModal(false);
  }

  return (
    <Modal show={showLoginModal} onClose={onClose}>
      <Modal.Header>Sign in</Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(({ email }) => {
            signIn("email", { email, callbackUrl: redirectUrl });
          })}
        >
          <button
            type="reset"
            onClick={() => {
              console.log(session);
            }}
            className=" p-1 absolute self-end w-8 bg-white rounded-full -translate-y-48 mr-2 hover:bg-slate-200 focus:bg-slate-300 focus:border"
          >
            Close
          </button>
          <h1>Sign in</h1>
          <input
            className="w-3/4 h-[8%] rounded-md pl-1.5 shadow-md"
            type="email"
            {...register("email")}
            placeholder="email"
          />
          <input
            className="w-1/4 h-[7%] rounded-xl bg-white shadow-md hover:bg-slate-200 focus:bg-slate-300 focus:border "
            type="submit"
            value="Log in"
          />
        </form>

        {/* @ts-ignore */}
        <FacebookLoginButton
          style={style}
          onClick={() => {
            logIn("facebook");
          }}
        >
          <span>Sign in with Facebook</span>
        </FacebookLoginButton>

        {/* @ts-ignore */}
        <GoogleLoginButton
          style={style}
          onClick={() => {
            logIn("google");
          }}
        >
          <span>Sign in with Google</span>
        </GoogleLoginButton>
        {/* @ts-ignore */}
        <GithubLoginButton
          style={style}
          onClick={() => {
            logIn("github");
          }}
        >
          <span>Sign in with Github</span>
        </GithubLoginButton>
      </Modal.Body>
    </Modal>
  );
}
export default LoginModal;
