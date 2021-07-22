<script>
  import { Router, Link, Route } from "svelte-routing";
  import logo from "./assets/svelte.png";
  import Home from "./pages/Home.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import ActorsPage from "./pages/ActorsPage.svelte";
  import CustomersPage from "./pages/CustomersPage.svelte";
  import ActorPage from "./pages/ActorPage.svelte";
  import CustomerPage from "./pages/CustomerPage.svelte";
  export let url = "";
</script>

<svelte:head>
  <title>Sakila</title>
</svelte:head>

<Router {url}>
  <header>
    <h1 class="d-flex-center">
      <img src={logo} alt="Svelte Logo" />
      Sakila
    </h1>
    <nav class="d-flex-center">
      <Link class="link" to="/">Home</Link>
      <Link to="actor">Actor</Link>
      <Link to="customer">Customer</Link>
    </nav>
  </header>
  <Route path="actor/:id" let:params>
    <ActorPage id={params.id} />
  </Route>
  <Route path="actor"><ActorsPage /></Route>
  <Route path="customer/:id" let:params><CustomerPage id={params.id} /></Route>
  <Route path="customer"><CustomersPage /></Route>
  <Route path="/"><Home /></Route>
  <Route><NotFound /></Route>
  <footer>
    <h3 class="d-flex-center">Powered by Svelte</h3>
  </footer>
</Router>

<style>
  :global(.card) {
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
  }
  :global(.primary-button) {
    color: #ffffff;
    font-size: 1rem;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    border: 0.25rem solid #ff3e00;
    background: #ff3e00;
    transition: all 0.3s ease;
  }

  :global(.primary-button:disabled),
  :global(.primary-button[disabled]) {
    border: 0.25rem solid #f3c735;
    background: #f3c735;
  }

  :global(.secondary-button) {
    color: #ff3e00;
    font-size: 1rem;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    border: 0.25rem solid #ff3e00;
    background: #ffffff;
    transition: all 0.3s ease;
  }

  :global(.secondary-button:disabled),
  :global(.secondary-button[disabled]) {
    color: #ffffff;
    border: 0.25rem solid #f3c735;
    background: #f3c735;
  }

  :global(html),
  :global(#app),
  :global(body) {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    min-height: 100%;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(.container) {
    max-width: min(1440px, 80%);
    margin: 0 auto;
  }

  :global(.d-flex-center) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.fill-page) {
    min-height: calc(100% - 8rem);
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  h3 {
    color: #ff3e00;
  }

  h1 {
    color: #ff3e00;
    margin: 0;
    font-size: 2rem;
  }

  h1 > img {
    height: 100%;
    width: 4rem;
  }

  header {
    width: 100%;
    height: 4rem;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  footer {
    width: 100%;
    height: 4rem;
    padding: 0 5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  nav {
    column-gap: 2rem;
  }

  nav > :global(a) {
    font-size: 2rem;
    text-decoration: none;
    color: #ff3e00;
  }

  nav > :global(a:hover) {
    text-decoration: underline;
  }
</style>
