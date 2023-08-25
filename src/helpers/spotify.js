export const extractId = (url) => {
  const spotifyUrlRe = new RegExp(
    "https://open.spotify.com/(album|track|playlist)/(\\w+)(?:\\?.*)?"
  );

  const match = spotifyUrlRe.exec(url);

  if (match) {
    const contentType = match[1];
    const id = match[2].split("?")[0];
    return { type: contentType, id: id };
  } else {
    throw new Error("Pasted URL isn't a valid Spotify link.");
  }
};
