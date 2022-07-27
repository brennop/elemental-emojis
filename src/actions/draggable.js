import { get } from "svelte/store";
import { dragging, mouse } from "../store";
import { source } from "../store/source";

export function draggable(node, value) {
  let x;
  let y;
  let timers = [];

  const handleLongPress = () => {
    source.set(value);
    dragging.set(true);
  };

  const handleDrag = () => {
    const dx = x - get(mouse).x;
    const dy = y - get(mouse).y;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      timers.forEach((timer) => clearTimeout(timer));
      handleLongPress();
    }
  };

  const handleMouseDown = (event) => {
    x = event.clientX;
    y = event.clientY;

    timers = [setTimeout(handleDrag, 50), setTimeout(handleLongPress, 100)];
  };

  const handleMouseUp = () => {
    timers.forEach((timer) => clearTimeout(timer));
  };

  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mouseup", handleMouseUp);

  return {
    destroy() {
      node.removeEventListener("mousemove", handleMouseDown);
      node.removeEventListener("mouseup", handleMouseUp);
    },
  };
}
