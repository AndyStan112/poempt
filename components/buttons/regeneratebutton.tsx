import { Icon } from '@iconify/react';
import { FC } from 'react';
import autorenewIcon from '@iconify-icons/mdi/autorenew';
const RegenerateButton: FC<{ sessionId?: string }> = ({ sessionId }) => {
  return (
    <button
      onClick={() => {}}
      className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Icon icon={autorenewIcon} className="w-5 h-5" />
      <span>Regenerate photo</span>
    </button>
  );
};
export default RegenerateButton;
