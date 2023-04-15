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
      <Button
        color={removed ? 'light' : 'failure'}
        disabled={removed}
        size="undefined"
        className="p-2.5"
        onClick={remove}
      >
        <Icon icon="fluent:bookmark-off-20-regular" width="20" />
      </Button>
    </Tooltip>
  );
};

export default RemoveButton;
