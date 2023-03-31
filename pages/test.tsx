import { NextPage } from 'next';
// pages/subscribe.tsx
import React, { useState } from 'react';

const Test: NextPage = () => {
  const [text, setText] = useState(' ');
  const [result, setResult] = useState<any>();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    fetch('/api/subscribe', {
      body: JSON.stringify({ text: text }),
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    }).then(async (result) => {
      // 👇 modify the state to show the result
      setResult(await result.json());
    });
  };
  return (
    <div>
      testare
      <form onSubmit={handleSubmit}>
        <input
          className="bg-slate-300"
          type="text"
          name="bame"
          id="id"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Test;
