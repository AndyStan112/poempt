import { Icon } from '@iconify/react';
import { Button, Tooltip } from 'flowbite-react';
import { FC } from 'react';

const RemoveButton: FC<{
  removed: boolean;
  remove: () => Promise<void>;
}> = ({ remove, removed }) => {
  return (
    <Tooltip
      content={removed ? 'Removed' : 'Remove this bookmark'}
      style="light"
      placement="bottom"
    >
    </Tooltip>
  );
};

export default RemoveButton;
