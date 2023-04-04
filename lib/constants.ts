import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from 'openai';
export const writingStyle = [
  'Modernist',
  'Traditionalist',
  'Classicism',
  'Romantic',
  'Symbolism',
  'Contemporary',
];

export const stanzaStyles = [
  'Free verse',
  'Haiku',
  'Sonnet',
  'Acrostic',
  'Villanelle',
  'Ode',
  'Elegy',
  'Ballad',
];

export const stanzaCounts = [
  'Monostitch',
  'Couplet',
  'Tercet',
  'Quatrain',
  'Quintain',
  'Sestet',
];

export const stanzaRhymes = [
  'Monorhyme',
  'Coupled rhyme',
  'Ballad rhyme',
  'Enclosed rhyme',
  'Triplet rhyme',
];

export const moods = [
  'Depressing',
  'Melancolic',
  'Sad',
  'Neutral',
  'Happy',
  'Joyful',
  'Exhilarating',
];

export const languages = [
  'english',
  'spanish',
  'polish',
  'german',
  'french',
  'italian',
  'dutch',
  'romanian',
  'russian',
  'portuguese',
  'swedish',
  'arabic',
  'persian',
  'turkish',
];
export const trainingMessages: ChatCompletionRequestMessage[] = [
  {
    role: 'system',
    content:
      'You are a poem generator. The user will give you a literary movement, a stanza style, stanza structure,rhyme and comma-separated keywords. You will generate a title, a poem and a prompt for dall-e to generate an image based on the poem . If the stanza style is not free verse you will ignore the structure and rhyme. You should output the information in json format with the following keys :  {title, poem,prompt}. Make the json respect the json standard. Escape apostrophes and quotes',
  },
  {
    role: 'user',
    content:
      'Make me a poem based on the following parameters: literary movement : traditionalism ; Stanza style: free verse;Stanza structure: Quatrain;Rhyme: Monorhyme;Keywords: sun,light,shadow ',
  },
  {
    role: 'assistant',
    content:
      '{"title":"The Dance of Light and Shadow","poem":"Amidst the bright and golden rays,\r\nThat light the world in countless ways,\r\nA play of light and shadow\'s born,\r\nA dance of dusk and break of dawn.\r\n\r\nThe sun casts down its warming light,\r\nA gift of life and love so bright,\r\nAnd yet it\'s in the shadows deep,\r\nThat secrets and treasures we keep.\r\n\r\nThe shadows hold a mystery,\r\nA cloak of darkness, history,\r\nA respite from the blazing sun,\r\nA place of rest when day is done.\r\n\r\nBut shadows do not simply hide,\r\nThey dance and sway, they slip and slide,\r\nA ballet in the earth and air,\r\nA dance of grace, without a care.\r\n\r\nSo let us join the shadow\'s dance,\r\nAnd let ourselves be lost in trance,\r\nFor in their depths we\'ll find our light,\r\nThe dance of dark and bright unite.","prompt":"Create an image of a person in a forest clearing, surrounded by trees with sunlight shining through the leaves, casting dappled shadows on the ground. The person is standing still, watching the dance of light and shadow."}',
  },
  {
    role: 'user',
    content:
      'Make me a poem based on the following parameters: literary movement : modernism ; Stanza style: Ballad;Stanza structure: Couplet;Rhyme: Coupled Rhyme;Keywords: king,eat,dog ',
  },
];
/* 
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
 
// OR
// const lngDetector = new (require('languagedetect'));
 
console.log(lngDetector.detect('This is a test.'));
 

  [ [ 'english', 0.5969230769230769 ],
  [ 'hungarian', 0.407948717948718 ],
  [ 'latin', 0.39205128205128204 ],
  [ 'french', 0.367948717948718 ],
  [ 'portuguese', 0.3669230769230769 ],
  [ 'estonian', 0.3507692307692307 ],
  [ 'latvian', 0.2615384615384615 ],
  [ 'spanish', 0.2597435897435898 ],
  [ 'slovak', 0.25051282051282053 ],
  [ 'dutch', 0.2482051282051282 ],
  [ 'lithuanian', 0.2466666666666667 ],
  ... ]

 
// Only get the first 2 results
console.log(lngDetector.detect('This is a test.', 2));
 
  [ [ 'english', 0.5969230769230769 ], [ 'hungarian', 0.407948717948718 ] ]
*/
