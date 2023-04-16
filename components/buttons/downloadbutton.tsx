import { Icon } from "@iconify/react";
import { FC, useEffect, useState } from "react";
import { Button, Tooltip } from "flowbite-react";
const DownloadButton: FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [url, setUrl] = useState();
  useEffect(() => {
    fetch("/api/download", {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        imageUrl,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setUrl(data.downloadUrl);
      });
  }, [imageUrl]);
  return (
    <Tooltip content="Download the image" style="light" placement="bottom">
      <a href={url} download>
        <Button color="light" size="undefined" className="p-2.5">
          <Icon icon="fluent:arrow-download-20-regular" width="20" />
        </Button>
      </a>
    </Tooltip>
  );
};

export default DownloadButton;
