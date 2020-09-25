<script>
  import { progress } from "../store";
  import { elements } from "../data/elements";
</script>

<style>
  span {
    color: #bbb;
    font-size: 4em;
    padding: 0.2em;
    cursor: default;
  }
</style>

<span>{[...$progress].length}/{elements.length}</span>
