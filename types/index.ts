export interface UserInput {
  type: 'guided' | 'prompt';
  mood?: string;
  theme?: string;
  stanzaStyle?: string;
  writingStyle?: string;
  rhyme?: string;
  stanzaCount?: string;
  keywords?: [string];
}

export type status = 'loading' | 'authenticated' | 'unauthenticated';
