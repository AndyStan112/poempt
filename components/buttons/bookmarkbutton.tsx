import { Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { SetStateAction, FC, Dispatch, useCallback, useEffect } from 'react';
import { json } from 'stream/consumers';

const BookmarkButton: FC<{
  setBookmarked: Dispatch<SetStateAction<boolean>>;
  sessionId: string;
  poemId: string;
  bookmarked: boolean | undefined;
  buttonType: string | undefined;
}> = ({ setBookmarked, sessionId, poemId, bookmarked, buttonType }) => {
  const getBookmarked = (sessionId: string, poemId: string) => {
    return fetch('api/bookmarks/get/bookmarked/' + sessionId, {
      body: JSON.stringify({
        poemId: poemId,
      }),
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    });
  };
  const bookmark = async () => {
    if (!(sessionId && poemId && !bookmarked)) return;
    setBookmarked(true);
    // console.log(sessionId, 'ksdfhksdalj;kak');
    await fetch('/api/bookmarks/post/' + sessionId, {
      body: JSON.stringify({
        poemId: poemId,
      }),
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    }).then((e) => {
      if (!e.ok) setBookmarked(false);
      // TODO: toast
    });
  };
  useEffect(() => {
    getBookmarked(sessionId, poemId)
      .then((r) => r.json())
      .then((data) => {
        setBookmarked(data.bookmarked);
      });
  }, [sessionId]);
  return (
    <Button
      size="sm"
      color="light"
      onClick={bookmark}
      disabled={bookmarked}
      className={buttonType == 'full' ? 'w-full' : ''}
    >
      <Icon
        icon={
          bookmarked
            ? 'fluent:bookmark-20-filled'
            : 'fluent:bookmark-add-20-regular'
        }
        width="20"
        className={buttonType == 'full' ? 'mr-1' : ''}
      />
      {buttonType == 'full' && (bookmarked ? 'Bookmarked' : 'Bookmark')}
    </Button>
  );
};

export default BookmarkButton;
