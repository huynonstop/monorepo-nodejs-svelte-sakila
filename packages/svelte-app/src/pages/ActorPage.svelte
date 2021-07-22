<script>
  import { fetchApi } from "../lib/fetch";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  export let id;
  let actor = null;
  let isLoading = false;
  let err = null;
  onMount(async () => {
    if (!+id) {
      return navigate("/actor");
    }
    actor = await fetchActor(+id);
  });

  const fetchActor = async (id) => {
    isLoading = true;
    err = null;
    try {
      const response = await fetchApi(`actor/${id}`);
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    } catch (error) {
      err = error.message;
      return null;
    } finally {
      isLoading = false;
    }
  };

  const editActor = async () => {
    isLoading = true;
    err = null;
    try {
      const response = await fetchApi(`actor/${id}`, "PATCH", {
        lastName: actor.lastName.toUpperCase(),
        firstName: actor.firstName.toUpperCase(),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      err = error.message;
    } finally {
      isLoading = false;
    }
  };
</script>

<main class="container d-flex-center fill-page">
  {#if isLoading}
    <p class="message">...Loading</p>
  {:else if actor}
    <form
      class="card"
      on:submit={(e) => {
        e.preventDefault();
        editActor();
      }}
    >
      <div class="form-control">
        <label for="actorId">ID</label>
        <input disabled type="text" id="actorId" bind:value={actor.actorId} />
      </div>
      <div class="form-control">
        <label for="firstName">Firstname</label>
        <input type="text" id="firstname" bind:value={actor.firstName} />
      </div>
      <div class="form-control">
        <label for="lastName">Lastname</label>
        <input type="text" id="lastName" bind:value={actor.lastName} />
      </div>
      <div class="form-control">
        {#if err}
          <p class="error message">{err}</p>
        {/if}
      </div>
      <div class="button-groups d-flex-center">
        <button
          class="secondary-button"
          type="button"
          on:click={() => {
            navigate("/actor");
          }}
        >
          Back
        </button>
        <button disabled={isLoading} class="primary-button" type="submit">
          Edit
        </button>
      </div>
    </form>
  {/if}
</main>

<style>
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
    column-gap: 10%;
  }

  button {
    min-width: 8rem;
    font-weight: bold;
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

  form {
    width: 50%;
  }
</style>
