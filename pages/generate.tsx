import type { NextPage } from "next";
import {
  Accordion,
  Alert,
  Button,
  Select,
  Tabs,
  TextInput,
  Textarea,
} from "flowbite-react";
import MainNavbar from "../components/navbar";
import MainPage from "../components/page";
import PoemCard from "../components/poemcard";
import Waves from "../waves";
import HeroBanner from "../components/herobanner";
import MainFooter from "../components/footer";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import BookmarkButton from "../components/buttons/bookmarkbutton";
import { UserInput } from "../types";
import {
  moods,
  stanzaCounts,
  stanzaRhymes,
  stanzaStyles,
  writingStyle,
  generativeModels,
} from "../lib/constants";

const Generate: NextPage = () => {
  const { data: session, status } = useSession();

  // Form value states
  const [selectedWritingStyle, setSelectedWritingStyle] = useState("Modernist");
  const [selectedStanzaStyle, setSelectedStanzaStyle] = useState(0);
  const [selectedVerseCount, setSelectedVerseCount] = useState(3);
  const [selectedRhyme, setSelectedRhyme] = useState(0);
  const [selectedMood, setSelectedMood] = useState(3);
  const [promptText, setPromptText] = useState<string>("");
  const [poemPromptText, setPoemPromptText] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>(
    generativeModels[0][0]
  );

  // Poem request states
  const [requestError, setRequestError] = useState(false);
  const [poemShow, setPoemShow] = useState(false);
  const [poemId, setPoemId] = useState("");
  const [poemTitle, setPoemTitle] = useState("");
  const [poemText, setPoemText] = useState("");
  const [poemImage, setPoemImage] = useState("");
  const [loadingPoem, setLoadingPoem] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  // Poem action states
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  let ttsVoices: any[] = [];

  function getTtsVoices() {
    ttsVoices = speechSynthesis.getVoices();
    return true;
  }

  function speak() {
    if (isSpeaking) {
      speechSynthesis.cancel();
    } else {
      const utt = new SpeechSynthesisUtterance(poemText);
      utt.voice = ttsVoices[selectedVoice];
      speechSynthesis.speak(utt);
    }
    setIsSpeaking(speechSynthesis.speaking);
  }

  // #region Generate helpers
  const setGenerating = () => {
    setPoemShow(true);
    setLoadingPoem(true);
    setPoemImage("loader.gif");
    setPoemTitle("");
    setPoemText("");
  };

  const getPoem = async (userInput: UserInput) => {
    return fetch("/api/generate/poem", {
      body: JSON.stringify(userInput),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const getImage = async (poem: string) => {
    return fetch("/api/generate/image", {
      body: JSON.stringify({ poem: poem }),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    });
  };
  // #endregion

  // #region Generate form submit
  const handleSubmit1 = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log(session, "handle submit 1");
    setGenerating();

    const userInput: UserInput = {
      model: selectedModel,
      subject: promptText,
      writingStyle: selectedWritingStyle,
      stanzaStyle: stanzaStyles[selectedStanzaStyle],
      rhyme: stanzaRhymes[selectedRhyme],
      verses: (selectedVerseCount + 1).toString(),
      mood: moods[selectedMood],
    };

    await getPoem(userInput)
      .then((r) =>
        r.json().then(async (data) => {
          if (data.error) {
            setRequestError(true);
            return;
          }
          const { title, poem } = data;

          setPoemTitle(title);
          setPoemText(poem.trim());
          setLoadingImage(true);

          await getImage(data.poem)
            .then((r) =>
              r
                .json()
                .then((data) => {
                  setPoemImage(data.image);
                  setLoadingImage(false);
                  setLoadingPoem(false);
                  const postData = { title, poem, image: data.image };
                  if (!session) {
                    console.log("this is the actual issue");
                    throw new Error("Session not found");
                  }
                  fetch("/api/poems/post/" + session.id, {
                    body: JSON.stringify(postData),
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
                      //console.log(data.poemId);
                      setPoemId(data.poemId);
                    })
                  );
                })
                .catch((e) => {
                  console.log("sds");
                  console.log(e);
                })
            )
            .catch((e) => {
              console.log("imagine", e);
            });
        })
      )
      .catch((e) => console.log("getPoem", e));
  };

  const handleSubmit2 = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setPoemShow(true);
    setLoadingPoem(true);
    setPoemImage("loader.gif");
    setPoemTitle("");
    setPoemText("");

    fetch("/api/generate/continuation", {
      body: JSON.stringify({
        poem: poemPromptText,
      }),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => {
        setRequestError(!r.ok);
        return r.json();
      })
      .then((data) => {
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
          })
        );
      });
  };
  // #endregion

  const style1 =
    "transition duration-700 ease-in-out flex flex-col p-5 mb-4 rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto sm:w-full md:w-2/3 lg:w-1/2";
  console.log(session);

  return (
    <>
      <Waves hue={280} height="500px" animate={loadingPoem} />
      <MainNavbar />
      <MainPage>
        {!poemShow && (
          <>
            <HeroBanner>
              <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
                AI Based Poem Generator
              </h1>
              <p className="text-white text-center drop-shadow-lg">
                Discover a new way to see the world.
                <br />
                Let our AI poem generator bring your words to life with stunning
                visuals.
              </p>
            </HeroBanner>
            <div
              className={
                poemShow
                  ? style1 + " scale-y-0 opacity-0 -translate-y-1/2 h-0"
                  : style1
              }
            >
              <h1 className="text-center text-2xl mb-2">
                Write me a poem based on:
              </h1>
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
                          <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-3 gap-2">
                              {writingStyle.map((name) => (
                                <Button
                                  color={
                                    selectedWritingStyle == name
                                      ? "success"
                                      : "light"
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
                                  setSelectedStanzaStyle(
                                    Number(e.target.value)
                                  );
                                }}
                              >
                                {stanzaStyles.map((name, index) => (
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
                        <Accordion.Title>Structure and rhyme</Accordion.Title>
                        <Accordion.Content>
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-4 mb-2 flex-col md:flex-row">
                              <div className="flex-1 flex flex-col gap-1">
                                <label>Verse count</label>
                                <Select
                                  id="stanzaCount"
                                  name="stanzaCount"
                                  className="w-full"
                                  value={selectedVerseCount}
                                  onChange={(e) => {
                                    setSelectedVerseCount(
                                      Number(e.target.value)
                                    );
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

                      <Accordion.Panel>
                        <Accordion.Title>Generation options</Accordion.Title>
                        <Accordion.Content>
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-2">
                              <div className="p-2 pl-0 text-left w-fit">
                                Generative model:
                              </div>
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                {generativeModels.map((model) => (
                                  <Button
                                    color={
                                      selectedModel == model[0]
                                        ? "success"
                                        : "light"
                                    }
                                    className="w-full"
                                    key={model[0]}
                                    onClick={() => {
                                      setSelectedModel(model[0]);
                                    }}
                                  >
                                    {model[1]}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Accordion.Content>
                      </Accordion.Panel>
                    </Accordion>
                    <Button
                      color="success"
                      type="submit"
                      className="mt-4 w-full"
                    >
                      <Icon
                        icon="fluent:pen-20-regular"
                        width="20"
                        className="mr-1"
                      />
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
                      color="success"
                      type="submit"
                      className="mt-4 w-full"
                    >
                      <Icon
                        icon="fluent:pen-20-regular"
                        width="20"
                        className="mr-1"
                      />
                      Write me a poem
                    </Button>
                  </form>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </>
        )}
        {requestError && (
          <Alert color="failure" className="mb-4 mx-auto shadow-md">
            <span>
              <span className="font-medium">Info alert!</span>
              Change a few things up and try submitting again.
            </span>
          </Alert>
        )}
        {poemShow &&
          (loadingPoem ? (
            loadingImage ? (
              <HeroBanner>
                <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
                  Almost there, we&apos;re making the finishing touches...
                </h1>
                <p className="text-white text-center drop-shadow-lg">
                  See your poetry come to life.
                  <br /> Watch as our AI artist paints a picture worth a
                  thousand words.
                </p>
              </HeroBanner>
            ) : (
              <HeroBanner>
                <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
                  Hang on, we&apos;re generating a poem...
                </h1>
                <p className="text-white text-center drop-shadow-lg">
                  Unleashing the power of AI to create a masterpiece for you.
                  <br />
                  Sit tight and watch the magic unfold.
                </p>
              </HeroBanner>
            )
          ) : (
            <HeroBanner>
              <h1 className="text-white text-center text-4xl mb-4 drop-shadow-lg">
                Your generated poem is here!
              </h1>
              <p className="text-white text-center drop-shadow-lg">
                Words that stir the soul, crafted by AI.
                <br />
                Enjoy the fruits of technology&apos;s poetic algorithms.
              </p>
            </HeroBanner>
          ))}
        {!requestError && poemShow && (
          <div
            className={
              !poemShow
                ? "transition duration-700 scale-y-0 opacity-0 -translate-y-1/2 h-0"
                : "transition duration-700"
            }
          >
            <PoemCard
              title={poemTitle}
              image={poemImage}
              text={poemText}
              userName={
                status === "authenticated" && session.user?.name
                  ? session.user?.name
                  : "Anonymous"
              }
              userImage={
                status === "authenticated" && session.user?.image
                  ? session.user?.image
                  : ""
              }
            />
            <div className="flex h-full p-2 mb-4 flex-col gap-2 rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto w-fit">
              <div className="flex gap-2">
                <Select
                  value={selectedVoice}
                  disabled={isSpeaking}
                  onChange={(e) => setSelectedVoice(Number(e.target.value))}
                >
                  {getTtsVoices() && ttsVoices.length
                    ? ttsVoices.map((voice, index) => (
                        <option key={index} value={index}>
                          {voice.name}
                        </option>
                      ))
                    : ""}
                </Select>
                <Button
                  size="undefined"
                  color="light"
                  onClick={speak}
                  className="px-2.5 pt-2.5 pb-[9px]"
                >
                  {isSpeaking ? (
                    <Icon icon="fluent:stop-20-regular" width="20" />
                  ) : (
                    <Icon
                      icon="fluent:immersive-reader-20-regular"
                      width="20"
                    />
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="success"
                  onClick={() => setPoemShow(false)}
                  className="flex-grow"
                >
                  <Icon
                    icon="fluent:code-text-edit-20-regular"
                    width="20"
                    className="mr-1"
                  />
                  Generate another poem
                </Button>
                <div className="flex grow">
                  <BookmarkButton
                    sessionId={session ? session.id : ""}
                    bookmarked={bookmarked}
                    setBookmarked={setBookmarked}
                    poemId={poemId}
                    buttonType="full"
                  ></BookmarkButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </MainPage>
      <MainFooter />
    </>
  );
};

export default Generate;
