export interface UserInput {
  type: 'guided' | 'prompt';
  theme: string;
  stanzaStyle: string;
  writingStyle: string;
  rhyme: string;
  stanzas: number;
  keywords: [string];
}
