import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const showSidebar: Writable<boolean> = writable(true);

export function toggleSidebar() {
	return showSidebar.set(!get(showSidebar));
}
