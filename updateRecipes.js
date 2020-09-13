require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const airtable = axios.create({
  baseURL: "https://api.airtable.com/v0/appsgnD2ggwImmMnA",
  headers: {
    Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
  },
});

const getElements = (offset) =>
  airtable
    .get(
      `Elements?fields[]=name&fields[]=emoji&fields[]=displayName${
        offset ? "&offset=" + offset : ""
      }`
    )
    .then((response) => response.data)
    .then(async ({ records, offset }) => {
      if (offset) {
        const rest = await getElements(offset);
        return [...records, ...rest];
      }
      return records;
    });

const getRecipes = (offset) =>
  airtable
    .get(
      `Recipes?fields[]=inputs&fields[]=output${
        offset ? "&offset=" + offset : ""
      }`
    )
    .then((response) => response.data)
    .then(async ({ records, offset }) => {
      if (offset) {
        const rest = await getRecipes(offset);
        return [...records, ...rest];
      }
      return records;
    });

(async () => {
  const elements = await getElements().then((elements) =>
    elements.map((element) => element.fields)
  );

  const recipes = await getRecipes().then((recipes) =>
    recipes
      .map((recipe) => recipe.fields)
      .map(({ output, inputs }) => ({ inputs, output: output[0] }))
  );

  fs.writeFile(
    "src/data/elements.json",
    JSON.stringify(elements, null, 2),
    (error) => console.log(error)
  );

  fs.writeFile(
    "src/data/recipes.json",
    JSON.stringify(recipes, null, 2),
    (error) => console.log(error)
  );
})();
