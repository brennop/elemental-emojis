import { writable } from "svelte/store";
import { dragging } from "./dragging";

export const source = writable();

export const reset = () => {
  source.set(null);
  dragging.set(false);
};
