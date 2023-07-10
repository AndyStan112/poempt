import { Icon } from "@iconify/react";
import { Dispatch, FC } from "react";
import { SetStateAction } from "react";
import { Button } from "flowbite-react";
import { sleep } from "../../lib/util";
const RegenerateButton: FC<{
  sessionId?: string;
  poem: string;
  setImage: Dispatch<SetStateAction<string>>;
  poemId: string;
}> = ({ sessionId, poem, setImage, poemId }) => {
  const regenerate = async () => {
    setImage("");
    console.log(poemId);
    await fetch(
      "/api/regenerate/" + sessionId + "?cache=" + new Date().getTime(),
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          poem,
          poemId,
        }),
      }
    )
      .then((r) => r.json())
      .then(async (data) => {
        //console.log(data);
        await sleep(10000);
        setImage(data.image);
      });
  };
  return (
    <Button onClick={regenerate} size="undefined" className="p-2.5">
      <Icon icon="fluent:arrow-sync-20-regular" width="20" className="mr-1" />
      <span>Redraw</span>
    </Button>
  );
};
export default RegenerateButton;
