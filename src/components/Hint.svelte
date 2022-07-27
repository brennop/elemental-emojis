<script>
  import { getElements } from "../data/elements";
  import { progress } from "../store";

  import HiddenElement from "../components/HiddenElement.svelte";

  let hint = null;

  const getRandom = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const handleHint = () => {
    const els = getElements()
    .filter((element) => !$progress.has(element.name));
    hint = getRandom(els);
  };
</script>

<li>
  <HiddenElement value="bulb" />
  <button on:click={handleHint}>💡 Get hint</button>
  {#if hint}
    <span>{hint.emoji}</span>
  {/if}
</li>

<style>
  button {
    border: none;
    border-radius: 0.5em;
    background: #e5faff;
    cursor: pointer;
  }

  button:active {
    background: #cce9f0;
  }
</style>
