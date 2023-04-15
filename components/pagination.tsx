/* eslint-disable jsx-a11y/alt-text */

import { Button, Select, Tooltip } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Link from 'next/link';
import { NextRouter } from 'next/router';
/* eslint-disable @next/next/no-img-element */
function Pagination(props: {
  skip: number;
  take: number;
  total: number;
  router: NextRouter;
}) {
  const { skip, take, total, router } = props;
  const validPrev = take <= skip;
  const prevSkip = skip - take;
  const validNext = take + skip < total;
  const nextSkip = skip + take;
  return (
    <div className="flex h-full justify-center items-center p-2 mb-4 gap-4 md:flex-row rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto w-fit">
      <div>
        <Tooltip content="Previous page" style="light" placement="left">
          <Button
            color="light"
            size="undefined"
            className="p-2"
            onClick={() => {
              router.replace({
                query: {
                  skip: prevSkip,
                },
              });
            }}
            disabled={!validPrev}
          >
            <Icon icon="fluent:arrow-left-20-filled" width="20" />
          </Button>
        </Tooltip>
      </div>
      <p className="text-center">
        <span className="hidden md:inline">Showing</span> {skip + 1}-
        {Math.min(skip + take, total)} of {total}
      </p>

      <div>
        <Tooltip content="Next page" style="light" placement="right">
          <Button
            color="light"
            size="undefined"
            className="p-2"
            onClick={() => {
              router.replace({
                query: {
                  skip: nextSkip,
                },
              });
            }}
            disabled={!validNext}
          >
            <Icon icon="fluent:arrow-right-20-filled" width="20" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default Pagination;
