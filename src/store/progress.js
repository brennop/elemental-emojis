import { writable } from "svelte/store";

export const progress = writable(new Set(["💦", "💨", "🔥", "🟫"]));
