<script>
  import { writable } from "svelte/store";
  import Element from "./components/Element.svelte";

  export const elements = writable(["🔥", "💧", "💨"]);
</script>

<style>
  main {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
</style>

<main>
  {#each $elements as element}
    <Element value={element} />
  {/each}
</main>
