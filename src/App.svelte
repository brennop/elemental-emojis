<script>
  import { spring } from "svelte/motion";
  import { source } from "./store/source";
  import { elements } from "./store/elements";
  import Element from "./components/Element.svelte";

  let coords = spring({ x: 0, y: 0 }, { stiffness: 0.5 });

  function passDragData(event) {
    const { x, y } = event;
    coords.set({ x, y });
  }

  window.addEventListener("mousemove", ({ x, y }) => coords.set({ x, y }));
</script>

<style>
  main {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    align-content: flex-start;
  }

  .float {
    font-size: 2em;
    position: absolute;
    left: 0;
    top: 0;
  }

  .cursor {
    cursor: default;
  }

  span {
    pointer-events: none;
    z-index: 1;
  }
</style>

<main on:dragover={passDragData} class:cursor={$source}>
  {#if $source}
    <span
      class="float"
      style="transform: translate({$coords.x - 16}px,{$coords.y - 16}px)">
      {$source}
    </span>
  {/if}
  {#each $elements as element}
    <Element value={element} />
  {/each}
</main>
