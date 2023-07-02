export const convertToTimeString = (seconds: number) => {
  const hoursStr = String(Math.floor(seconds / 3600)).padStart(2, "0");
  seconds %= 3600;
  const minutesStr = String(Math.floor(seconds / 60)).padStart(2, "0");
  seconds = seconds % 60;
  const secondsStr = String(seconds).padStart(2, "0");

  return hoursStr === "00"
    ? `${minutesStr}:${secondsStr}`
    : `${hoursStr}:${minutesStr}:${secondsStr}`;
};
