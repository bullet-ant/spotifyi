<script>
  import Downloader from "./components/Downloader.svelte";
  import Search from "./components/Search.svelte";
</script>

<div class="top">
  <div class="heading">SpotiFYI</div>
  <div class="search-bar">
    <Search />
  </div>
</div>
<div class="table">
  <Downloader />
</div>

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

  @keyframes flyUp {
    from {
      transform: translateY(70%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
