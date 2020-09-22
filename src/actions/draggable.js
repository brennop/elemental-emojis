import { source, dragging } from "../store";

export function draggable(node, value) {
  let x;
  let y;
  let timer;

  const handleMouseDown = () => {
    timer = setTimeout(() => {
      source.set(value);
      dragging.set(true);
    }, 100);
  };

  const handleMouseUp = () => {
    clearTimeout(timer);
  };

  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mouseup", handleMouseUp);

  return {
    destroy() {
      node.removeEventListener(handleMouseDown);
      node.removeEventListener(handleMouseUp);
    },
  };
}
