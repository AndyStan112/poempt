import { Tabs, TextInput, Button, Select } from "flowbite-react";
import { useState } from "react";
import {
  writingStyle,
  stanzaStyles,
  stanzaCounts,
  stanzaRhymes,
  moods,
} from "../utils/constants";
import { useSetAtom } from "jotai";
import {
  requestErrorAtom,
  poemTextAtom,
  poemImageAtom,
  loadingPoemAtom,
} from "../utils/atoms";
import TagInput from "./taginput";

function InputCard() {
  const [selectedWritingStyle, setSelectedWritingStyle] = useState("Modernist");
  const [selectedStanzaStyle, setSelectedStanzaStyle] = useState(0);
  const [selectedVerseCount, setSelectedVerseCount] = useState(3);
  const [selectedRhyme, setSelectedRhyme] = useState(0);
  const [selectedMood, setSelectedMood] = useState(3);

  const [promptText, setPromptText] = useState<string>(" ");

  const setRequestError = useSetAtom(requestErrorAtom);
  const setPoemText = useSetAtom(poemTextAtom);
  const setPoemImage = useSetAtom(poemImageAtom);
  const setLoadingPoem = useSetAtom(loadingPoemAtom);

  const handlePromptSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // console.log(text);

    setLoadingPoem(true);
    setPoemImage("loader.gif");
    setPoemText("Generating...");

    fetch("/api/poem", {
      body: JSON.stringify({ type: "prompt", text: promptText }),
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

  const handleGuidedSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // console.log(text);

    setPoemImage("loader.gif");
    setPoemText("Generating...");

    fetch("/api/poem", {
      body: JSON.stringify({
        type: "guided",
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
          })
        );
      })
    );
  };

  return (
    <div className="flex flex-col p-2 mb-4 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto sm:w-full md:w-2/3 lg:w-1/2">
      <h1 className="text-center text-2xl mt-2">Write me a poem about:</h1>
      <Tabs.Group style="underline" className="w-full justify-center">
        <Tabs.Item active={true} title="Simple">
          <form onSubmit={handlePromptSubmit}>
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
            <Button
              type="submit"
              className="mt-4 bg-green-400 hover:bg-green-300 text-black w-full"
            >
              Make my poem
            </Button>
          </form>
        </Tabs.Item>
        <Tabs.Item title="Advanced">
          <form onSubmit={handleGuidedSubmit}>
            <h1 className="text-center text-xl mb-2">Select a writing style</h1>
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

            <h1 className="text-center text-xl mb-2">Pick a stanza style</h1>
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
                <option
                  key={index}
                  value={index}
                  selected={selectedStanzaStyle == index}
                >
                  {name}
                </option>
              ))}
            </Select>

            <h1 className="text-center text-xl mt-4 mb-2">
              Stanza structure and rhyme
            </h1>
            <div className="flex gap-2 mb-2 flex-col md:flex-row">
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
                  <option
                    key={index}
                    value={index}
                    selected={selectedVerseCount == index}
                  >
                    {name} ({index + 1})
                  </option>
                ))}
              </Select>
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
                  <option
                    key={index}
                    value={index}
                    selected={selectedRhyme == index}
                  >
                    {name}
                  </option>
                ))}
              </Select>
            </div>

            <h1 className="text-center text-xl mt-4 mb-2">Choose a mood</h1>
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

            <h1 className="text-center text-xl mt-4 mb-2">
              Write me a poem about:
            </h1>
            <TagInput />

            <Button
              type="submit"
              className="mt-4 bg-green-400 hover:bg-green-300 text-black w-full"
            >
              Make my poem
            </Button>
          </form>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}

export default InputCard;
