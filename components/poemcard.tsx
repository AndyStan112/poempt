/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

function PoemCard({ title, image, children }) {
  return (
    <div className="flex h-full p-4 mb-4 flex-col gap-3 md:flex-row rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto sm:w-full md:w-2/3 lg:w-1/2">
      <div className="flex-2 text-center md:text-left">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
          {title}
        </h5>
        <p className="font-normal text-gray-700 whitespace-pre-wrap">
          {children}
        </p>
      </div>
      <div className="flex flex-1 flex-row justify-center items-center">
        <img src={image} alt={title} className="rounded-md shadow-md" />
      </div>
    </div>
  );
}

export default PoemCard;
