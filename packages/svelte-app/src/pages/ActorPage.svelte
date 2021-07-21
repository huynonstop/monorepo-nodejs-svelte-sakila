<script>
  import { fetchApi } from "../lib/fetch";
  let isLoading = false;
  const fetchActor = async () => {
    isLoading = true;
    try {
      const response = await fetchApi("actor");
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    } finally {
      isLoading = false;
    }
  };
  let actorsPromise = fetchActor();
</script>

<main class="container d-flex-center">
  <button
    disabled={isLoading}
    on:click={() => {
      actorsPromise = fetchActor();
    }}>{isLoading ? "Loading" : "Refresh"}</button
  >
  <div class="actors">
    {#await actorsPromise}
      <p>...waiting</p>
    {:then actors}
      {#each actors as actor (actor.actorId)}
        <h3>{JSON.stringify(actor)}</h3>
      {/each}
    {:catch error}
      <p>An error occurred!</p>
    {/await}
  </div>
</main>

<style>
  main {
    flex-wrap: wrap;
  }

  button {
    color: #ffffff;
    font-size: 1rem;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border: 1px solid #ff3e00;
    background: #ff3e00;
    transition: all 0.3s ease;
  }

  button:disabled,
  button[disabled] {
    border: 1px solid #f3c735;
    background: #f3c735;
  }

  h3 {
    text-align: center;
    padding: 0.75rem 1.5rem;
    border: 5px solid transparent;
    margin: 0;
    border-radius: 10px;
    cursor: pointer;
  }

  h3:hover {
    border: 5px solid #ff3e00;
    transition: all 0.3s ease;
  }

  .actors {
    margin: 5px;
  }
</style>
