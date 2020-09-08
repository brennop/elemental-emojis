export function draggable(node) {
  let x;
  let y;

  node.addEventListener("mousedown", handleMouseDown);

  function handleMouseDown(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("dragstart", {
        detail: { x, y },
      })
    );

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event) {
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("drag", {
        detail: { x, y, dx, dy },
      })
    );
  }

  function handleMouseUp(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("dragend", {
        detail: { x, y },
      })
    );

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMouseDown);
    },
  };
}
