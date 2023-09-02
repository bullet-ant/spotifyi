import { writable } from "svelte/store";

export const tracks = writable([]);
export const errors = writable([]);
export const loading = writable(false);
