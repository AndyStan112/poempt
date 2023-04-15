import { Icon } from '@iconify/react';
import { FC, useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
const DownloadButton: FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const download = () => {};
  const [url, setUrl] = useState();
  useEffect(() => {
    fetch('/api/download', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        imageUrl,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setUrl(data.downloadUrl);
      });
  }, []);
  return (
    <a href={url} download>
      <Button color="light" size="undefined" className="p-2.5">
        <Icon icon="fluent:arrow-download-20-regular" width="20" />
      </Button>
    </a>
  );
};

export default DownloadButton;
