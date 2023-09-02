<script>
  import Downloader from "./components/Downloader.svelte";
  import Search from "./components/Search.svelte";
  import preloader from "./assets/preloader.gif";
  import { errors, loading } from "./store";
</script>

<div class="top">
  <div class="heading">SpotiFYI</div>
  <div class="search-bar">
    <Search />
  </div>
</div>
{#if $loading}
  <div class="preloader">
    <img src={preloader} alt="searching..." width="45px" height="45px" />
  </div>
{:else if $errors.length > 0}
  <div class="error">Hmm... The link is not quite right!</div>
{:else}
  <div class="table">
    <Downloader />
  </div>
{/if}

<style>
  .top {
    height: 30vh;
    /* animation: flyUp 2s ease; */
  }
  .table {
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .heading {
    font-size: 70px;
    font-weight: 600;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: end;
  }
  .search-bar {
    display: flex;
    justify-content: center;
  }

  .preloader, .error {
    display: flex;
    justify-content: center;
  }
  @keyframes flyUp {
    from {
      transform: translateY(70%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
