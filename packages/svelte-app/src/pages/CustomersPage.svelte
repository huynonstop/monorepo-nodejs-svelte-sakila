<script>
  import { fetchApi } from "../lib/fetch";
  import { navigate } from "svelte-routing";
  let pathname = window.location.pathname;

  let isLoading = false;
  const fetchCustomers = async () => {
    isLoading = true;
    try {
      const response = await fetchApi("customer");
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

  const createCustomer = async (customer) => {
    isLoading = true;
    err = null;
    try {
      const curCustomers = await customerPromise;
      const response = await fetchApi("customer", "POST", customer);
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      customerPromise = Promise.resolve([...curCustomers, data]);
    } catch (error) {
      err = error.message || "Something went wrong";
    } finally {
      isLoading = false;
    }
  };

  const deleteCustomer = async (id) => {
    isLoading = true;
    err = null;
    try {
      const curCustomers = await customerPromise;
      const response = await fetchApi(`customer/${id}`, "DELETE");
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      customerPromise = Promise.resolve(
        curCustomers.filter((customer) => customer.customerId !== id)
      );
    } catch (error) {
      err = error.message || "Something went wrong";
    } finally {
      isLoading = false;
    }
  };
  let isCreating = false;
  let isDeleting = false;
  let customerPromise = fetchCustomers();
  let firstName = "";
  let lastName = "";
  let email = "";
  let storeId = 1;
  let addressId = 1;
  let active = 1;
  let err = null;
</script>

<main class="container fill-page">
  <div class="button-groups d-flex-center">
    <button
      class="secondary-button"
      disabled={isLoading}
      on:click={() => {
        err = null;
        customerPromise = fetchCustomers();
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
        await createCustomer({
          firstName: firstName.toUpperCase(),
          lastName: lastName.toUpperCase(),
          email,
          storeId,
          addressId,
          active,
        });
        firstName = "";
        lastName = "";
        email = "";
        storeId = 1;
        addressId = 1;
        active = 1;
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
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} />
      </div>
      <div class="form-control">
        <label for="store">Store</label>
        <input type="number" step="1" min="1" id="store" bind:value={storeId} />
      </div>
      <div class="form-control">
        <label for="address">Address</label>
        <input
          type="number"
          step="1"
          min="1"
          id="address"
          bind:value={addressId}
        />
      </div>
      <div class="form-control">
        <label for="active">Active</label>
        <input type="number" step="1" min="1" id="active" bind:value={active} />
      </div>

      <div class="button-groups d-flex-center">
        <button disabled={isLoading} class="primary-button" type="submit">
          Finish
        </button>
      </div>
    </form>
  {/if}
  <div class={isDeleting ? "delete customers" : "customers"}>
    {#await customerPromise}
      <p class="message">...Loading</p>
    {:then customers}
      <p class="message">
        {isDeleting ? "Click to delete" : "Click to edit"}
      </p>
      {#each customers as { customerId, firstName, lastName, email, active } (customerId)}
        <div
          class="customer card"
          on:click={async () => {
            if (isDeleting) {
              await deleteCustomer(customerId);
              return;
            }
            navigate(`${pathname}/${customerId}`);
          }}
        >
          <p><strong>ID:</strong> {customerId}</p>
          <p><strong>Name:</strong> {firstName} {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Active:</strong> {active}</p>
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

  input[type="number"] {
    max-width: 200px;
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

  .customers {
    display: flex;
    margin: 5px;
    flex-wrap: wrap;
    column-gap: 10%;
  }

  .customer.card:hover {
    border: 5px solid #ff3e00;
    background-color: #ff3e00;
    color: #ffffff;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: none;
  }

  .delete .customer.card:hover {
    border-color: #df263e;
    background-color: #df263e;
  }

  .customer {
    border: 5px solid transparent;
    flex: 1 1 45%;
    max-width: 45%;
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
