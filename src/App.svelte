<script>
  import { source, reset } from "./store/source";
  import { progress, dragging } from "./store";
  import Element from "./components/Element.svelte";
  import HiddenElement from "./components/HiddenElement.svelte";
  import Float from "./components/Float.svelte";
  import Progress from "./components/Progress.svelte";

  // reset source on cancel
  document.addEventListener("click", reset);
  document.addEventListener("keydown", ({ key }) => {
    if (key === "Escape") reset();
  });

  const handleDrop = () => {
    if ($source && $dragging) {
      progress.update(($elements) => $elements.add($source));
    }
  };
</script>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
    gap: 1em;
    align-content: start;
    border: 1px solid #888;
    border-radius: 1em;
    padding: 1em;
    flex: 1;
    overflow-y: auto;
  }

  .dragging {
    cursor: grabbing;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    list-style: none;
  }
</style>

<main class:dragging={$dragging}>
  <Float />
  <h1>
    <HiddenElement value="atom" />
    ⚛
    <HiddenElement value="letters" />
    Elemental Emojis
  </h1>

  <div class="board" on:mouseup={handleDrop}>
    {#each [...$progress] as element}
      <Element value={element} />
    {/each}
  </div>
  <div class="bottom">
    <Progress />
    <ul>
      <li>
        <HiddenElement value="bug" />
        <a
          href="https://forms.gle/NwJzRQMj5y5FyueQA"
          target="_blank"
          rel="noopener noreferer">
          🐛 Report a bug.</a>
      </li>
    </ul>
  </div>
</main>
