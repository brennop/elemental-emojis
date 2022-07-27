<script>
  import { reset, source } from "../store/source";
  import { getElement } from "../data/elements.js";
  import { getRecipe } from "../data/recipes.js";
  import { progress } from "../store/progress";
  import { draggable } from "../actions/draggable";
  import { scale } from "svelte/transition";
  import Popover from "./Popover.svelte";

  export let value;
  const { emoji, displayName, hasCraftables } = getElement(value);

  let popover = false;

  function combineElements(source, target) {
    const recipe = getRecipe([source, target]);

    if (recipe) {
      progress.update(($elements) => $elements.add(recipe.output));
      popover.pop(recipe.output);
    }
  }

  function handleDrop() {
    combineElements($source, value);
  }

  function handleClick() {
    if ($source == null) {
      source.set(value);
    } else {
      combineElements($source, value);
      reset();
    }
  }
</script>

{#if hasCraftables}
  <div
    class="container"
    class:selected={$source === value}
    use:draggable={value}
    on:click|stopPropagation={handleClick}
    on:mouseup={handleDrop}
  >
    <div class="item" transition:scale={{ duration: 280 }}>{emoji}</div>
    <span>{displayName}</span>
    <Popover bind:this={popover} />
  </div>
{:else}
  <div class="container disabled">
    <div class="item disabled" transition:scale={{ duration: 280 }}>
      {emoji}
    </div>
    <span>{displayName}</span>
  </div>
{/if}

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
    width: 6em;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 0.15s ease-out;
    justify-content: space-between;

    position: relative;
    box-shadow: inset 0 0 0px 0px #2fd3fc20;
  }

  .container:hover {
    background: #2fd3fc20;
  }

  span {
    font-size: 0.8rem;
    text-align: center;
    pointer-events: none;
  }

  .selected {
    box-shadow: inset 0 0 0px 6px #2fd3fc20;
  }

  .selected:hover {
    box-shadow: inset 0 0 0px 8px #2fd3fc40;
  }

  .container.disabled {
    background: #a652f920;
  }

  .disabled:hover {
    box-shadow: none;
  }

  .item.disabled {
    cursor: default;
  }
</style>
