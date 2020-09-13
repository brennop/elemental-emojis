import recipes from "./recipes.json";

export const getRecipe = (inputs) => {
  return recipes.find(
    (recipe) =>
      recipe.inputs.sort().toString() === [...new Set(inputs)].sort().toString()
  );
};
