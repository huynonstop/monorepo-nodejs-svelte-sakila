<script>
  import { fetchApi } from "../lib/fetch";
  import { navigate } from "svelte-routing";
  let pathname = window.location.pathname;

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

  const createActor = async (actor) => {
    isLoading = true;
    err = null;
    try {
      const curActors = await actorsPromise;
      const response = await fetchApi("actor", "POST", actor);
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      actorsPromise = Promise.resolve([...curActors, data]);
    } catch (error) {
      err = error.message || "Something went wrong";
    } finally {
      isLoading = false;
    }
  };

  const deleteActor = async (id) => {
    isLoading = true;
    err = null;
    try {
      const curActors = await actorsPromise;
      const response = await fetchApi(`actor/${id}`, "DELETE");
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      actorsPromise = Promise.resolve(
        curActors.filter((actor) => actor.actorId !== id)
      );
    } catch (error) {
      err = error.message || "Something went wrong";
    } finally {
      isLoading = false;
    }
  };
  let isCreating = false;
  let isDeleting = false;
  let actorsPromise = fetchActor();
  let firstName = "";
  let lastName = "";
  let err = null;
</script>

<main class="container fill-page">
  <div class="button-groups d-flex-center">
    <button
      class="secondary-button"
      disabled={isLoading}
      on:click={() => {
        err = null;
        actorsPromise = fetchActor();
      }}
      >Refresh
    </button>
    <button
      class={isCreating ? "secondary-button" : "primary-button"}
      on:click={() => {
        isCreating = !isCreating;
      }}
    >
      {isCreating ? "Close" : "Create"}
    </button>
    <button
      class={`delete ${isDeleting ? "primary-button" : "secondary-button"}`}
      on:click={() => {
        isDeleting = !isDeleting;
      }}
    >
      {isDeleting ? "Stop" : "Delete"}
    </button>
  </div>

  {#if err}
    <div>
      <p class="message error">{err}</p>
    </div>
  {/if}

  {#if isCreating}
    <form
      class="card"
      on:submit={async (e) => {
        e.preventDefault();
        await createActor({
          firstName: firstName.toUpperCase(),
          lastName: lastName.toUpperCase(),
        });
        firstName = "";
        lastName = "";
        if (!err) isCreating = false;
      }}
    >
      <div class="form-control">
        <label for="firstName">Firstname</label>
        <input type="text" id="firstname" bind:value={firstName} />
      </div>
      <div class="form-control">
        <label for="lastName">Lastname</label>
        <input type="text" id="lastName" bind:value={lastName} />
      </div>

      <div class="button-groups d-flex-center">
        <button disabled={isLoading} class="primary-button" type="submit">
          Finish
        </button>
      </div>
    </form>
  {/if}
  <div class={isDeleting ? "delete actors" : "actors"}>
    {#await actorsPromise}
      <p class="message">...Loading</p>
    {:then actors}
      <p class="message">
        {isDeleting ? "Click to delete" : "Click to edit"}
      </p>
      {#each actors as { actorId, firstName, lastName } (actorId)}
        <div
          class="actor card"
          on:click={async () => {
            if (isDeleting) {
              await deleteActor(actorId);
              return;
            }
            navigate(`${pathname}/${actorId}`);
          }}
        >
          <p><strong>ID:</strong> {actorId}</p>
          <p><strong>Name:</strong> {firstName} {lastName}</p>
        </div>
      {/each}
    {:catch error}
      <p class="message error">{error.message}</p>
    {/await}
  </div>
</main>

<style>
  main {
    flex-direction: column;
    display: flex;
    row-gap: 12px;
  }

  .form-control {
    margin: 0.5rem 0;
  }
  label {
    color: #ff3e00;
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    padding: 0.25rem;
    font: inherit;
    color: #ff3e00;
  }
  input:focus {
    outline: none;
    border-color: #ff3e00;
  }

  .button-groups {
    column-gap: 5%;
  }

  button {
    min-width: 8rem;
    font-weight: bold;
  }

  p {
    padding: 0.75rem 1.5rem;
    margin: 0;
    border-radius: 10px;
    word-wrap: break-word;
  }

  .actors {
    display: flex;
    margin: 5px;
    flex-wrap: wrap;
    column-gap: 5%;
  }

  .actor.card:hover {
    border: 5px solid #ff3e00;
    background-color: #ff3e00;
    color: #ffffff;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: none;
  }

  .delete .actor.card:hover {
    border-color: #df263e;
    background-color: #df263e;
  }

  .actor {
    border: 5px solid transparent;
    flex: 1 1 30%;
    max-width: 30%;
    margin-bottom: 1rem;
  }

  .message {
    flex: 1 1 100%;
    max-width: 100%;
    text-align: center;
  }

  .error {
    font-weight: bold;
    color: #df263e;
  }

  .delete.primary-button {
    background-color: #df263e;
    border-color: #df263e;
  }

  .delete.secondary-button {
    border-color: #df263e;
    color: #df263e;
  }
</style>
