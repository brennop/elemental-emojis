<script>
  import { spring } from "svelte/motion";
  import { draggable } from "../actions/draggable";
  export let value;

  let coords = spring({ x: 0, y: 0 });

  function handleDragStart(event) {}

  function handleDragMove(event) {
    const { x, y, dx, dy } = event.detail;

    coords.update(($coords) => ({ x: $coords.x + dx, y: $coords.y + dy }));
  }

  function handleDrop(event) {
    console.log(event);
  }

  function handleDragEnd(event) {
    coords.set({ x: 0, y: 0 });
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
  use:draggable
  on:drag={handleDragMove}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  style="transform: translate({$coords.x}px,{$coords.y}px)">
  {value}
</div>
