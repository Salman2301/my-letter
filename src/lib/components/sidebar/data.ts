import type { iconMap } from '$lib/components/icon/map.svelte';

interface SidebarData {
	title: string;
	href: `/app/${string}` | `https://${string}`;
	icon: keyof typeof iconMap;
	place?: 'footer' | 'header';
	theme: 'cta' | 'default';
	hideSidebar?: boolean;
}

const data: SidebarData[] = [
	{
		title: 'New letter',
		icon: 'pen-tool',
		href: '/app/new-letter',
		theme: 'cta'
	},
	{
		title: 'My Letters',
		icon: 'book',
		href: '/app/my-letters',
		theme: 'default'
	},
	{
		title: 'My Contacts',
		icon: 'users',
		href: '/app/my-contacts',
		theme: 'default'
	},
	{
		title: 'My Settings',
		icon: 'setting',
		href: '/app/settings',
		theme: 'default'
	},
	{
		title: 'Update Contact',
		icon: 'pen-tool',
		href: '/app/my-contact/[id]',
		theme: 'default',
		hideSidebar: true
	},
	{
		title: 'New Contact',
		icon: 'pen-tool',
		href: '/app/new-contact',
		theme: 'default',
		hideSidebar: true
	},
	 
];

export default data;
