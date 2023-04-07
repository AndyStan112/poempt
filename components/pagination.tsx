/* eslint-disable jsx-a11y/alt-text */

import { Button, Select } from 'flowbite-react';
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
    <div className="flex h-full justify-center items-center p-4 mb-4 flex-col gap-8 md:flex-row rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto w-fit">
      <div>
        <Button
          color="purple"
          className="w-full"
          onClick={() => {
            router.replace({
              query: {
                skip: prevSkip,
              },
            });
          }}
          disabled={!validPrev}
        >
          Previous
        </Button>
      </div>
      <p className="text-center">
        Showing {skip || -1 + 1}-{Math.min(skip + take, total)} of {total}
      </p>

      <div>
        <Button
          color="purple"
          className="w-full"
          onClick={() => {
            router.replace({
              query: {
                skip: nextSkip,
              },
            });
          }}
          disabled={!validNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
