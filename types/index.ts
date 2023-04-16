export type UserInput = {
  model: string;
  subject: string;
  writingStyle: string;
  stanzaStyle: string;
  rhyme: string;
  verses: string;
  mood: string;
};
export type Bookmark = {
  id: string;
  saverId: string;
  poem: Poem;
};
export type Poem = {
  id: string;
  title: string;
  poem: string;
  image: string;
  createdAt: Date;
  creatorId: string;
  creator: {
    name: string;
    image: string;
  };
};
export type status = "loading" | "authenticated" | "unauthenticated";
