<script>
  import { spring } from "svelte/motion";
  import { scale } from "svelte/transition";
  import { source, dragging } from "../store";
  import { getElement } from "../data/elements";

  let coords = spring({ x: 0, y: 0 }, { stiffness: 0.4 });

  function moveSource(event) {
    const { x, y } = event;
    coords.set({ x, y });
  }

  window.addEventListener("mousemove", moveSource);

  $: sourceElement = getElement($source);
</script>

<style>
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

  span {
    pointer-events: none;
    z-index: 1;
  }
</style>

{#if $source && $dragging}
  <span
    class="float"
    style="transform: translate({$coords.x - 24}px,{$coords.y - 24}px)">
    <span
      transition:scale={{ duration: 280 }}
      class="float emoji">{sourceElement.emoji}
    </span>
  </span>
{/if}
