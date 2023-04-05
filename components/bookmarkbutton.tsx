import { Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { SetStateAction, FC, Dispatch, useCallback } from 'react';

const BookmarkButton: FC<{
  setBookmarked: Dispatch<SetStateAction<boolean>>;
  sessionId: string;
  poemId: string;
  bookmarked: boolean;
}> = ({ setBookmarked, sessionId, poemId, bookmarked }) => {
  const bookmark = () => {
    if (!sessionId) {
      // save current poem to local storage
      // redirect to login
      // if the user is logged in check the local storage for any poems generated, and bookmarked while unauthenticated, add them to the library and clear the local storage
    }

    if (sessionId && poemId && !bookmarked) {
      fetch('/api/bookmarks/post/' + sessionId, {
        body: JSON.stringify({
          userId: sessionId,
          poemId: poemId,
        }),
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(() => setBookmarked(true))
        .catch(() => setBookmarked(false));
    }
  };

  return (
    <Button size="sm" color="light" onClick={bookmark} disabled={bookmarked}>
      <Icon
        icon="fluent:bookmark-add-20-regular"
        fontSize="22px"
        className="mr-1"
      />
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  );
};

export default BookmarkButton;
