<script>
  import { tracks } from "../store";

  let spotifyUrl = "";

  async function fetchMetadata(event) {
    const trackRegex = new RegExp("https://open.spotify.com/track/.*");
    const playlistRegex = new RegExp("https://open.spotify.com/playlist/.*");
    const url = spotifyUrl.split("?")[0];
    let id;
    if (trackRegex.test(url)) id = url.split(`track/`)[1];
    else if (playlistRegex.test(url)) id = url.split(`playlist/`)[1];

    try {
      const spotifyiServer = import.meta.env.VITE_SPOTIFYI_SERVER;
      const response = await fetch(
        `${spotifyiServer}/spotify/${
          trackRegex.test(url) ? "track" : "playlist"
        }/${id}`
      );
      if (response.ok) {
        $tracks = await response.json();
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
</script>

<div class="search-container">
  <input
    class="search-bar"
    placeholder="Enter spotify link here"
    bind:value={spotifyUrl}
  />
  <button class="search-icon" on:click={fetchMetadata}>🔍</button>
</div>

<style>
  .search-container {
    display: flex;
    align-items: center;
    background-color: #242424;
    width: 60%;
    height: 40px;
    border: 1.5px solid #ccc;
    border-radius: 22px;
    padding: 1px;
  }

  .search-bar {
    flex: 16;
    background-color: #242424;
    border: none;
    outline: none;
    font-size: 18px;
    border-radius: 22px 0 0 22px;
    height: 100%;
    padding-left: 18px;
  }

  .search-icon {
    background-color: #242424;
    font-size: 20px;
    flex: 1;
    height: 100%;
    border: none;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 0 20px;
  }
</style>
