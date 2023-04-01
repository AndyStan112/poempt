import { NextPage } from 'next';
// pages/subscribe.tsx
import React, { useState } from 'react';
import Image from 'next/image';
const Test: NextPage = () => {
  const [text, setText] = useState<string>(' ');
  const [poem, setPoem] = useState<string>(' ');
  const [image, setImage] = useState<string>(' ');

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    console.log(text);
    fetch('/api/poem', {
      body: JSON.stringify({ text: text }),
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    }).then(
      (r) =>
        r.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            return;
          }
          console.log(data.poem);
          setPoem(data.poem);
          fetch('/api/image', {
            body: JSON.stringify({ poem: data.poem }),
            method: 'post',
            headers: {
              'content-type': 'application/json',
            },
          }).then((r) =>
            r.json().then((data) => {
              console.log(data.image);
              setImage(data.image);
            }),
          );
        }),

      //setResult(await result.json());
    );
  };
  return (
    <div>
      testare
      <form onSubmit={handleSubmit}>
        <input
          className="bg-slate-300 bg"
          type="text"
          name="bame"
          id="id"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </form>
      {poem}
      <img
        onClick={() => {
          speechSynthesis.speak(new SpeechSynthesisUtterance(poem));
        }}
        src={image}
      ></img>
    </div>
  );
};

export default Test;
