import { Icon } from '@iconify/react';
import downloadIcon from '@iconify-icons/mdi/download';
import { FC, useEffect, useState } from 'react';
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
    <a href={url} download className="w-full">
      <button className="bg-gray-200 w-full hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg shadow-md flex justify-center  items-center">
        <Icon icon={downloadIcon} className="w-5 h-5 mr-2" />
        <span>Download photo</span>
      </button>
    </a>
  );
};

export default DownloadButton;
