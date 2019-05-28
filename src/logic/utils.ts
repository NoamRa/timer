export const getDurationQueryParam = (): number | undefined => {
  const urlParams = new URLSearchParams(window.location.search);
  const t: string | null = urlParams.get('t');
  const time: number = parseInt(t as string);
  if (!isNaN(time)) {
    return time;
  };
};


