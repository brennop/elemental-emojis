<script>
  import { reset, source } from "../store/source";
  import { getElement } from "../data/elements.js";
  import { getRecipe } from "../data/recipes.js";
  import { progress } from "../store/progress";
  import { draggable } from "../actions/draggable";
  import { scale } from "svelte/transition";

  export let value;
  const { emoji, displayName } = getElement(value);

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
      reset();
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

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    box-shadow: inset 0 0 0px 0px #2fd3fc20;
  }

  .container:hover {
    box-shadow: inset 0 0 4px 4px #2fd3fc20;
  }

  span {
    font-size: 0.8rem;
    text-align: center;
    pointer-events: none;
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
  use:draggable={value}
  on:click={handleClick}
  on:mouseup={handleDrop}>
  <div class="item" transition:scale={{ duration: 280 }}>{emoji}</div>
  <span>{displayName}</span>
</div>
