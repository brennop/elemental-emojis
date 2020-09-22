<script>
  import { reset } from "./store/source";
  import { progress } from "./store/progress";
  import Element from "./components/Element.svelte";
  import Float from "./components/Float.svelte";
  import { elements } from "./data/elements";

  // reset source on cancel
  document.addEventListener("click", reset);
  document.addEventListener("keydown", ({ key }) => {
    if (key === "Escape") reset();
  });
</script>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
    gap: 1em;
    align-content: start;
    border: 1px solid #888;
    border-radius: 1em;
    padding: 1em;
    flex: 1;
    overflow-y: auto;
  }

  .progress {
    color: #ddd;
    font-size: 4em;
    padding: 0.4em 0.2em;
  }
</style>

<main>
  <Float />
  <h1>⚛ Elemental Emojis</h1>
  <div class="board">
    {#each [...$progress] as element}
      <Element value={element} />
    {/each}
  </div>
  <div class="progress">{[...$progress].length}/{elements.length}</div>
</main>
