/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React, { useState } from 'react';
const Test: NextPage = () => {
  return (
    <div>
      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
        Remove Bookmark
      </button>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        Remove Bookmark
      </button>
    </div>
  );
};

export default Test;
