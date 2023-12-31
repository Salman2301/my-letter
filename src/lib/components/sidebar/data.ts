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
		title: 'Contact',
		icon: 'users',
		href: '/app/contact',
		theme: 'default'
	},
	{
		title: 'Setting',
		icon: 'setting',
		href: '/app/setting',
		theme: 'default'
	}
];

export default data;
