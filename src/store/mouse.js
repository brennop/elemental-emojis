import { writable } from "svelte/store";

export const mouse = writable({ x: 0, y: 0, dx: 0, dy: 0 });
