import type { iconMap } from '$lib/components/icon/map.svelte';

interface SidebarData {
	title: string;
	href: `/app/${string}` | `https://${string}`;
	icon: keyof typeof iconMap;
	place?: 'footer' | 'header';
	theme: 'cta' | 'default';
}

const data: SidebarData[] = [
	{
		title: 'New letter',
		icon: 'pen-tool',
		href: '/app/new-letter',
		theme: 'cta'
	},
	{
		title: 'My Letter',
		icon: 'book',
		href: '/app/my-letters',
		theme: 'default'
	},
	{
		title: 'My Contact',
		icon: 'users',
		href: '/app/my-contacts',
		theme: 'default'
	},
	{
		title: 'My Settings',
		icon: 'setting',
		href: '/app/settings',
		theme: 'default'
	}
];

export default data;
