<script>
  import { draggable } from "../actions/draggable";
  import { source } from "../store/source";
  import { recipes } from "../data/recipes";
  import { elements as names } from "../data/elements";
  import { element, onMount } from "svelte/internal";
  import { elements } from "../store/elements";
  import { spring } from "svelte/motion";

  export let value;
  let isHovered = false;
  const size = spring(0, { stiffness: 0.2, damping: 0.5 });

  onMount(() => {
    size.set(1);
  });

  const insert = (array, item) => {
    const newArray = [...array, item];
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

  function handleDrop(event) {
    event.preventDefault();
    const source = event.dataTransfer.getData("text/plain");
    const recipe = recipes.find(
      ({ inputs }) =>
        JSON.stringify(inputs.sort()) === JSON.stringify([source, value].sort())
    );

    if (recipe) {
      elements.update(($elements) => insert($elements, recipe.output));
    }
    isHovered = false;
  }

  function handleDragEnd(event) {
    source.set();
    isHovered = false;
  }

  function handleDragOver(event) {
    event.preventDefault();
    isHovered = true;
  }

  function handleDragExit(event) {
    isHovered = false;
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
  draggable={true}
  on:dragexit={handleDragExit}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  on:drop={handleDrop}
  on:dragover={handleDragOver}>
  <div class="item" style="transform: scale({$size})">{value}</div>
  <span>{names.find((element) => element.item === value)?.name}</span>
</div>
