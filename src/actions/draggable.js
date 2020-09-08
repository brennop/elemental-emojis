import { source } from "../store/source";

export function draggable(node, value) {
  node.draggable = true;

  node.addEventListener("dragstart", handleDragStart);
  node.addEventListener("dragend", handleDragEnd);

  function handleDragStart(event) {
    source.set(value);

    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    event.dataTransfer.setDragImage(img, 0, 0);
  }

  function handleDragEnd() {
    source.set();
  }

  return {
    destroy() {
      node.removeEventListener("dragstart", handleDragStart);
      node.removeEventListener("dragend", handleDragEnd);
    },
  };
}
