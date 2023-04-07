export type UserInput = {
  subject: string;
  writingStyle: string;
  stanzaStyle: string;
  rhyme: string;
  verses: string;
  mood: string;
};
export type Bookmark = {
  id: string;
  poem: Poem;
};
export type Poem = {
  id: string;
  title: string;
  poem: string;
  image: string;
  createdAt: Date;
  creator: {
    name: string;
    image: string;
  };
};
export type status = 'loading' | 'authenticated' | 'unauthenticated';
