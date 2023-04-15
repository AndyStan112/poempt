/* eslint-disable jsx-a11y/alt-text */

import { Button, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
/* eslint-disable @next/next/no-img-element */
import BookmarkButton from './buttons/bookmarkbutton';
import { Poem } from '../types';
import RegenerateButton from './buttons/regeneratebutton';
import DownloadButton from './buttons/downloadbutton';
import RemoveButton from './buttons/removebutton';
function LibraryCard(props: {
  title: string;
  text: string;
  bookmark: boolean | undefined;
  userName?: string;
  userImage?: string;
  poemId?: string;
  sessionId?: string;
  poemImage: string;
  bookmarkId?: string;
  creatorId?: string;
}) {
  console.log(props.poemId);
  const [bookmarked, setBookmarked] = useState(true);
  const [removed, setRemoved] = useState(false);
  const [image, setImage] = useState(props.poemImage);
  console.log(removed);

  const remove = async () => {
    console.log(props);
    if (!props.sessionId || !bookmarked) return;
    setBookmarked(true);
    await fetch('/api/bookmarks/delete/' + props.bookmarkId, {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(() => setRemoved(true))
      .catch((e) => {
        setRemoved(false);
        console.log(e);
      });
  };

  console.log(props);
  return (
    <>
      <div className="flex h-full p-4 mb-4 flex-col gap-8 md:flex-row rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto w-full md:w-0 md:min-w-librarycard">
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
              src={image ? image : 'loader.gif'}
              alt={props.title}
              className="rounded-md shadow-md"
            />
            <div className="flex flex-row justify-end gap-2 my-2 w-full">
              {!props.bookmark ? (
                <BookmarkButton
                  poemId={props.poemId!}
                  bookmarked={bookmarked}
                  setBookmarked={setBookmarked}
                  sessionId={props.sessionId!}
                  buttonType="normal"
                ></BookmarkButton>
              ) : (
                <RemoveButton removed={removed} remove={remove} />
              )}
              {props.creatorId &&
                props.sessionId &&
                props.creatorId === props.sessionId && (
                  <RegenerateButton
                    sessionId={props.sessionId}
                    poem={props.text}
                    setImage={setImage}
                    poemId={props.poemId!}
                  ></RegenerateButton>
                )}
              <DownloadButton imageUrl={props.poemImage}></DownloadButton>
            </div>
          </div>
          <div>
            {props.userName && (
              <div className="flex flex-row gap-2">
                <div className="text-right">
                  <div className="text-sm text-gray-300">Generated by</div>
                  <div className="text-md text-gray-400">{props.userName}</div>
                </div>
                <img
                  className="w-10 h-10 rounded-full border-gray-100 border-2"
                  src={props.userImage ? props.userImage : 'generic_user.png'}
                />
              </div>
            )}
            <p className="text-right">
              Made with <span className="text-lg text-gray-400">PoemPT</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LibraryCard;
