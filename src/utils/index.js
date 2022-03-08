export function convertSecondsToMinutesSeconds(secs) {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);

  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${returnedMinutes}:${returnedSeconds}`;
}
