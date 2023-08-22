<script>
  import { tracks } from "../store";
  import preloader from "../assets/preloader.gif";
  let loading = [0];

  const download = async (index, name, artists, album) => {
    loading = [...loading, index];
    const spotifyiServer = import.meta.env.VITE_SPOTIFYI_SERVER;
    const url = `${spotifyiServer}/youtube/download/`;
    const data = { name: name, album: album, artists: artists };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}.m4a`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loading = loading.filter((item) => item !== index);
    }
  };
</script>

{#if $tracks.length > 0}
  <div class="chart">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {#each $tracks as song, index}
          <tr
            class="content-row"
            on:click={() =>
              download(index + 1, song.name, song.artists, song.album)}
          >
            <td>{index + 1}</td>
            <td>
              <div class="title">
                <img
                  style="padding-right: 15px;"
                  src={loading.includes(index + 1)
                    ? preloader
                    : song.thumbnails[song.thumbnails.length - 1]}
                  alt="{song.name}'s cover image"
                  width="45px"
                  height="45px"
                />
                <div>
                  {song.name}
                  <div style="font-size: 14px;">
                    {song.artists.join(", ")}
                  </div>
                </div>
              </div>
            </td>
            <td>{song.album}</td>
            <td>{song.release_date.split("-")[0]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  div {
    font-size: 18px;
  }
  /* Style for the table */
  table {
    border-collapse: collapse;
    width: 70vw;
    max-width: 100%;
  }

  /* Style for table headers */
  th {
    border-bottom: 1px solid #fff; /* Horizontal border for headers */
    padding: 8px;
    text-align: left;
  }

  /* Style for table rows */
  .content-row:hover {
    /* Apply hover effect to the 2nd row (1st content row) */
    background-color: #1b1b1b;
    cursor: pointer;
  }

  /* Style for table cells */
  td {
    padding: 8px;
  }

  .title {
    display: flex;
    align-items: end;
  }
</style>
