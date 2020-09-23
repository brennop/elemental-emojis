import { writable } from "svelte/store";

const initialProgress = JSON.parse(localStorage.getItem("progress")) || [
  "water",
  "air",
  "fire",
  "earth",
];

export const progress = writable(new Set(initialProgress));

progress.subscribe((value) => {
  const asArray = [...value];
  localStorage.setItem("progress", JSON.stringify(asArray));
});
