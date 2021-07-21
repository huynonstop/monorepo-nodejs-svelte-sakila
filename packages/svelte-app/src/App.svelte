<script>
  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";
</script>

<svelte:head>
  <title>Sakila</title>
</svelte:head>

<main>
  <h1>
    <img src={logo} alt="Svelte Logo" />
    Sakila Client
  </h1>

  <Counter />

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 1040px;
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }

  h1 img {
    height: 100%;
    width: 4rem;
  }

  h1 {
    color: #ff3e00;
    font-size: 4rem;
    font-weight: 100;
    margin: 2rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 1rem auto;
    line-height: 1.35;
  }
</style>
