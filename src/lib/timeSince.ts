export default function timeSince(datetime: string) {
  const now = new Date();
  const timeStamp = new Date(datetime);
  const secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;

  if (secondsPast < 60) return parseInt(secondsPast as any) + "s ago";
  if (secondsPast < 3600) return parseInt((secondsPast / 60) as any) + "m ago";
  if (secondsPast <= 86400) {
    return parseInt((secondsPast / 3600) as any) + "h ago";
  }

  if (secondsPast > 86400) {
    const day = timeStamp.getDate();
    const month = (timeStamp as any)
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    const year =
      timeStamp.getFullYear() == now.getFullYear()
        ? ""
        : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}
