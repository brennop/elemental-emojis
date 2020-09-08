<script>
  import { source } from "../store/source";
  import recipes from "../data/recipes.json";
  import elements from "../data/elements.json";
  import { onMount } from "svelte/internal";
  import { progress } from "../store/progress";
  import { spring } from "svelte/motion";
  import { draggable } from "../actions/draggable";
  import { hoverable } from "../actions/hoverable";

  export let value;
  let isHovered = false;
  const size = spring(0, { stiffness: 0.2, damping: 0.5 });

  onMount(() => {
    size.set(1);
  });

  function handleDrop(event) {
    event.preventDefault();

    const recipe = recipes.find(
      ({ inputs }) =>
        inputs.sort().toString() === [$source, value].sort().toString()
    );

    if (recipe) {
      progress.update(($elements) => $elements.add(recipe.output));
    }
  }
</script>

<style>
  .item {
    font-size: 2em;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
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
    height: min-content;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 0.1s ease-out;
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
  <div class="item" style="transform: scale({$size})">{value}</div>
  <span>{elements.find((element) => element.item === value)?.name}</span>
</div>
