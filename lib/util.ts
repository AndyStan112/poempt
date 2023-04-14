export const extractIdFromUrl = (url: string): string | null => {
  if (!url.startsWith('https://storage.googleapis.com/')) return null;

  const components = url.split('/');
  if (components.length < 5) return null;

  return components[components.length - 1];
};
