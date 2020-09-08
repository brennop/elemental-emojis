<script>
  import { draggable } from "../actions/draggable";
  import { source } from "../store/source";
  import { recipes } from "../data/recipes";
  import { element } from "svelte/internal";
  import { elements } from "../store/elements";
  export let value;

  const insert = (array, item) => {
    const newArray = [...array, item].sort();
    return Array.from(new Set(newArray));
  };

  function handleDragStart(event) {
    source.set(value);

    event.dataTransfer.setData("text/plain", value);

    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    event.dataTransfer.setDragImage(img, 0, 0);
  }

  function handleDragMove(event) {}

  function handleDrop(event) {
    event.preventDefault();
    const source = event.dataTransfer.getData("text/plain");
    const recipe = recipes
      .filter((recipe) => recipe.inputs.includes(source))
      .find((recipe) => recipe.inputs.includes(value));

    if (recipe) {
      elements.update(($elements) => insert($elements, recipe.output));
    }
  }

  function handleDragEnd(event) {
    source.set();
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
</script>

<style>
  div {
    font-size: 2em;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0.5em;
    height: min-content;
  }
</style>

<div
  draggable={true}
  on:drag={handleDragMove}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  on:drop={handleDrop}
  on:dragover={handleDragOver}>
  {value}
</div>
