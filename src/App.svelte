<script>
  import { spring } from "svelte/motion";
  import { source } from "./store/source";
  import { progress } from "./store/progress";
  import Element from "./components/Element.svelte";
  import { elements, getElement } from "./data/elements";

  let coords = spring({ x: 0, y: 0 }, { stiffness: 0.5 });

  function moveSource(event) {
    const { x, y } = event;
    coords.set({ x, y });
  }

  window.addEventListener("mousemove", moveSource);

  $: sourceElement = getElement($source);
</script>

<style>
  main {
    height: 100%;
  }

  .board {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    align-content: flex-start;
    border: 1px solid #888;
    border-radius: 1em;
    padding: 1em;
    height: 80vh;
  }

  .float {
    font-size: 2em;
    position: absolute;
    left: 0;
    top: 0;
  }

  .progress {
    color: #ddd;
    font-size: 4em;
  }

  span {
    pointer-events: none;
    z-index: 1;
  }
</style>

<main on:dragover={moveSource}>
  {#if $source}
    <span
      class="float"
      style="transform: translate({$coords.x - 16}px,{$coords.y - 16}px)">
      {sourceElement.emoji}
    </span>
  {/if}
  <div class="board">
    {#each [...$progress] as element}
      <Element value={element} />
    {/each}
  </div>
  <div class="progress">{[...$progress].length}/{elements.length}</div>
</main>
