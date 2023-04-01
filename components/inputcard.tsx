import { Tabs, TextInput, Button, Select } from "flowbite-react";
import { useState } from "react";
import { writingStyle, stanzaStyles } from "../utils/constants";

function InputCard() {
  const [selectedWritingStyle, setSelectedWritingStyle] = useState("Modernist");

  return (
    <div className="flex p-2 mb-4 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto sm:w-full md:w-2/3 lg:w-1/2">
      <Tabs.Group style="underline" className="w-full justify-center">
        <Tabs.Item active={true} title="Guided Input">
          <form>
            <h1 className="text-center text-xl mb-2">Pick a theme</h1>
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
            <Select id="stanzaStyle" name="stanzaStyle" className="w-full mb-2">
              {stanzaStyles.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-300 text-black w-full"
            >
              Make my poem
            </Button>
          </form>
        </Tabs.Item>
        <Tabs.Item title="Custom Prompt">
          <h1 className="text-center text-xl mb-2">
            Write any poem suggestion
          </h1>
          <form>
            <TextInput
              id="plainPrompt"
              type="text"
              placeholder="Plain Prompt"
              className="flex-1 mb-2"
              required={true}
            />
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-300 text-black w-full"
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
