import { source, dragging } from "../store";

export function draggable(node, value) {
  let x, dx;
  let y, dy;
  let timers = [];

  const handleMouseDown = (event) => {
    x = event.clientX;
    y = event.clientY;

    timers = [
      setTimeout(() => {
        window.addEventListener("mousemove", handleMouseMove);
      }, 50),
      setTimeout(() => {
        source.set(value);
        dragging.set(true);
      }, 500),
    ];
  };

  // TODO: create a writable store to share this event
  // with Float.svelte since this is bound everytime
  const handleMouseMove = (event) => {
    dx = event.clientX - x;
    dy = event.clientY - y;

    window.removeEventListener("mousemove", handleMouseMove);

    // these values are completely arbitrary
    if (dx > Math.abs(10) || dy > Math.abs(10)) {
      timers.forEach((timer) => clearTimeout(timer));
      source.set(value);
      dragging.set(true);
    }
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
      window.removeEventListener("mousemove", handleMouseMove);
    },
  };
}
