function PoemCard({ title, image, children }) {
  return (
    <div className="flex p-4 mb-4 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 mx-auto sm:w-full md:w-2/3 lg:w-1/2">
      <div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
          {title}
        </h5>
        <p className="font-normal text-gray-700">{children}</p>
      </div>
      <div
        className="ml-auto bg-cover bg-center w-36 h-36 rounded-md"
        style={{ backgroundImage: "url(" + image + ")" }}
      ></div>
    </div>
  );
}

export default PoemCard;
