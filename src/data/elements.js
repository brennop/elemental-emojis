import elements from "./elements.json";

export const getElement = (name) => {
  return elements.find((element) => element.name === name);
};

export { elements };
