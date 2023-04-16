import getConfig from "next/config";
import { Icon } from "@iconify/react";
import { FC, useState } from "react";
import { Button, Tooltip } from "flowbite-react";

const ShareButton: FC<{ poemId: string; poemTitle: string }> = ({
  poemId,
  poemTitle,
}) => {
  const [shareStatus, setShareStatus] = useState("Share this poem");
  const { publicRuntimeConfig } = getConfig();

  const share = async () => {
    const shareUrl = publicRuntimeConfig.NEXTAUTH_URL + "/share?id=" + poemId;
    console.log(shareUrl);
    if (navigator.share) {
      const shareData = {
        title: poemTitle + " - PoemPT",
        text: "View this poem generated by PoemPT",
        url: shareUrl,
      };
      await navigator.share(shareData);
      setShareStatus("Shared!");
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setShareStatus("Copied to clipboard!");
    }
  };

  return (
    <Tooltip content={shareStatus} style="light" placement="bottom">
      <Button onClick={share} color="light" size="undefined" className="p-2.5">
        <Icon icon="fluent:share-20-regular" width="20" />
      </Button>
    </Tooltip>
  );
};

export default ShareButton;