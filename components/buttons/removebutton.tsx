import { Icon } from '@iconify/react';
import { FC } from 'react';
import deleteIcon from '@iconify-icons/mdi/delete';

const RemoveButton: FC<{
  removed: boolean;
  remove: () => Promise<void>;
}> = ({ remove, removed }) => {
  return (
    <button
      onClick={remove}
      disabled={removed}
      className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <Icon icon={deleteIcon} className="w-5 h-5" />
      <span>{!removed ? 'Remove bookmark' : 'Removed bookmark'}</span>
    </button>
  );
};

export default RemoveButton;
