export default function relativeTime(updated_at: any) {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const oldTimestamp = Math.floor(new Date(updated_at).getTime() / 1000);
  const difference = timestamp - oldTimestamp;

  let output = "";
  if (difference < 60) {
    output = `${difference} seconds ago`;
  } else if (difference < 3600) {
    output = `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
    output = `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
    output = `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
    output = `${Math.floor(difference / 2620800)} months ago`;
  } else {
    output = `${Math.floor(difference / 31449600)} years ago`;
  }

  return output;
}
