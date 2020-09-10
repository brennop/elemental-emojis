export const elements = [
  { name: "water", emoji: "💦", displayName: "Water", recipes: [] },
  { name: "fire", emoji: "🔥", displayName: "Fire", recipes: [] },
  { name: "air", emoji: "💨", displayName: "Air", recipes: [] },
  { name: "earth", emoji: "🟫", displayName: "Eart", recipes: [] },
  {
    name: "drop",
    emoji: "💧",
    displayName: "Droplet",
    recipes: [["water", "water"]],
  },
  {
    name: "heat",
    emoji: "🌡",
    displayName: "Heat",
    recipes: [["fire", "fire"]],
  },
  { name: "fog", emoji: "🌫", displayName: "Mist", recipes: [["water", "air"]] },
  {
    name: "energy",
    emoji: "🔋",
    displayName: "Energy",
    recipes: [["fire", "air"]],
  },
  {
    name: "steam",
    emoji: "♨",
    displayName: "Steam",
    recipes: [
      ["heat", "water"],
      ["heat", "drop"],
    ],
  },
  {
    name: "cloud",
    emoji: "☁",
    displayName: "Cloud",
    recipes: [["pressure", "fog"]],
  },
  {
    name: "pressure",
    emoji: "⬇",
    displayName: "Pressure",
    recipes: [["air", "heat"]],
  },
];

export const getElement = (name) => {
  return {
    ...elements.find((element) => element.name === name),
    craftables: getDerived(name),
  };
};

export const getDerived = (name) => {
  return elements.reduce(
    (derived, element) =>
      element.recipes.some((recipe) => recipe.includes(name))
        ? [...derived, element]
        : derived,
    []
  );
};

export const getRecipe = (elements, needle) => {
  return elements.find((element) =>
    element.recipes.find((recipe) => recipe.includes(needle))
  );
};
