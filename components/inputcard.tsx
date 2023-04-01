import { Tabs, TextInput, Button, Select, Accordion } from "flowbite-react";
import { useState } from "react";
import {
  writingStyle,
  stanzaStyles,
  stanzaCounts,
  stanzaRhymes,
  moods,
} from "../lib/constants";
import { useSetAtom, useAtom } from "jotai";
import {
  requestErrorAtom,
  poemTextAtom,
  poemImageAtom,
  loadingPoemAtom,
  poemShowAtom,
} from "../lib/atoms";

function InputCard() {
  const [selectedWritingStyle, setSelectedWritingStyle] = useState("Modernist");
  const [selectedStanzaStyle, setSelectedStanzaStyle] = useState(0);
  const [selectedVerseCount, setSelectedVerseCount] = useState(3);
  const [selectedRhyme, setSelectedRhyme] = useState(0);
  const [selectedMood, setSelectedMood] = useState(3);

  const [promptText, setPromptText] = useState<string>(" ");

  const [poemShow, setPoemShow] = useAtom(poemShowAtom);
  const setRequestError = useSetAtom(requestErrorAtom);
  const setPoemText = useSetAtom(poemTextAtom);
  const setPoemImage = useSetAtom(poemImageAtom);
  const setLoadingPoem = useSetAtom(loadingPoemAtom);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setPoemShow(true);
    setLoadingPoem(true);
    setPoemImage("loader.gif");
    setPoemText("Generating...");

    fetch("/api/poem", {
      body: JSON.stringify({
        subject: promptText,
        writingStyle: selectedWritingStyle,
        stanzaStyle: stanzaStyles[selectedStanzaStyle],
        rhyme: stanzaRhymes[selectedRhyme],
        verses: selectedVerseCount.toString(),
        mood: moods[selectedMood],
      }),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    }).then((r) =>
      r.json().then((data) => {
        if (data.error) {
          // console.log(data.error);
          setRequestError(true);
          return;
        }
        // console.log(data.poem);
        setPoemText(data.poem.trim());

        fetch("/api/image", {
          body: JSON.stringify({ poem: data.poem }),
          method: "post",
          headers: {
            "content-type": "application/json",
          },
        }).then((r) =>
          r.json().then((data) => {
            // console.log(data.image);
            setPoemImage(data.image);
            setLoadingPoem(false);
          })
        );
      })
    );
  };

  const style1 =
    "transition duration-700 ease-in-out flex flex-col p-5 mb-4 rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto sm:w-full md:w-2/3 lg:w-1/2";

  return (
    <div
      className={
        poemShow ? style1 + " scale-y-0 opacity-0 -translate-y-1/2 h-0" : style1
      }
    >
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl mb-2">Write me a poem about:</h1>
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
        <Accordion flush={true} collapseAll={true}>
          <Accordion.Panel>
            <Accordion.Title>Writing style</Accordion.Title>
            <Accordion.Content>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {writingStyle.map((name) => (
                  <Button
                    color={selectedWritingStyle == name ? "success" : "light"}
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
          Make me a poem
        </Button>
      </form>
    </div>
  );
}

export default InputCard;
