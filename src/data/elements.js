export const elements = [
  { emoji: "💧", value: "water", displayName: "Water" },
  { emoji: "🔥", value: "fire", displayName: "Fire" },
  { emoji: "💨", value: "air", displayName: "Air" },
  { emoji: "🟫", value: "earth", displayName: "Earth" },
  { emoji: "💦", value: "sea", displayName: "Sea" },
  { emoji: "🌊", value: "wave", displayName: "Wave" },
  { emoji: "🗾", value: "land", displayName: "Land" },
  { emoji: "🚿", value: "shower", displayName: "Shower" },
  { emoji: "🌋", value: "volcano", displayName: "Volcano" },
  { emoji: "☁", value: "cloud", displayName: "Cloud" },
  { emoji: "🌧", value: "rain", displayName: "Rain" },
  { emoji: "🔋", value: "energy", displayName: "Energy" },
  { emoji: "🌬", value: "wind", displayName: "Wind" },
  { emoji: "♨", value: "steam", displayName: "Steam" },
  { emoji: "🌍", value: "planet", displayName: "Planet" },
  { emoji: "☀", value: "sun", displayName: "Sun" },
  { emoji: "🏝", value: "island", displayName: "Island" },
  { emoji: "🌃", value: "night", displayName: "Night" },
  { emoji: "⛰", value: "mountain", displayName: "Mountain" },
  { emoji: "🌪", value: "tornado", displayName: "Tornado" },
  { emoji: "🌫", value: "fog", displayName: "Fog" },
  { emoji: "🌩", value: "lightning", displayName: "Lightning" },
  { emoji: "⚡", value: "volt", displayName: "Electricity" },
  { emoji: "💡", value: "light", displayName: "Light" },
  { emoji: "🌡", value: "heat", displayName: "Heat" },
  { emoji: "🌱", value: "seedling", displayName: "Seedling" },
  { emoji: "🌿", value: "plant", displayName: "Plant" },
  { emoji: "🌲", value: "tree", displayName: "Tree" },
];

export const getElement = (value) => {
  return elements.find((element) => element.value === value);
};
