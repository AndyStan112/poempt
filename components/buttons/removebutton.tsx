import { Icon } from '@iconify/react';
import { Button } from 'flowbite-react';
import { FC } from 'react';

const RemoveButton: FC<{
  removed: boolean;
  remove: () => Promise<void>;
}> = ({ remove, removed }) => {
  return (
    <Button color="failure" size="undefined" className="p-2.5">
      <Icon icon="fluent:bookmark-off-20-regular" width="20" />
    </Button>
  );
};

export default RemoveButton;
