export const recipes = [
  { inputs: ["water", "air"], output: "fog" },
  { inputs: ["fog", "fog"], output: "cloud" },
  { inputs: ["air", "air"], output: "wind" },
  { inputs: ["water", "water"], output: "sea" },
  { inputs: ["cloud", "water"], output: "rain" },
  { inputs: ["earth", "earth"], output: "land" },
  { inputs: ["fire", "air"], output: "energy" },
  { inputs: ["fire", "fire"], output: "heat" },
  { inputs: ["heat", "water"], output: "steam" },
  { inputs: ["heat", "sea"], output: "steam" },
  { inputs: ["land", "earth"], output: "mountain" },
  { inputs: ["mountain", "fire"], output: "volcano" },
  { inputs: ["land", "sea"], output: "planet" },
  { inputs: ["planet", "fire"], output: "sun" },
  { inputs: ["planet", "energy"], output: "sun" },
  { inputs: ["wind", "sea"], output: "wave" },
  { inputs: ["volt", "cloud"], output: "lightning" },
  { inputs: ["rain", "land"], output: "seedling" },
  { inputs: ["rain", "earth"], output: "seedling" },
  { inputs: ["seedling", "sun"], output: "plant" },
  { inputs: ["plant", "sun"], output: "tree" },
];

export const getRecipe = (inputs) => {
  return recipes.find(
    (recipe) => recipe.inputs.sort().toString() === inputs.sort().toString()
  );
};
