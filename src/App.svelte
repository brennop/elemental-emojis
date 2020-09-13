<script>
  import { spring } from "svelte/motion";
  import { scale } from "svelte/transition";
  import { source } from "./store/source";
  import { progress } from "./store/progress";
  import Element from "./components/Element.svelte";
  import { elements, getElement } from "./data/elements";

  let coords = spring({ x: 0, y: 0 }, { stiffness: 0.3 });

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

  .float {
    position: absolute;
    left: 0;
    top: 0;
  }

  .emoji {
    font-size: 2em;
    width: 48px;
    height: 48px;
    text-align: center;
  }

  .progress {
    color: #ddd;
    font-size: 4em;
    padding: 0.4em 0.2em;
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
      style="transform: translate({$coords.x - 24}px,{$coords.y - 24}px)">
      <span
        transition:scale={{ duration: 280 }}
        class="float emoji">{sourceElement.emoji}
      </span>
    </span>
  {/if}
  <h1>⚛ Elemental Emojis</h1>
  <div class="board">
    {#each [...$progress] as element}
      <Element value={element} />
    {/each}
  </div>
  <div class="progress">{[...$progress].length}/{elements.length}</div>
</main>
