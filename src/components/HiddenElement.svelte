<script>
  import { reset, source } from "../store/source";
  import { getElement } from "../data/elements.js";
  import { getRecipe } from "../data/recipes.js";
  import { progress } from "../store/progress";
  import { draggable } from "../actions/draggable";

  export let value;
  const { emoji } = getElement(value);

  let popover = false;

  function combineElements(source, target) {
    const recipe = getRecipe([source, target]);

    if (recipe) {
      progress.update(($elements) => $elements.add(recipe.output));
      popover.pop(recipe.output);
    }
  }

  function handleDrop() {
    combineElements($source, value);
  }

  function handleClick() {
    if ($source == null) {
      source.set(value);
    } else {
      combineElements($source, value);
      reset();
    }
  }
</script>

<style>
  span {
    position: absolute;
    opacity: 0;
  }
</style>

<span use:draggable={value} on:click|stopPropagation={handleClick}>
  {emoji}
</span>
