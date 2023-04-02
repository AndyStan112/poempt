/* eslint-disable jsx-a11y/alt-text */

import { Button, Select } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
function PoemCard(props: {
  title: string;
  image: string;
  text: string;
  userName?: string;
  userImage?: string;
}) {
  return (
    <>
      <div className="flex h-full p-4 mb-4 flex-col gap-8 md:flex-row rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto w-fit">
        <div className="flex-2 text-center md:text-left">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
            {props.title}
          </h5>
          <p className="font-normal text-gray-700 whitespace-pre-wrap">
            {props.text}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-2 justify-center md:justify-start items-center md:items-end text-gray-300 text-sm">
          <div className="flex-1">
            <img
              src={props.image ? props.image : ""}
              alt={props.title}
              className="rounded-md shadow-md"
            />
          </div>
          <div>
            {props.userName && (
              <p className="flex flex-row gap-2">
                <div className="text-right">
                  <div className="text-sm text-gray-300">Generated by</div>
                  <div className="text-md text-gray-400">{props.userName}</div>
                </div>
                <img
                  className="w-10 h-10 rounded-full border-gray-100 border-2"
                  src={props.userImage ? props.userImage : "generic_user.png"}
                />
              </p>
            )}
            <p>
              Made with <span className="text-lg text-gray-400">PoemPT</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PoemCard;
