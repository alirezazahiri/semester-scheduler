const getTimeScale = (from: string, to: string): number => {
  const timeStart = Number(new Date("01/01/2007 " + from));
  const timeEnd = Number(new Date("01/01/2007 " + to));

  let difference = timeEnd - timeStart;

  difference = difference / 60 / 60 / 1000;

  return difference;
};

export default getTimeScale;
