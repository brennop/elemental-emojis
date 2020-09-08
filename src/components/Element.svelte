<script>
  import { draggable } from "../actions/draggable";
  import { source } from "../store/source";
  export let value;

  function handleDragStart(event) {
    source.set(value);

    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    event.dataTransfer.setDragImage(img, 0, 0);
  }

  function handleDragMove(event) {}

  function handleDrop(event) {
    console.log(value);
  }

  function handleDragEnd(event) {
    source.set();
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
  on:dragend={handleDragEnd}>
  {value}
</div>
