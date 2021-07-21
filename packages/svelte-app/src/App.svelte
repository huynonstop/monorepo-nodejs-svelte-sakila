<script>
  import { Router, Link, Route } from "svelte-routing";
  import logo from "./assets/svelte.png";
  import Home from "./pages/Home.svelte";
  import NotFound from "./pages/NotFound.svelte";
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
  <Route path="actor/*"><ActorPage /></Route>
  <Route path="customer/*"><CustomerPage /></Route>
  <Route path="/"><Home /></Route>
  <Route component={NotFound} />
</Router>

<style>
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
    height: calc(100% - 5rem);
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
    height: 5rem;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
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
