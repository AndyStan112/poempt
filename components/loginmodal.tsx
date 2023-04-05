import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { Button, Modal, TextInput } from 'flowbite-react';
import React from 'react';
import { useAtom } from 'jotai';
import { showLoginModalAtom } from '../lib/atoms';

const logIn = (provider: string, email = undefined) => {
  email ? signIn(provider, {}, email) : signIn(provider, {});
};

const style = {
  width: '100%',
  margin: '0',
  borderRadius: '0.5rem',
  boxShadow: '0 0 1px rgba(0,0,0,0.5)',
};

function LoginModal() {
  const { data: session, status } = useSession();

  const { register, handleSubmit } = useForm();
  //react-query
  //const { data } = useQuery(['poem-image' + props.text]);

  const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom);

  function onClose() {
    setShowLoginModal(false);
  }

  return (
    <Modal show={showLoginModal} size="sm" onClose={onClose}>
      <Modal.Header>Sign in</Modal.Header>
      <Modal.Body className="flex flex-col gap-4 rounded">
        <form
          onSubmit={handleSubmit(({ email }) => {
            signIn('email', { email });
          })}
          className="flex flex-col gap-2"
        >
          <p className="text-center">using email address</p>
          <TextInput
            type="email"
            placeholder="E-mail address"
            {...register('email')}
          />
          <Button color="success" type="submit" size="sm">
            Sign in
          </Button>
        </form>

        <div className="flex flex-col gap-2">
          <p className="text-center">or with these services</p>
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
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default LoginModal;
