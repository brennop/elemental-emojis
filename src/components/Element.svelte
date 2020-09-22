<script>
  import { source } from "../store/source";
  import { getElement } from "../data/elements.js";
  import { getRecipe } from "../data/recipes.js";
  import { onMount } from "svelte/internal";
  import { progress } from "../store/progress";
  import { spring } from "svelte/motion";
  import { draggable } from "../actions/draggable";
  import { hoverable } from "../actions/hoverable";
  import { scale } from "svelte/transition";

  export let value;
  let isHovered = false;
  const { emoji, displayName, craftables } = getElement(value);

  function combineElements(source, target) {
    const recipe = getRecipe([source, target]);

    if (recipe) {
      progress.update(($elements) => $elements.add(recipe.output));
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    combineElements($source, value);
  }

  function handleClick(event) {
    event.stopPropagation();
    if ($source == null) {
      source.set(value);
    } else {
      combineElements($source, value);
      source.set();
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
    transition: 0.2s ease-out;
    justify-content: space-between;
    box-shadow: inset 0 0 0px 0px #2fd3fc20;
  }

  .container:hover {
    box-shadow: inset 0 0 4px 4px #2fd3fc20;
  }

  .hover {
    background-color: #e2e8f0;
  }

  span {
    font-size: 0.8rem;
    text-align: center;
  }

  .selected {
    box-shadow: inset 0 0 2px 6px #2fd3fc40;
  }

  .selected:hover {
    box-shadow: inset 0 0 2px 6px #2fd3fc40;
  }
</style>

<div
  class:selected={$source === value}
  class="container"
  class:hover={isHovered}
  use:draggable={value}
  use:hoverable={(value) => (isHovered = value)}
  on:drop={handleDrop}
  on:click={handleClick}>
  <div class="item" transition:scale={{ duration: 280 }}>{emoji}</div>
  <span>{displayName}</span>
</div>
