export async function getTime(): Promise<string> {
  const date = new Date();
  const unixTime = date.getTime();
  return `${unixTime}`;
}
