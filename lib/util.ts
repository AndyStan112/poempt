export const extractIdFromUrl = (url: string | undefined): string | null => {
  if (!url) return null;
  if (!url.startsWith('https://storage.googleapis.com/')) return null;

  const components = url.split('/');
  if (components.length < 5) return null;

  return components[components.length - 1];
};
export const generateUrlFromId = (fileName: string): string =>
  'https://storage.googleapis.com/' + process.env.BUCKET_NAME! + '/' + fileName;
