<script>
  import { source, reset } from "./store/source";
  import { progress, dragging } from "./store";
  import { getElement } from "./data/elements";

  import Element from "./components/Element.svelte";
  import HiddenElement from "./components/HiddenElement.svelte";
  import Float from "./components/Float.svelte";
  import Progress from "./components/Progress.svelte";
  import Hint from "./components/Hint.svelte";

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

  $: sourceElement = getElement($source);
</script>

<main class:dragging={$dragging}>
  <Float />
  <header>
    <h1>
      <HiddenElement value="atom" />
      ⚛
      <HiddenElement value="letters" />
      <a href="https://elemental-emojis.vercel.app/">Elemental Emojis</a>
    </h1>

    {#if $source}
      <span class="selected">
        <span class="emoji">{sourceElement.emoji} </span>
        <span>{sourceElement.displayName}</span>
      </span>
    {/if}
  </header>

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
          rel="noopener noreferer"
        >
          🐛 Report a bug.</a
        >
      </li>
      <Hint />
    </ul>
  </div>
</main>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
  }

  main a {
    text-decoration: none;
  }

  header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1em 0;
  }

  .selected {
    background: #2fd3fc20;
    padding: 1em;
    border-radius: 0.5em;
    height: 5em;
    width: 5em;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }

  .selected span {
    font-size: 0.75em;
    text-align: center;
  }

  .selected .emoji {
    font-size: 1.5em;
    text-align: center;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
    gap: 1em;
    align-content: start;
    border: 1px solid #ddd;
    border-radius: 0.5em;
    padding: 0.5em;
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

  ul li {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
  }
</style>
