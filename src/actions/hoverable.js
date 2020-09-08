export function hoverable(node, setHovered) {
  node.addEventListener("dragover", setHoverToTrue);

  node.addEventListener("dragexit", setHoverToFalse);
  node.addEventListener("drop", setHoverToFalse);

  function setHoverToTrue(event) {
    event.preventDefault();
    setHovered(true);
  }

  function setHoverToFalse(event) {
    event.preventDefault();
    setHovered(false);
  }

  return {
    destroy() {
      node.removeEventListener("dragover", setHoverToTrue);

      node.removeEventListener("dragexit", setHoverToFalse);
      node.removeEventListener("drop", setHoverToFalse);
    },
  };
}
