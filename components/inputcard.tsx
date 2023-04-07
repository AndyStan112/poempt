import {
  Tabs,
  TextInput,
  Button,
  Select,
  Accordion,
  Textarea,
} from 'flowbite-react';
import { useState } from 'react';
import {
  writingStyle,
  stanzaStyles,
  stanzaCounts,
  stanzaRhymes,
  moods,
} from '../lib/constants';
import { useSetAtom, useAtom } from 'jotai';
import {
  requestErrorAtom,
  poemTextAtom,
  poemImageAtom,
  loadingPoemAtom,
  loadingImageAtom,
  poemShowAtom,
  poemTitleAtom,
  poemIdAtom,
} from '../lib/atoms';
import { useSession } from 'next-auth/react';
import { UserInput } from '../types';

const getImage = async (poem: string) => {
  return fetch('/api/image', {
    body: JSON.stringify({ poem: poem }),
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
  });
};

function InputCard() {
  const [selectedWritingStyle, setSelectedWritingStyle] = useState('Modernist');
  const [selectedStanzaStyle, setSelectedStanzaStyle] = useState(0);
  const [selectedVerseCount, setSelectedVerseCount] = useState(3);
  const [selectedRhyme, setSelectedRhyme] = useState(0);
  const [selectedMood, setSelectedMood] = useState(3);

  const [promptText, setPromptText] = useState<string>('');
  const [poemPromptText, setPoemPromptText] = useState<string>('');

  const [poemShow, setPoemShow] = useAtom(poemShowAtom);
  const setRequestError = useSetAtom(requestErrorAtom);
  const setPoemId = useSetAtom(poemIdAtom);
  const setPoemTitle = useSetAtom(poemTitleAtom);
  const setPoemText = useSetAtom(poemTextAtom);
  const setPoemImage = useSetAtom(poemImageAtom);
  const setLoadingPoem = useSetAtom(loadingPoemAtom);
  const setLoadingImage = useSetAtom(loadingImageAtom);

  const { data: session } = useSession();
  const setGenerating = () => {
    setPoemShow(true);
    setLoadingPoem(true);
    setPoemImage('loader.gif');
    setPoemTitle('');
    setPoemText('');
  };
  const getPoem = async (userInput: UserInput) => {
    return fetch('/api/poem', {
      body: JSON.stringify(userInput),
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  const handleSubmit1 = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    setGenerating();

    const userInput: UserInput = {
      subject: promptText,
      writingStyle: selectedWritingStyle,
      stanzaStyle: stanzaStyles[selectedStanzaStyle],
      rhyme: stanzaRhymes[selectedRhyme],
      verses: (selectedVerseCount + 1).toString(),
      mood: moods[selectedMood],
    };

    getPoem(userInput).then((r) =>
      r.json().then((data) => {
        if (data.error) {
          setRequestError(true);
          return;
        }
        const { title, poem } = data;

        setPoemTitle(title);
        setPoemText(poem.trim());
        setLoadingImage(true);

        getImage(data.poem).then((r) =>
          r.json().then((data) => {
            setPoemImage(data.image);
            setLoadingImage(false);
            setLoadingPoem(false);
            const postData = { title, poem, image: data.image };
            if (!session) throw new Error('Session not found');
            fetch('/api/poems/post/' + session.id, {
              body: JSON.stringify(postData),
              method: 'post',
              headers: {
                'content-type': 'application/json',
              },
            }).then((r) =>
              r.json().then((data) => {
                if (data.error) {
                  // console.log(data.error);
                  setRequestError(true);
                  return;
                }
                //console.log(data.poemId);
                setPoemId(data.poemId);
              }),
            );
          }),
        );
      }),
    );
  };

  const handleSubmit2 = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    setPoemShow(true);
    setLoadingPoem(true);
    setPoemImage('loader.gif');
    setPoemTitle('');
    setPoemText('');

    fetch('/api/continuation', {
      body: JSON.stringify({
        poem: poemPromptText,
      }),
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    }).then((r) =>
      r.json().then((data) => {
        if (data.error) {
          // console.log(data.error);
          setRequestError(true);
          return;
        }
        // console.log(data.poem);
        setPoemTitle(data.title);
        setPoemText(data.poem.trim());
        setLoadingImage(true);

        getImage(data.poem).then((r) =>
          r.json().then((data) => {
            // console.log(data.image);
            setPoemImage(data.image);
            setLoadingImage(false);
            setLoadingPoem(false);
          }),
        );
      }),
    );
  };

  const style1 =
    'transition duration-700 ease-in-out flex flex-col p-5 mb-4 rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto sm:w-full md:w-2/3 lg:w-1/2';

  return (
    <div
      className={
        poemShow ? style1 + ' scale-y-0 opacity-0 -translate-y-1/2 h-0' : style1
      }
    >
      <h1 className="text-center text-2xl mb-2">Write me a poem based on:</h1>
      <Tabs.Group className="justify-center">
        <Tabs.Item title="A short description">
          <form onSubmit={handleSubmit1}>
            <TextInput
              id="plainPrompt"
              type="text"
              placeholder="e.g: a sunny day"
              className="flex-1 mb-2"
              required={true}
              value={promptText}
              onChange={(e) => {
                setPromptText(e.target.value);
              }}
            />
            <Accordion flush={true}>
              <Accordion.Panel>
                <Accordion.Title>Writing style</Accordion.Title>
                <Accordion.Content>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {writingStyle.map((name) => (
                      <Button
                        color={
                          selectedWritingStyle == name ? 'success' : 'light'
                        }
                        className="w-full"
                        key={name}
                        onClick={() => {
                          setSelectedWritingStyle(name);
                        }}
                      >
                        {name}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Poem style</label>
                    <Select
                      id="stanzaStyle"
                      name="stanzaStyle"
                      className="w-full mb-2"
                      value={selectedStanzaStyle}
                      onChange={(e) => {
                        setSelectedStanzaStyle(Number(e.target.value));
                      }}
                    >
                      {stanzaStyles.map((name, index) => (
                        <option key={index} value={index}>
                          {name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Structure and rhyme</Accordion.Title>
                <Accordion.Content>
                  <div className="flex gap-4 mb-2 flex-col md:flex-row">
                    <div className="flex-1 flex flex-col gap-1">
                      <label>Verse count</label>
                      <Select
                        id="stanzaCount"
                        name="stanzaCount"
                        className="w-full"
                        value={selectedVerseCount}
                        onChange={(e) => {
                          setSelectedVerseCount(Number(e.target.value));
                        }}
                      >
                        {stanzaCounts.map((name, index) => (
                          <option key={index} value={index}>
                            {name} ({index + 1})
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <label>Rhyme type</label>
                      <Select
                        id="rhyme"
                        name="rhyme"
                        className="w-full"
                        value={selectedRhyme}
                        onChange={(e) => {
                          setSelectedRhyme(Number(e.target.value));
                        }}
                      >
                        {stanzaRhymes.map((name, index) => (
                          <option key={index} value={index}>
                            {name}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Mood</Accordion.Title>
                <Accordion.Content>
                  <label
                    htmlFor="minmax-range"
                    className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {moods[selectedMood]}
                  </label>
                  <input
                    id="minmax-range"
                    type="range"
                    min="0"
                    max="6"
                    value={selectedMood}
                    onChange={(e) => {
                      setSelectedMood(Number(e.target.value));
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-2"
                  />
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <Button
              type="submit"
              className="mt-4 bg-green-500 hover:bg-green-600 text-black w-full"
            >
              Write me a poem
            </Button>
          </form>
        </Tabs.Item>
        <Tabs.Item title="Another poem">
          <form onSubmit={handleSubmit2}>
            <Textarea
              id="plainPrompt"
              rows={8}
              placeholder="e.g: A brand new day..."
              className="flex-1 mb-2 p-2 text-sm"
              required={true}
              value={poemPromptText}
              onChange={(e) => {
                setPoemPromptText(e.target.value);
              }}
            />
            <Button
              type="submit"
              className="mt-4 bg-green-500 hover:bg-green-600 text-black w-full"
            >
              Write me a poem
            </Button>
          </form>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}

export default InputCard;
