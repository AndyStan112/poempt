export interface UserInput {
  type: 'guided' | 'prompt';
  text?: string;
  theme?: string;
  stanzaStyle?: string;
  writingStyle?: string;
  rhyme?: string;
  stanzas?: number;
  keywords?: [string];
}
