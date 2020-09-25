<script>
  import { progress } from "../store";
  import { elements } from "../data/elements";
  import HiddenElement from "./HiddenElement.svelte";
</script>

<style>
  span {
    color: #bbb;
    font-size: 4em;
    padding: 0.2em;
    cursor: default;
  }
</style>

<span>
  <HiddenElement value="numbers" />
  {[...$progress].length}/{elements.length}
</span>
