import { Icon } from '@iconify/react';
import downloadIcon from '@iconify-icons/mdi/download';
import { FC } from 'react';
const DownloadButton: FC<any> = () => {
  const download = () => {};

  return (
    <button
      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg shadow-md flex justify-center  items-center"
      onClick={download}
    >
      <Icon icon={downloadIcon} className="w-5 h-5 mr-2" />
      <span>Download photo</span>
    </button>
  );
};

export default DownloadButton;
