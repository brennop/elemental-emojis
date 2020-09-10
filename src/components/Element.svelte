<script>
  import { source } from "../store/source";
  import { getElement, getRecipe } from "../data/elements.js";
  import { onMount } from "svelte/internal";
  import { progress } from "../store/progress";
  import { spring } from "svelte/motion";
  import { draggable } from "../actions/draggable";
  import { hoverable } from "../actions/hoverable";

  export let value;
  let isHovered = false;
  const { emoji, displayName, craftables } = getElement(value);

  const size = spring(0.2, { stiffness: 0.2, damping: 0.5 });

  onMount(() => {
    size.set(1);
  });

  function handleDrop(event) {
    event.preventDefault();

    const output = getRecipe(craftables, $source, value);

    if (output) {
      progress.update(($elements) => $elements.add(output.name));
    }
  }
</script>

<style>
  .item {
    font-size: 2em;
    cursor: pointer;
    text-align: center;
    width: min-content;
    text-align: center;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container {
    border-radius: 0.8em;
    padding: 1em;
    height: 6em;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 0.1s ease-out;
    justify-content: space-between;
  }

  .container:hover {
    background-color: #f0f0f0;
  }

  .hover {
    background-color: #e2e8f0;
  }

  span {
    font-size: 0.8rem;
  }
</style>

<div
  class="container"
  class:hover={isHovered}
  use:draggable={value}
  use:hoverable={(value) => (isHovered = value)}
  on:drop={handleDrop}>
  <div class="item" style="transform: scale({$size})">{emoji}</div>
  <span>{displayName}</span>
</div>
