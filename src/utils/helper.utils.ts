export const Sec2Hour = (seconds: number) => {
  if (seconds < 60) return seconds.toString() + " seconds";

  if (seconds < 3600)
    return (
      Math.floor(seconds / 60).toString() +
      " minutes " +
      (seconds % 60).toString() +
      " seconds"
    );

  return (
    Math.floor(seconds / 3600).toString() +
    " hours " +
    Math.floor((seconds % 3600) / 60).toString() +
    " minutes"
  );
};

export const Stamp2Date = (dateString: string) => {
  const date = new Date(dateString);

  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("-");
};
