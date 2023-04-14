/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

const Test: NextPage = () => {
  const [url, setUrl] = useState('loader.gif');
  useEffect(() => {
    fetch('/api/download', {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setUrl(data.downloadUrl);
      });
  }, []);
  return (
    <div>
      <img src={url}></img>
    </div>
  );
};
//{autorenewIcon} className="w-5 h-5"
export default Test;
