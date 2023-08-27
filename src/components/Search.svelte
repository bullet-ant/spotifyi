<script>
  import { extractId } from "../helpers/spotify";
  import { tracks, errors } from "../store";

  let url = "";

  async function fetchMetadata(event) {
    try {
      const { id, type } = extractId(url);
      const server = import.meta.env.VITE_SPOTIFYI_SERVER;

      const response = await fetch(`${server}/spotify/${type}/${id}`);
      
      if (response.ok) {
        $errors = [];
        $tracks = await response.json();
      } else {
        $errors = [...$errors, `${response.status}: ${response.statusText}`]
      }
    } catch (error) {
      $errors = [...$errors, error.message];
    }
  }
</script>

<div class="search-container">
  <input
    class="search-bar"
    placeholder="Enter spotify link here"
    bind:value={url}
  />
  <button class="search-icon" on:click={fetchMetadata}>🔍</button>
</div>

<style>
  .search-container {
    display: flex;
    align-items: center;
    background-color: #272829;
    width: 60%;
    height: 40px;
    border: 1.5px solid #FFF6E0;
    border-radius: 22px;
    padding: 1px;
  }

  .search-bar {
    flex: 16;
    background-color: #272829;
    color: #FFF6E0;
    border: none;
    outline: none;
    font-size: 18px;
    border-radius: 22px 0 0 22px;
    height: 100%;
    padding-left: 18px;
  }

  .search-icon {
    background-color: #272829;
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
