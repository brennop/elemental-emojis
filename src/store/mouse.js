import { writable } from "svelte/store";

export const mouse = writable({ x: null, y: null });
